import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: "/signup", label: "Create Account" },
    { to: "/login", label: "Sign In" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-royal-970/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Logo />

        <div className="hidden items-center gap-3 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                pathname === l.to
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/signup" className="btn-cta px-5 py-2.5 text-sm">
            Get Started
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-royal-960/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  pathname === l.to
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="btn-cta mt-1 w-full"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
