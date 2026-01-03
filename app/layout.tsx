
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">

              {/* Brand */}
              <Link
                href="/"
                className="text-lg font-semibold text-gray-800 tracking-wide"
              >
                Skill<span className="text-green-600">Circle</span>
              </Link>

              {/* Navigation */}
              <ul className="flex items-center gap-8 text-sm font-medium text-gray-600">
                <li>
                  <Link
                    href="/"
                    className="hover:text-green-600 border-b-2 border-transparent hover:border-green-600 transition"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="hover:text-green-600 border-b-2 border-transparent hover:border-green-600 transition"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="/startquiz"
                    className="hover:text-green-600 border-b-2 border-transparent hover:border-green-600 transition"
                  >
                    Start Quiz
                  </Link>
                </li>

                <li>
                  <Link
                    href="/showcase"
                    className="hover:text-green-600 border-b-2 border-transparent hover:border-green-600 transition"
                  >
                    Showcase
                  </Link>
                </li>

                <li>
                  <Link
                    href="/project"
                    className="hover:text-green-600 border-b-2 border-transparent hover:border-green-600 transition"
                  >
                    Projects
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

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
