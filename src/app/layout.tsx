import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Brightlife NGO - Community Upliftment & Transparency in Barpeta, Assam",
    template: "%s | Brightlife NGO",
  },
  description: "Brightlife NGO is dedicated to community development, health camps, education, and local updates in Barpeta, Assam. Follow our public feed for regular progress updates.",
  keywords: ["NGO Barpeta", "Brightlife NGO", "Assam NGO", "Community Upliftment Assam", "Assam Development", "Social Service Barpeta", "NGO updates Barpeta"],
  authors: [{ name: "Brightlife NGO Team" }],
  creator: "Brightlife NGO",
  publisher: "Brightlife NGO",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://brightlife.ngo"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brightlife NGO - Community Upliftment in Barpeta, Assam",
    description: "Official updates, community progress, and transparent notices from Brightlife NGO, Barpeta, Assam.",
    url: "https://brightlife.ngo",
    siteName: "Brightlife NGO",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brightlife NGO - Barpeta, Assam",
    description: "Official community updates, announcements, and initiatives of Brightlife NGO in Barpeta, Assam.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
