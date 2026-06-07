import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  href?: string;
  showTagline?: boolean;
  className?: string;
};

export function BrightlifeLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("h-6 w-6 select-none", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" /> {/* emerald-500 */}
          <stop offset="60%" stopColor="#059669" /> {/* emerald-600 */}
          <stop offset="100%" stopColor="#84cc16" /> {/* lime-500 */}
        </linearGradient>
        <linearGradient id="sun-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" /> {/* amber-400 */}
          <stop offset="100%" stopColor="#f59e0b" /> {/* amber-500 */}
        </linearGradient>
      </defs>
      
      {/* Outer sun rays / community circle */}
      <circle
        cx="50"
        cy="50"
        r="42"
        stroke="url(#logo-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="10 15"
        fill="none"
        className="origin-center animate-[spin_30s_linear_infinite]"
      />

      {/* Main Sprout Left Leaf */}
      <path
        d="M50 82 C 50 58, 38 42, 24 38 C 40 40, 48 55, 50 82 Z"
        fill="url(#logo-grad)"
      />

      {/* Main Sprout Right Leaf */}
      <path
        d="M50 82 C 50 48, 66 32, 78 28 C 68 36, 56 55, 50 82 Z"
        fill="url(#logo-grad)"
      />

      {/* Golden Rising Sun / Fruit of Success */}
      <circle cx="50" cy="22" r="6" fill="url(#sun-grad)" className="animate-pulse" />
    </svg>
  );
}

export function BrandMark({
  href = "/",
  showTagline = true,
  className,
}: BrandMarkProps) {
  const content = (
    <div className={cn("flex items-center gap-3 group/logo", className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-lime-50 border border-emerald-100/80 text-emerald-700 shadow-md shadow-emerald-100/30 transition-all duration-300 group-hover/logo:shadow-emerald-200/50 group-hover/logo:scale-105 group-hover/logo:border-emerald-200">
        <BrightlifeLogo />
      </div>
      <div className="leading-tight">
        <p className="text-base font-bold tracking-tight text-slate-800 transition-colors group-hover/logo:text-emerald-800">
          Brightlife NGO
        </p>
        {showTagline ? (
          <p className="text-[11px] font-medium text-slate-500 transition-colors group-hover/logo:text-slate-600">
            Community upliftment · Barpeta, Assam
          </p>
        ) : null}
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} aria-label="Brightlife NGO home">
      {content}
    </Link>
  );
}
