import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const skills = [
  { name: "HTML & CSS & Bootstrap 5", pct: 90 },
  { name: "JavaScript", pct: 72 },
  { name: "Java", pct: 90 },
  { name: "Spring & Spring Boot", pct: 48 },
];

const stack = [
  "Java",
  "Spring & Spring Boot",
  "SQL",
  "Oracle DB",
  "PostgreSQL",
  "MySQL",
  "MariaDB",
  "Docker",
  "Angular",
  "HTML5",
  "CSS3",
  "JavaScript",
  "Bootstrap",
  "Excel",
  "Salesforce",
  "GitHub",
  "VS Code",
  "IntelliJ IDEA",
  "macOS",
  "Windows",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((tech, i) => (
        <motion.span
          key={tech}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          custom={i * 0.4}
          whileHover={{ y: -2 }}
          className="max-w-full border border-ink/20 bg-surface-card px-3 py-2 font-display text-sm sm:px-4 font-medium italic text-ink backdrop-blur transition-colors hover:border-ink"
        >
          {tech}
        </motion.span>
      ))}
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative px-6 py-20 sm:py-28 compact:py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-ink-muted">
            {t.skills.eyebrow}
          </span>
          <h2 className="section-title mt-3 font-display font-bold uppercase text-ink">
            {t.skills.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-ink" />
          <p className="mx-auto mt-6 max-w-2xl text-ink-soft">
            {t.skills.description}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-12 sm:mt-16 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-muted">
              {t.skills.devCaption}
            </p>
            <div className="space-y-7">
              {skills.map(({ name, pct }, i) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  custom={i}
                >
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="font-display italic font-semibold text-ink">
                      {name}
                    </span>
                    <span className="text-sm font-medium text-ink-muted">
                      {t.skills.levels[i]}
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden border border-ink/15 bg-surface-alt">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + i * 0.08,
                        ease: "easeOut",
                      }}
                      className="h-full bg-accent"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-muted">
              {t.skills.pmCaption}
            </p>
            <Chips items={t.skills.pmItems} />
            <p className="mb-4 mt-10 text-xs font-bold uppercase tracking-widest text-ink-muted">
              {t.skills.stackCaption}
            </p>
            <Chips items={stack} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
