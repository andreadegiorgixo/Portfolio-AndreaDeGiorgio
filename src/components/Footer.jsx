import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-ink/10 px-6 py-10 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
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
