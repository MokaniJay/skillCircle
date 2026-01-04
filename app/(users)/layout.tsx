
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Navbar from "@/component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillCircle",
  description: "Skill-based developer collaboration platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}
      >

       <Navbar />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} SkillCircle · Academic Project
          </div>
        </footer>
      </body>
    </html>
  );
}
