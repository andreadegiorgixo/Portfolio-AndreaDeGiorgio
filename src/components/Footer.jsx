import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative px-6 py-10 text-center">
      <p className="text-sm text-ink-muted">
        {t.footer(new Date().getFullYear())}
      </p>
    </footer>
  );
}
