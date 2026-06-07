"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { posts, users } from "@/lib/schema";

const createPostSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(10),
  imageUrl: z.preprocess(
    (value) => (value === "" || value == null ? undefined : String(value)),
    z.string().optional(),
  ),
});

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createPost(formData: FormData) {
  const session = await requireAdmin();
  const db = getDb();

  const parsed = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl"),
  });

  if (!parsed.success) {
    throw new Error("Invalid post data");
  }

  const authorEmail = session.user.email;
  if (!authorEmail) {
    throw new Error("Unauthorized");
  }

  const [authorRecord] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, authorEmail))
    .limit(1);

  if (!authorRecord) {
    throw new Error("Admin user not found");
  }

  await db.insert(posts).values({
    title: parsed.data.title,
    content: parsed.data.content,
    imageUrl: parsed.data.imageUrl ?? null,
    authorId: authorRecord.id,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const db = getDb();

  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) {
    throw new Error("Invalid post id");
  }

  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
