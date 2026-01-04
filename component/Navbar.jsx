import Link from "next/link";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;