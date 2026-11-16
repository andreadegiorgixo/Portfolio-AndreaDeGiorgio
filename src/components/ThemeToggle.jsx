import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const options = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
];

// placement="menu": usato dentro il menu mobile (contenitore scrollabile e
// allineato a sinistra), quindi il popover si apre verso l'alto da sinistra
// invece di uscire dal bordo destro/inferiore.
export default function ThemeToggle({ placement = "navbar" }) {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const Current = options.find((o) => o.value === theme)?.icon ?? Monitor;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t.theme.label}
        aria-expanded={open}
        className="grid h-11 w-11 place-items-center border border-ink/20 bg-surface-alt text-ink-soft transition-colors hover:border-ink hover:text-ink"
      >
        <Current size={18} />
      </button>

      {open && (
        <div
          className={`absolute z-50 w-40 max-w-[calc(100vw-2rem)] overflow-hidden border border-ink/20 bg-surface ${
            placement === "menu" ? "bottom-full left-0 mb-2" : "right-0 top-full mt-2"
          }`}
        >
          {options.map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className="flex min-h-11 w-full items-center gap-2.5 px-4 py-2 text-left text-sm font-medium text-ink-soft transition-colors hover:bg-surface-alt hover:text-ink"
            >
              <Icon size={16} />
              <span className="flex-1">{t.theme[value]}</span>
              {theme === value && <Check size={14} className="text-ink" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
