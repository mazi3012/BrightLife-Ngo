import { ArrowRight, ShieldCheck, Sprout, Users } from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard } from "@/components/post-card";
import { getPublicPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPublicPosts();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-6 rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50 p-8 shadow-sm md:grid-cols-[1.4fr_0.6fr] md:p-12">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
              Barpeta, Assam
            </span>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Brightlife NGO works for community upliftment, transparency, and public updates.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              We share local progress, announce initiatives, and keep the community informed with a calm and trustworthy public feed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="#updates">
                  View updates <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin">Admin dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Our focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-emerald-700" /> Community growth
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" /> Transparent updates
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-700" /> Public engagement
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="updates" className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Latest updates</h2>
            <p className="text-sm text-slate-600">Newest posts from Brightlife NGO appear first.</p>
          </div>

          <div className="space-y-4">
            {posts.length ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  content={post.content}
                  imageUrl={post.imageUrl ?? undefined}
                  createdAt={post.createdAt}
                />
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-sm text-slate-600">
                  No updates yet. Brightlife NGO will share community news here soon.
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
