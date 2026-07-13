import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "it" ? "en" : "it")}
      aria-label="Cambia lingua / Switch language"
      className="relative grid h-10 w-16 grid-cols-2 place-items-center rounded-full border border-border bg-surface-alt text-xs font-bold text-ink-soft"
    >
      <span
        className={`absolute top-1 h-8 w-7 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 shadow-brand-sm transition-transform duration-300 ${
          lang === "it" ? "translate-x-[-8px]" : "translate-x-[8px]"
        }`}
      />
      <span className={`relative z-10 ${lang === "it" ? "text-white" : ""}`}>
        IT
      </span>
      <span className={`relative z-10 ${lang === "en" ? "text-white" : ""}`}>
        EN
      </span>
    </button>
  );
}
