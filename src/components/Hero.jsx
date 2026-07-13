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
      className="relative flex min-h-screen items-center px-6 pt-28 pb-20"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-brand-sm dark:bg-brand-900/40 dark:text-brand-300"
          >
            📍 {t.hero.location}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.1] text-ink sm:text-6xl"
          >
            {t.hero.greeting}{" "}
            <span className="text-gradient font-medium italic">
              Andrea De Giorgio
            </span>{" "}
            👋
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-lg text-ink-soft sm:text-xl lg:mx-0"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-7 py-3.5 font-semibold text-white shadow-brand transition-transform hover:-translate-y-0.5 hover:scale-105"
            >
              <Mail size={18} /> {t.hero.contact}
            </a>
            <a
              href="/docs/Andrea-De-Giorgio-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-300 bg-surface/60 px-7 py-3.5 font-semibold text-ink backdrop-blur transition-transform hover:-translate-y-0.5 hover:border-brand-500 dark:border-brand-700"
            >
              <Download size={18} /> {t.hero.cv}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative order-1 mx-auto w-full max-w-md lg:order-2"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-brand">
            <img
              src={profilePhoto}
              alt="Andrea De Giorgio"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/30 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            whileHover={{ scale: 1.04 }}
            className="absolute -bottom-8 -left-8 w-48 overflow-hidden rounded-3xl border-4 border-surface shadow-brand sm:w-60"
          >
            <img
              src={workspacePhoto}
              alt="La mia postazione di lavoro"
              className="aspect-square w-full object-cover"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
              {t.hero.workspace} ✦
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label={t.hero.scrollDown}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 place-items-center w-11 h-11 rounded-full border border-brand-300 text-brand-600 bg-surface/50 backdrop-blur sm:grid dark:border-brand-700 dark:text-brand-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
