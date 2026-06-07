import { getServerSession } from "next-auth/next";
import type { Metadata } from "next";

import { authOptions } from "@/lib/auth";
import { AdminHeaderActions } from "@/components/AdminHeaderActions";
import { BrightlifeLogo } from "@/components/brand-mark";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-slate-50/60">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 shadow-sm">
              <BrightlifeLogo />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Brightlife NGO
              </p>
              <h1 className="text-base font-bold text-slate-800 leading-none mt-0.5">
                Admin Panel
              </h1>
            </div>
          </div>
          <AdminHeaderActions email={session?.user?.email} />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
