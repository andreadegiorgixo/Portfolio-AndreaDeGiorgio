import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 border border-ink/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-muted">
            <ShieldCheck size={14} /> {t.privacy.badge}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold uppercase text-ink sm:text-5xl">
            {t.privacy.title}
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-ink" />
          <p className="mx-auto mt-6 max-w-xl text-ink-soft">{t.privacy.intro}</p>
        </motion.div>

        <div className="mt-14 space-y-10">
          {t.privacy.sections.map((section, i) => (
            <motion.div
              key={section.heading}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="border-l-2 border-ink/15 pl-6"
            >
              <h2 className="font-display text-lg font-bold text-ink">{section.heading}</h2>
              <p className="mt-2 text-ink-soft">{section.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#top"
            className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-surface"
          >
            <ArrowLeft size={14} /> {t.privacy.backHome}
          </a>
        </div>
      </div>
    </section>
  );
}
