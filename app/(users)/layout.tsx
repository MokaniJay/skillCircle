"use client";

import { useEffect } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/component/Navbar";
import Footer from "./footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    alert(
   "SkillCircle is currently presented as an academic prototype.\n" +
"While core features demonstrate the concept, full-scale functionality and business deployment are under ongoing development.\n" +
"This project is intended to evolve into a complete real-world platform."
    );
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800 min-h-screen flex flex-col`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="w-full px-0 py-0 flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
