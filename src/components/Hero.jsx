import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import profilePhoto from "../assets/profile-hero.jpg";
import { useLanguage } from "../context/LanguageContext";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative px-6 pt-32 pb-20 sm:pb-24 lg:pt-32 lg:pb-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center border border-ink/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-soft"
          >
            {t.hero.role}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-ink"
          >
            <span className="block text-xl italic text-accent-text sm:text-2xl">
              {t.hero.greeting}
            </span>
            <span className="mt-2 block text-[2.75rem] font-extrabold uppercase leading-[1] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block whitespace-nowrap">Andrea</span>
              <span className="block whitespace-nowrap">De Giorgio</span>
            </span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mx-auto mt-6 h-px w-16 bg-ink lg:mx-0"
          />

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg text-ink-soft sm:text-xl lg:mx-0"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <motion.a
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex items-center gap-2 border border-ink bg-ink px-7 py-3.5 font-semibold text-surface transition-colors hover:bg-transparent hover:text-ink"
            >
              <Mail size={18} /> {t.hero.contact}
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.97 }}
              href="/docs/Andrea-De-Giorgio-CV.pdf"
              download
              className="inline-flex items-center gap-2 border border-ink/30 px-7 py-3.5 font-semibold text-ink transition-colors hover:border-ink hover:text-accent-text"
            >
              <Download size={18} /> {t.hero.cv}
            </motion.a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-10 grid gap-5 border-t border-ink/15 pt-6 text-center sm:grid-cols-3 sm:gap-6 lg:text-left"
          >
            {t.hero.proof.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-balance font-display text-base font-semibold leading-snug text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative order-1 mx-auto w-full max-w-xs sm:max-w-sm lg:order-2 lg:mr-0 lg:ml-auto lg:max-w-md"
        >
          {/* Cornice sottile sfalsata: dà profondità senza ombre né colori nuovi */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 border border-ink/15"
          />
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink/15 bg-surface-alt">
            <img
              src={profilePhoto}
              alt="Andrea De Giorgio"
              className="h-full w-full object-cover object-[50%_20%]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
