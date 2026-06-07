"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrightlifeLogo } from "@/components/brand-mark";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-[-20%] left-[-20%] h-[600px] w-[600px] rounded-full bg-emerald-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] h-[600px] w-[600px] rounded-full bg-lime-300/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-100 to-lime-50 border border-emerald-100 shadow-md text-emerald-700 hover:scale-105 duration-200">
            <BrightlifeLogo />
          </Link>
          <h2 className="text-xl font-bold text-slate-800">Brightlife NGO</h2>
          <p className="text-xs text-slate-500 font-medium">Barpeta, Assam, India</p>
        </div>

        <Card className="w-full border-slate-250 shadow-lg shadow-slate-100/50 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-bold text-slate-900">Admin Sign In</CardTitle>
            <CardDescription className="text-xs font-medium text-slate-500">
              Access the secure dashboard to manage announcements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setPending(true);
                setError(null);

                const formData = new FormData(event.currentTarget);
                const result = await signIn("credentials", {
                  redirect: false,
                  email: String(formData.get("email") ?? ""),
                  password: String(formData.get("password") ?? ""),
                  callbackUrl,
                });

                setPending(false);

                if (result?.error) {
                  setError("Invalid admin credentials.");
                  return;
                }

                window.location.href = result?.url ?? callbackUrl;
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@brightlife.ngo"
                  className="h-10 border-slate-200 focus-visible:ring-emerald-600 bg-white text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="h-10 border-slate-200 focus-visible:ring-emerald-600 bg-white text-sm"
                  required
                />
              </div>

              {error ? (
                <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-xs font-semibold text-red-700">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              ) : null}

              <Button
                type="submit"
                className="w-full h-10 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow cursor-pointer transition-all hover:translate-y-[-0.5px]"
                disabled={pending}
              >
                {pending ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to public site
          </Link>
        </div>
      </div>
    </main>
  );
}
