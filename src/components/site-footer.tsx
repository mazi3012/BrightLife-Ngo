import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 bg-white relative z-10">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <BrandMark showTagline />
            <p className="text-sm leading-6 text-slate-500 max-w-sm">
              Brightlife NGO shares community work, health camps, and updates with a transparent, calm presence for Barpeta and beyond.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Initiatives</h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li>Rural Healthcare Camps</li>
              <li>Free Primary Book Distribution</li>
              <li>Flood Emergency Response</li>
              <li>Sanitation & Hygiene Drives</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact & Location</h4>
            <p className="text-sm text-slate-600 font-medium">
              Barpeta, Assam, India - 781301
            </p>
            <p className="text-sm text-slate-600 font-medium">
              Email: <a href="mailto:contact@brightlife.ngo" className="text-emerald-700 hover:underline">contact@brightlife.ngo</a>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {currentYear} Brightlife NGO. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Registered Non-Governmental Organization (Assam, India)
          </p>
        </div>
      </div>
    </footer>
  );
}
