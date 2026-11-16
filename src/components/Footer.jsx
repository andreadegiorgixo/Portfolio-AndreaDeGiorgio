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
    <footer className="relative border-t border-ink/10 px-6 py-10 text-center">
      <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-widest text-ink-soft">
        {pages.map(({ href, label }) => (
          <a key={href} href={href} className="transition-colors hover:text-ink">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {channels.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            title={label}
            aria-label={label}
            className="border border-ink/20 p-2.5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-surface"
          >
            <Icon width={16} height={16} />
          </a>
        ))}
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-ink-muted">
        {t.footer(new Date().getFullYear())}
      </p>
      <a
        href="#privacy"
        className="mt-2 inline-block text-xs font-semibold uppercase tracking-widest text-ink-muted underline underline-offset-2 transition-colors hover:text-ink"
      >
        {t.privacy.title}
      </a>
    </footer>
  );
}
