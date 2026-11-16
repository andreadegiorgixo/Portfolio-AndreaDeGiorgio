import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "it" ? "en" : "it")}
      aria-label="Cambia lingua / Switch language"
      className="relative grid h-11 w-[4.5rem] flex-none grid-cols-2 place-items-center border border-ink/20 bg-surface-alt text-xs font-bold text-ink-soft"
    >
      <span
        className={`absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] bg-ink transition-transform duration-300 ${
          lang === "it" ? "translate-x-0" : "translate-x-full"
        }`}
      />
      <span className={`relative z-10 ${lang === "it" ? "text-surface" : ""}`}>
        IT
      </span>
      <span className={`relative z-10 ${lang === "en" ? "text-surface" : ""}`}>
        EN
      </span>
    </button>
  );
}
