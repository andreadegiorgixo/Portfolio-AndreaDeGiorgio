import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const options = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const Current = options.find((o) => o.value === theme)?.icon ?? Monitor;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t.theme.label}
        className="grid h-10 w-10 place-items-center border border-ink/20 bg-surface-alt text-ink-soft transition-colors hover:border-ink hover:text-ink"
      >
        <Current size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-40 overflow-hidden border border-ink/20 bg-surface">
          {options.map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-ink-soft transition-colors hover:bg-surface-alt hover:text-ink"
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
