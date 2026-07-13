import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const skills = [
  { name: "HTML & CSS & Bootstrap 5", pct: 90 },
  { name: "JavaScript", pct: 72 },
  { name: "Java", pct: 90 },
  { name: "Spring & Spring Boot", pct: 48 },
];

const stack = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "Bootstrap",
  "Java",
  "Spring & Spring Boot",
  "MySQL",
  "MariaDB",
  "Oracle DB",
  "GitHub",
  "VS Code",
  "IntelliJ IDEA",
  "MacOS",
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

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative px-6 py-28">
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
          <h2 className="mt-3 font-display text-4xl font-bold uppercase text-ink sm:text-5xl">
            {t.skills.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-ink" />
        </motion.div>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
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
                <div className="mb-2 flex items-baseline justify-between">
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-ink-muted">
              {t.skills.stackCaption}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  custom={i * 0.4}
                  whileHover={{ y: -2 }}
                  className="border border-ink/20 bg-surface-card px-4 py-2 font-display text-sm font-medium italic text-ink backdrop-blur transition-colors hover:border-ink"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
