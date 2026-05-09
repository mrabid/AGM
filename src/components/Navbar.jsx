import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { navItems } from "../data/content";

export function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const toId = (item) => item.toLowerCase().replace(/\s+/g, "-");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-base-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="text-sm font-semibold tracking-[0.24em] text-white">
          M.I
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${toId(item)}`}
              className="text-sm text-accent-smoke transition hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-white/15 p-2 text-accent-smoke transition hover:border-accent-gold hover:text-accent-gold"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            className="rounded-full border border-white/15 p-2 text-accent-smoke md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-base-900 px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${toId(item)}`}
                onClick={() => setOpen(false)}
                className="text-sm text-accent-smoke transition hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  );
}
