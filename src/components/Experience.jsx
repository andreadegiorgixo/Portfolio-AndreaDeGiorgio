import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const accents = {
  brand: {
    icon: "from-brand-400 to-brand-600",
    caption: "text-brand-600 dark:text-brand-400",
    border: "border-brand-200 dark:border-brand-800",
    dot: "from-brand-400 to-brand-600",
    period: "text-brand-600 dark:text-brand-400",
    bullet: "bg-brand-400",
  },
  accent: {
    icon: "from-accent-400 to-accent-600",
    caption: "text-accent-600 dark:text-accent-400",
    border: "border-accent-200 dark:border-accent-800",
    dot: "from-accent-400 to-accent-600",
    period: "text-accent-600 dark:text-accent-400",
    bullet: "bg-accent-400",
  },
};

function Track({ icon: Icon, caption, title, items, accent = "brand" }) {
  const a = accents[accent];
  return (
    <div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mb-8 flex items-center gap-3"
      >
        <span
          className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-brand-sm ${a.icon}`}
        >
          <Icon size={20} />
        </span>
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-widest ${a.caption}`}
          >
            {caption}
          </p>
          <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
        </div>
      </motion.div>

      <div className={`relative space-y-6 border-l-2 pl-6 ${a.border}`}>
        {items.map((entry, i) => (
          <motion.article
            key={entry.role}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={i + 1}
            className="relative rounded-3xl border border-border bg-surface-card p-6 shadow-brand-sm backdrop-blur"
          >
            <span
              className={`absolute -left-[1.95rem] top-7 h-3 w-3 rounded-full bg-gradient-to-br ring-4 ring-surface ${a.dot}`}
            />
            <span
              className={`text-xs font-bold uppercase tracking-wide ${a.period}`}
            >
              {entry.period}
            </span>
            <h4 className="mt-1 font-display italic text-lg font-bold text-ink">
              {entry.role}
            </h4>
            <p className="mt-0.5 text-sm font-medium text-ink-muted">
              {entry.place}
            </p>
            {entry.desc && (
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {entry.desc}
              </p>
            )}
            {entry.bullets && (
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
                {entry.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span
                      className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${a.bullet}`}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t.experience.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
            {t.experience.title}
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <Track
            icon={Briefcase}
            caption={t.experience.workCaption}
            title={t.experience.workTitle}
            items={t.experience.work}
            accent="brand"
          />
          <Track
            icon={GraduationCap}
            caption={t.experience.eduCaption}
            title={t.experience.eduTitle}
            items={t.experience.education}
            accent="accent"
          />
        </div>
      </div>
    </section>
  );
}
