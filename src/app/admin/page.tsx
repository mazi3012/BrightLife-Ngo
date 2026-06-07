import { desc } from "drizzle-orm";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ImageUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createPost, deletePost } from "@/lib/actions";
import { getDb } from "@/lib/db";
import { posts } from "@/lib/schema";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const db = getDb();
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Share community work, updates, and notices.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPost} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Example: Health camp held in Barpeta" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write the update for the public feed..."
                className="min-h-40"
              />
            </div>
            <ImageUpload name="imageUrl" />
            <Button type="submit">Publish post</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All posts</CardTitle>
          <CardDescription>Manage the public feed from here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allPosts.length ? (
                allPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.imageUrl ? "Yes" : "—"}</TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
                        post.createdAt,
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <form action={deletePost}>
                        <input type="hidden" name="id" value={post.id} />
                        <Button type="submit" variant="destructive" size="sm">
                          Delete
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-slate-500">
                    No posts yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
