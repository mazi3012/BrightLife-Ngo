"use client";

import { signOut } from "next-auth/react";
import { LogOut, Globe } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AdminHeaderActions({ email }: { email?: string | null }) {
  return (
    <div className="flex items-center gap-4">
      <span className="hidden text-sm font-medium text-slate-500 sm:inline bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50">
        Admin: <span className="font-semibold text-emerald-800">{email}</span>
      </span>
      <Button asChild variant="outline" size="sm" className="rounded-lg gap-1.5 border-slate-200 text-slate-600 hover:text-emerald-800 hover:bg-slate-50 cursor-pointer">
        <Link href="/">
          <Globe className="h-4 w-4" />
          Public site
        </Link>
      </Button>
      <Button
        variant="destructive"
        size="sm"
        className="rounded-lg gap-1.5 bg-red-600 hover:bg-red-700 text-white font-medium cursor-pointer"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    </div>
  );
}
