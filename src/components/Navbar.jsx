import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../data/content";

export function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const toId = (item) => item.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-[90rem] items-center justify-between gap-3 px-5 sm:h-16 sm:px-6 lg:px-10 xl:px-12">
        <a href="#hero" className="type-small theme-text shrink-0 font-semibold tracking-[0.2em]">
          M.I
        </a>

        <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${toId(item)}`}
              className="type-small theme-muted whitespace-nowrap transition hover:text-accent-gold"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-icon-btn flex h-10 w-10 items-center justify-center rounded-full border transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            className="theme-icon-btn flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 backdrop-blur-sm md:hidden"
              style={{ background: "var(--c-overlay)" }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mobile-nav fixed inset-x-0 top-14 z-50 max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b px-4 py-4 sm:top-16 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${toId(item)}`}
                    onClick={() => setOpen(false)}
                    className="type-body theme-muted rounded-xl px-4 py-3 font-medium transition hover:bg-accent-gold/10 hover:text-accent-gold"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
