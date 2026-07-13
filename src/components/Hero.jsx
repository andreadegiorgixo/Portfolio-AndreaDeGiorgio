import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import profilePhoto from "../assets/profile-hero.jpg";
import workspacePhoto from "../assets/workspace.jpg";
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
      className="relative flex min-h-screen items-center px-6 pt-32 pb-20 lg:pl-28"
    >
      <span className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 select-none font-display text-sm font-bold uppercase tracking-[0.6em] text-ink-muted lg:block">
        Portfolio
      </span>

      <div className="mx-auto grid w-full max-w-6xl items-stretch gap-16 lg:grid-cols-[1fr_1.1fr] lg:divide-x lg:divide-ink/10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 text-center lg:order-1 lg:pr-14 lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 border border-ink/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink-soft"
          >
            {t.hero.location}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-8 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-ink sm:text-6xl"
          >
            {t.hero.greeting}
            <br />
            <span className="italic text-accent-text">Andrea</span> De Giorgio
          </motion.h1>

          <motion.div variants={item} className="mt-8 h-px w-24 bg-ink" />

          <motion.p
            variants={item}
            className="mx-auto mt-8 max-w-xl text-lg text-ink-soft sm:text-xl lg:mx-0"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:pl-14"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink/15 bg-surface-alt">
            <img
              src={profilePhoto}
              alt="Andrea De Giorgio"
              className="h-full w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="absolute -bottom-8 -left-8 w-48 overflow-hidden border-4 border-surface bg-surface-alt shadow-brand sm:w-60"
          >
            <img
              src={workspacePhoto}
              alt="La mia postazione di lavoro"
              className="aspect-square w-full object-cover"
            />
            <span className="block bg-ink px-2.5 py-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-surface">
              {t.hero.workspace}
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label={t.hero.scrollDown}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 place-items-center w-11 h-11 border border-ink/20 text-ink bg-surface/50 backdrop-blur sm:grid"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
