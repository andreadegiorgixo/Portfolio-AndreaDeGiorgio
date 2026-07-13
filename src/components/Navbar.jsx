import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-ink/10 bg-surface/90 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="w-full flex items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:grid lg:grid-cols-3">
        <a
          href="#top"
          className="flex items-center gap-2 font-display italic font-bold text-lg text-ink lg:justify-self-start"
        >
          Andrea De Giorgio
        </a>

        <ul className="hidden lg:flex items-center justify-center gap-8 text-xs font-bold uppercase tracking-widest text-ink-soft lg:justify-self-center">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative transition-colors hover:text-ink after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 lg:justify-self-end">
          <div className="hidden sm:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <motion.a
            whileTap={{ scale: 0.96 }}
            href="#contact"
            className="hidden lg:inline-flex items-center border border-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-surface"
          >
            {t.nav.cta}
          </motion.a>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid place-items-center w-10 h-10 border border-ink/20 text-ink"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-surface/95 backdrop-blur-lg px-6 border-t border-ink/10"
          >
            <ul className="flex flex-col gap-1 py-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-xs font-bold uppercase tracking-widest text-ink-soft hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex sm:hidden items-center gap-3 pb-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
