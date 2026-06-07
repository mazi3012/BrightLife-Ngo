import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-emerald-800">
          Brightlife NGO
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="#updates" className="text-slate-600 hover:text-slate-900">
            Updates
          </Link>
          <Link href="/admin" className="text-slate-600 hover:text-slate-900">
            Admin
          </Link>
          <Button asChild variant="default" size="sm">
            <Link href="/admin">Open Dashboard</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
