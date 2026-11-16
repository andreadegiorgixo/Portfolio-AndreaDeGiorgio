import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

export default function Navbar({ page }) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  const links = [
    { href: "#top", page: "home", label: t.nav.about },
    { href: "#experience", page: "experience", label: t.nav.experience },
    { href: "#projects", page: "projects", label: t.nav.projects },
    { href: "#contact", page: "contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile aperto: Esc lo chiude (e riporta il focus sul pulsante), lo
  // scroll della pagina sotto è bloccato e il menu si chiude se lo schermo
  // diventa abbastanza largo da mostrare la navbar desktop (rotazione, resize).
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onResize = () => desktop.matches && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        scrolled || open
          ? "border-ink/10 bg-surface/90 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 py-3 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] sm:pl-[max(2.5rem,env(safe-area-inset-left))] sm:pr-[max(2.5rem,env(safe-area-inset-right))] xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex min-h-11 items-center gap-2 font-display italic font-bold text-lg leading-tight text-ink xl:justify-self-start"
        >
          Andrea De Giorgio
        </a>

        <ul className="hidden xl:flex items-center justify-center gap-8 text-xs font-bold uppercase tracking-widest text-ink-soft xl:justify-self-center">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={page === link.page ? "page" : undefined}
                className={`relative whitespace-nowrap transition-colors hover:text-ink after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-accent after:transition-all hover:after:w-full ${
                  page === link.page ? "text-ink after:w-full" : "after:w-0"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 xl:justify-self-end">
          <div className="hidden sm:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <motion.a
            whileTap={{ scale: 0.96 }}
            href="#contact"
            className="hidden min-h-11 xl:inline-flex items-center border border-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-surface"
          >
            {t.nav.cta}
          </motion.a>

          <motion.button
            whileTap={{ scale: 0.92 }}
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden grid h-11 w-11 flex-none place-items-center border border-ink/20 text-ink"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-h-[calc(100dvh-4.4rem-env(safe-area-inset-top))] overflow-y-auto overscroll-contain border-t border-ink/10 bg-surface/95 pb-[env(safe-area-inset-bottom)] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] backdrop-blur-lg xl:hidden"
          >
            <ul className="flex flex-col gap-1 py-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={page === link.page ? "page" : undefined}
                    className={`flex min-h-11 items-center text-xs font-bold uppercase tracking-widest hover:text-ink ${
                      page === link.page ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex sm:hidden items-center gap-3 pb-4 pt-1">
              <LanguageToggle />
              <ThemeToggle placement="menu" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
