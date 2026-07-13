import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const meta = [
  {
    tags: ["HTML", "Bootstrap", "CSS", "JS"],
    href: "https://www.ites-srl.it/index.html",
  },
  {
    tags: ["HTML", "Bootstrap", "CSS", "JS"],
    href: "https://barber-salvatore-labriola.netlify.app/",
  },
  {
    tags: ["HTML", "Bootstrap", "CSS", "JS"],
    href: "https://tabaccheria-lama.netlify.app/",
  },
];

const tagStyles = [
  "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  "bg-accent-100 text-accent-600 dark:bg-accent-900/40 dark:text-accent-400",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Projects() {
  const { t } = useLanguage();
  const projects = t.projects.items.map((p, i) => ({ ...p, ...meta[i] }));

  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {t.projects.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
            {t.projects.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
            {t.projects.description}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ name, desc, tags, href }, i) => (
            <motion.article
              key={name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              whileHover={{ y: -6 }}
              className="flex h-full flex-col rounded-3xl border border-border bg-surface-card p-6 shadow-brand-sm backdrop-blur transition-shadow hover:shadow-brand"
            >
              <h3 className="font-display italic text-lg font-bold text-ink">
                {name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag, j) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3 py-1 font-display text-xs font-semibold italic ${
                      tagStyles[j % tagStyles.length]
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-between gap-2 rounded-2xl bg-ink/5 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-600 hover:text-white"
              >
                {t.projects.visit}
                <ArrowUpRight size={16} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
