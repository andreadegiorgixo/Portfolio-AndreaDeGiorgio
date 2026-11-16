import { motion } from "framer-motion";
import { Briefcase, MapPin, Languages, Sparkles } from "lucide-react";
import aboutPhoto from "../assets/profile-about.jpg";
import { useLanguage } from "../context/LanguageContext";

const icons = [Briefcase, MapPin, Languages, Sparkles];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative px-6 py-20 sm:py-28 compact:py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-ink-muted">
            {t.about.eyebrow}
          </span>
          <h2 className="section-title mt-3 font-display font-bold uppercase text-ink">
            {t.about.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-ink" />
        </motion.div>

        <div className="mt-12 grid items-center gap-10 sm:mt-16 sm:gap-12 wide:grid-cols-[0.85fr_1.15fr] compact:gap-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-auto w-full max-w-[min(100%,20rem,50dvh)] overflow-hidden border border-ink/15 bg-surface-alt compact:max-w-full sm:max-w-xs"
          >
            <img
              src={aboutPhoto}
              alt="Andrea De Giorgio"
              width={1200}
              height={1600}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            custom={1}
            className="space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg compact:text-base"
          >
            <p>
              <strong className="font-display italic font-semibold text-ink">
                {t.about.role}
              </strong>
              {t.about.introEnd}{" "}
              <strong className="font-display italic font-semibold text-ink">
                {t.about.stack}
              </strong>
              {t.about.afterStack}
            </p>
            <p>{t.about.paragraph}</p>
            <p>{t.about.paragraph2}</p>
            <span className="inline-flex items-center border border-ink/20 px-4 py-1.5 font-display text-sm font-semibold italic text-ink">
              {t.about.badge}
            </span>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4">
          {t.about.facts.map(({ label, value }, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={i}
                whileHover={{ y: -6 }}
                className="border border-ink/15 bg-surface-card p-3 text-center backdrop-blur transition-colors hover:border-ink sm:p-5"
              >
                <Icon className="mx-auto text-ink" size={26} />
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {label}
                </p>
                <p className="mt-1 break-words font-display text-[0.9375rem] font-bold text-ink sm:text-base">
                  {value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
