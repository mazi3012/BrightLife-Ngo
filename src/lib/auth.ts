import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { users } from "@/lib/schema";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

async function getAdminSeed() {
  const email = requireEnv("ADMIN_EMAIL");
  const passwordHashBase64 = requireEnv("ADMIN_PASSWORD_HASH_B64");
  const passwordHash = Buffer.from(passwordHashBase64, "base64").toString("utf8");
  return { email, passwordHash };
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";

        if (!email || !password) {
          return null;
        }

        const seed = await getAdminSeed();
        if (email !== seed.email.toLowerCase()) {
          return null;
        }

        const matches = await compare(password, seed.passwordHash);
        if (!matches) {
          return null;
        }

        const db = getDb();
        const [existing] = await db
          .select({ id: users.id, email: users.email })
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!existing) {
          const created = await db
            .insert(users)
            .values({ email, passwordHash: seed.passwordHash })
            .returning({ id: users.id, email: users.email });

          return created[0]
            ? { id: String(created[0].id), email: created[0].email }
            : null;
        }

        return { id: String(existing.id), email: existing.email };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = String(token.id ?? token.sub ?? "");
        session.user.email = token.email ?? session.user.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function verifyAdminPassword(password: string) {
  const { passwordHash } = await getAdminSeed();
  return compare(password, passwordHash);
}
