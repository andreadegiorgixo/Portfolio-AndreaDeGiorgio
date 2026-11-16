import { useLanguage } from "../context/LanguageContext";
import { channels } from "../socials";

export default function Footer() {
  const { t } = useLanguage();

  const pages = [
    { href: "#top", label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative border-t border-ink/10 px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-8 text-center sm:py-10">
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs sm:gap-x-8 font-bold uppercase tracking-widest text-ink-soft">
        {pages.map(({ href, label }) => (
          <a key={href} href={href} className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {channels.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            title={label}
            aria-label={label}
            className="grid h-11 w-11 place-items-center border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-surface"
          >
            <Icon width={16} height={16} />
          </a>
        ))}
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink-muted">
        {t.footer(new Date().getFullYear())}
      </p>
      <a
        href="#privacy"
        className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-widest text-ink-muted underline underline-offset-2 transition-colors hover:text-ink"
      >
        {t.privacy.title}
      </a>
    </footer>
  );
}
