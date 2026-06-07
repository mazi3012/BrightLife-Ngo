"use client";

import { useState, useMemo } from "react";
import { Search, Filter, AlertCircle } from "lucide-react";

import { PostCard } from "@/components/post-card";
import { Input } from "@/components/ui/input";

type Post = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  authorEmail?: string | null;
};

type FeedSectionProps = {
  initialPosts: Post[];
};

// Auto-categorize posts based on keywords for rich filtering
function getPostCategory(title: string, content: string): string {
  const text = `${title} ${content}`.toLowerCase();
  if (
    text.includes("health") ||
    text.includes("camp") ||
    text.includes("medical") ||
    text.includes("blood") ||
    text.includes("doctor")
  ) {
    return "Health & Wellness";
  }
  if (
    text.includes("school") ||
    text.includes("education") ||
    text.includes("student") ||
    text.includes("book") ||
    text.includes("class") ||
    text.includes("learn")
  ) {
    return "Education";
  }
  if (
    text.includes("relief") ||
    text.includes("flood") ||
    text.includes("disaster") ||
    text.includes("food") ||
    text.includes("cloth") ||
    text.includes("emergency")
  ) {
    return "Relief Work";
  }
  return "General Update";
}

export function FeedSection({ initialPosts }: FeedSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Process posts with categories
  const postsWithCategories = useMemo(() => {
    return initialPosts.map((post) => ({
      ...post,
      category: getPostCategory(post.title, post.content),
    }));
  }, [initialPosts]);

  // Extract all available categories
  const categories = useMemo(() => {
    const list = new Set<string>();
    postsWithCategories.forEach((p) => list.add(p.category));
    return ["All", ...Array.from(list)];
  }, [postsWithCategories]);

  // Filter posts based on search and category choice
  const filteredPosts = useMemo(() => {
    return postsWithCategories.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [postsWithCategories, searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search updates (e.g. Health camp)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 border-slate-200 focus-visible:ring-emerald-600 bg-white"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 hidden md:inline-flex items-center gap-1">
            <Filter className="h-3 w-3" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white shadow-sm shadow-emerald-700/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed Grid */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {filteredPosts.map((post) => (
              <div key={post.id} className="relative">
                {/* Category tag bubble inside the card */}
                <div className="absolute right-4 top-4 z-10 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-800 border border-emerald-100 shadow-sm backdrop-blur-sm">
                  {post.category}
                </div>
                <PostCard
                  title={post.title}
                  content={post.content}
                  imageUrl={post.imageUrl ?? undefined}
                  createdAt={post.createdAt}
                  authorEmail={post.authorEmail}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center shadow-sm">
            <AlertCircle className="h-10 w-10 text-slate-400 mb-3" />
            <h3 className="text-base font-semibold text-slate-900">No updates found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-xs">
              Try adjusting your search criteria or switching to a different category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
