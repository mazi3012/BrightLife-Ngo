import { desc, eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { posts, users } from "@/lib/schema";

export async function getPublicPosts() {
  const db = getDb();
  return db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      imageUrl: posts.imageUrl,
      createdAt: posts.createdAt,
      authorEmail: users.email,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .orderBy(desc(posts.createdAt));
}

export async function getAdminPosts() {
  return getPublicPosts();
}
