import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

function Track({ icon: Icon, caption, title, items }) {
  return (
    <div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mb-8 flex items-center gap-3"
      >
        <span className="grid h-11 w-11 place-items-center border border-ink bg-ink text-surface">
          <Icon size={20} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">
            {caption}
          </p>
          <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
        </div>
      </motion.div>

      <div className="relative space-y-6 border-l-2 border-ink/15 pl-6">
        {items.map((entry, i) => (
          <motion.article
            key={entry.role}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            custom={i + 1}
            className="relative border border-ink/15 bg-surface-card p-6 backdrop-blur"
          >
            <span className="absolute -left-[1.9rem] top-7 h-3 w-3 bg-accent ring-4 ring-surface" />
            <span className="text-xs font-bold uppercase tracking-wide text-ink-muted">
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
                    <span className="mt-2 h-1.5 w-1.5 flex-none bg-ink/50" />
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
          <span className="text-sm font-bold uppercase tracking-widest text-ink-muted">
            {t.experience.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase text-ink sm:text-5xl">
            {t.experience.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-ink" />
        </motion.div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <Track
            icon={Briefcase}
            caption={t.experience.workCaption}
            title={t.experience.workTitle}
            items={t.experience.work}
          />
          <Track
            icon={GraduationCap}
            caption={t.experience.eduCaption}
            title={t.experience.eduTitle}
            items={t.experience.education}
          />
        </div>

        <div className="mt-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center border border-ink bg-ink text-surface">
              <Quote size={20} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                {t.experience.testimonials.caption}
              </p>
              <h3 className="font-display text-xl font-bold text-ink">
                {t.experience.testimonials.title}
              </h3>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {t.experience.testimonials.items.map(({ name, quote }, i) => (
              <motion.figure
                key={name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="flex h-full flex-col border border-ink/15 bg-surface-card p-6 backdrop-blur"
              >
                <Quote size={20} className="text-ink-muted" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-4 font-display italic text-sm font-bold text-ink">
                  {name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
