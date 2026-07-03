"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Left: Hamburger + Brand */}
            <div className="flex items-center gap-4">
              {/* Hamburger Button (Mobile) */}
              <button
                className="md:hidden relative w-8 h-8"
                onClick={() => setOpen(!open)}
                aria-label="Toggle Menu"
              >
                <span
                  className={`absolute left-0 top-2 w-6 h-[2px] bg-gray-800 transition-all duration-300
                  ${open ? "rotate-55 top-6" : ""}`}
                />
                <span
                  className={`absolute left-0 top-4 w-6 h-[2px] bg-gray-800 transition-all duration-300
                  ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-6 w-6 h-[2px] bg-gray-800 transition-all duration-300
                  ${open ? "-rotate-55 top-6" : ""}`}
                />
              </button>

              {/* Brand */}
              <Link
                href="/"
                onClick={handleClose}
                className="text-lg font-semibold text-gray-800 tracking-wide"
              >
                Skill<span className="text-green-600">Circle</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8 text-base font-medium text-gray-600">
              {navItems(handleClose)}
            </ul>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <ul className="flex flex-col gap-4 py-4 text-sm font-medium text-gray-600">
              {navItems(handleClose)}
            </ul>
          </div>
        </nav>
      </header>

      {/* Spacer (important for fixed navbar) */}
      <div className="h-16" />
    </>
  );
};

const navItems = (onClick) => (
  <>
    {[
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Start Quiz", href: "/startquiz" },
      { name: "Showcase", href: "/showcase" },
      // { name: "Projects", href: "/project" },
    ].map((item) => (
      <li key={item.name}>
        <Link
          href={item.href}
          onClick={onClick}
          className="relative inline-block transition hover:text-green-600
                     after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                     after:w-0 after:bg-green-600 after:transition-all
                     hover:after:w-full"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </>
);

export default Navbar;
