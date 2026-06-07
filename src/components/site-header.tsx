import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <BrandMark showTagline={false} />
        <nav className="flex items-center gap-5">
          <Link
            href="/#updates"
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-800"
          >
            Updates
          </Link>
          <Link
            href="/#about"
            className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-800"
          >
            Our Work
          </Link>
        </nav>
      </div>
    </header>
  );
}
