import { ArrowRight, ShieldCheck, Sprout, Users, Heart, Award, Gift } from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedSection } from "@/components/FeedSection";
import { getPublicPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPublicPosts();

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 relative overflow-hidden flex flex-col justify-between">
      {/* Premium background gradient blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-lime-300/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] h-[400px] w-[400px] rounded-full bg-emerald-300/5 blur-[80px] pointer-events-none" />

      <SiteHeader />

      <main className="flex-1 mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative grid gap-10 rounded-3xl border border-emerald-100 bg-gradient-to-br from-white/95 via-white/80 to-emerald-50/40 p-8 shadow-md shadow-emerald-100/10 md:grid-cols-[1.3fr_0.7fr] md:p-12 backdrop-blur-sm">
          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />
                Barpeta, Assam
              </span>
            </div>
            <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-800 bg-clip-text text-transparent leading-[1.1]">
              Empowering Communities. Creating Bright Futures.
            </h1>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
              Brightlife NGO is committed to transparent community updates, impactful welfare initiatives, and fostering growth in Assam.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl shadow-lg shadow-emerald-700/20 transition-all hover:translate-y-[-1px]">
                <Link href="#updates">
                  View Updates <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-200 hover:bg-slate-50 font-semibold rounded-xl text-slate-700">
                <Link href="#about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid gap-4 self-center">
            <Card className="border-slate-100/80 shadow-sm bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-emerald-100 hover:shadow-md">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                  <Sprout className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-800">12+</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Active Initiatives</p>
                  <p className="text-xs text-slate-500 mt-1">Focused on education, healthcare, and sustainable living.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100/80 shadow-sm bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-emerald-100 hover:shadow-md">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-800">5,000+</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Lives Impacted</p>
                  <p className="text-xs text-slate-500 mt-1">Families and individuals supported with essential aid.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100/80 shadow-sm bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-emerald-100 hover:shadow-md">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-800">100%</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Transparency</p>
                  <p className="text-xs text-slate-500 mt-1">Regular updates, community reports, and progress photos.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FOCUS AREAS SECTION */}
        <section id="about" className="space-y-6 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-950 to-emerald-950 bg-clip-text text-transparent">
              Our Primary Core Pillars
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              We focus on grass-roots initiatives to uplift underdeveloped communities in Barpeta and greater Assam.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border border-slate-100 bg-white/90 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 mb-2 group-hover:scale-105 duration-200">
                  <Heart className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-bold">Health & Hygiene</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 leading-relaxed">
                Conducting health camps, blood donation drives, distributing medical kits, and advocating sanitation practices in rural neighborhoods.
              </CardContent>
            </Card>

            <Card className="border border-slate-100 bg-white/90 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 mb-2 group-hover:scale-105 duration-200">
                  <Award className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-bold">Education Support</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 leading-relaxed">
                Uplifting children through book distribution, setting up community learning sessions, and sponsoring underprivileged students.
              </CardContent>
            </Card>

            <Card className="border border-slate-100 bg-white/90 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 mb-2 group-hover:scale-105 duration-200">
                  <Gift className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-bold">Disaster Relief</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 leading-relaxed">
                Providing emergency food packages, clean drinking water, clothes, and rehabilitation assistance during Assam floods and monsoons.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FEED SECTION */}
        <section id="updates" className="space-y-6 scroll-mt-20 border-t border-slate-100 pt-12">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Latest Live Updates
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Stay connected with our day-to-day progress, events, and community distributions.
            </p>
          </div>

          <FeedSection initialPosts={posts} />
        </section>

        {/* GET INVOLVED (MOCK CALL TO ACTION) */}
        <section className="rounded-3xl border border-emerald-150 bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 text-center text-white shadow-xl shadow-emerald-950/10 md:p-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Join Us in Making a Difference
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-medium">
              Whether you want to volunteer, donate resources, or partner for an initiative, your support brings hope and light to many.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-emerald-900 font-bold rounded-xl shadow cursor-pointer">
                <Link href="mailto:contact@brightlife.ngo">Become a Volunteer</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-emerald-500/80 hover:bg-emerald-800/40 text-white font-semibold rounded-xl cursor-pointer">
                <Link href="mailto:donate@brightlife.ngo">Inquire Donations</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
