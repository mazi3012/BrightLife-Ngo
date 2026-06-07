import { desc } from "drizzle-orm";
import Image from "next/image";
import { PlusCircle, List, FileText, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ImageUpload";
import { DeletePostButton } from "@/components/DeletePostButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createPost } from "@/lib/actions";
import { getDb } from "@/lib/db";
import { posts } from "@/lib/schema";
import { parseImageUrls } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const db = getDb();
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
      {/* Creation panel */}
      <Card className="border-slate-200/80 shadow-sm bg-white">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-emerald-700" />
            <CardTitle className="text-xl">Create New Update</CardTitle>
          </div>
          <CardDescription>
            Publish news, health updates, and notices directly to the public feed.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={createPost} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                Post Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Free Eye Screening Camp in Barpeta Center"
                className="h-11 border-slate-200 focus-visible:ring-emerald-600 bg-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-semibold text-slate-700">
                Post Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Describe the initiative, results, and general info for the community..."
                className="min-h-40 border-slate-200 focus-visible:ring-emerald-600 bg-white leading-relaxed resize-y"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700 block mb-1">
                Upload Media (Photos)
              </Label>
              <ImageUpload name="imageUrl" />
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl shadow-md cursor-pointer transition-all hover:translate-y-[-1px]"
            >
              Publish update to live feed
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Feed list panel */}
      <Card className="border-slate-200/80 shadow-sm bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <List className="h-5 w-5 text-emerald-700" />
            <CardTitle className="text-xl">Manage Public Feed</CardTitle>
          </div>
          <CardDescription>
            View and manage all live updates on the Brightlife feed.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="py-3.5 pl-6">Post Details</TableHead>
                  <TableHead className="py-3.5">Images</TableHead>
                  <TableHead className="py-3.5 text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allPosts.length ? (
                  allPosts.map((post) => {
                    const postImages = parseImageUrls(post.imageUrl);
                    return (
                      <TableRow key={post.id} className="hover:bg-slate-50/30">
                        {/* Title and date detail column */}
                        <TableCell className="py-4 pl-6 max-w-[200px] sm:max-w-xs">
                          <div className="space-y-1">
                            <p className="font-bold text-slate-800 line-clamp-2 leading-snug">
                              {post.title}
                            </p>
                            <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                              <Calendar className="h-3 w-3" />
                              {new Intl.DateTimeFormat("en-IN", {
                                dateStyle: "medium",
                              }).format(new Date(post.createdAt))}
                            </span>
                          </div>
                        </TableCell>

                        {/* Image collage thumbnails */}
                        <TableCell className="py-4">
                          {postImages.length > 0 ? (
                            <div className="flex items-center gap-1.5">
                              <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
                                <Image
                                  src={postImages[0]}
                                  alt="Thumbnail"
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                              {postImages.length > 1 && (
                                <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                                  +{postImages.length - 1} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400 font-semibold italic">
                              No image
                            </span>
                          )}
                        </TableCell>

                        {/* Action buttons */}
                        <TableCell className="py-4 text-right pr-6">
                          <DeletePostButton postId={post.id} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <FileText className="h-8 w-8 mb-2 stroke-1" />
                        <p className="text-sm font-medium">No live posts published yet.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
