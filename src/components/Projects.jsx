import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import candidateImg from "../assets/projects/candidate.jpg";
import propassImg from "../assets/projects/propass.jpg";
import ristorandotiImg from "../assets/projects/ristorandoti.jpg";
import barberImg from "../assets/projects/barber.jpg";
import itesImg from "../assets/projects/ites.jpg";

const meta = [
  {
    image: candidateImg,
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "Docker", "Angular"],
    href: "https://github.com/andreadegiorgixo/Candidate",
    github: true,
  },
  {
    image: propassImg,
    tags: ["Java 21", "Spring Boot", "Oracle", "Docker", "Angular"],
    href: "https://github.com/andreadegiorgixo/ProPass",
    github: true,
  },
  {
    image: ristorandotiImg,
    tags: ["Java", "Spring Boot", "Oracle", "Redis", "Docker", "Angular"],
    href: "https://github.com/andreadegiorgixo/Ristorandoti",
    github: true,
  },
  {
    image: barberImg,
    tags: ["HTML", "Bootstrap", "CSS", "JS"],
    href: "https://barber-salvatore-labriola.netlify.app/",
  },
  {
    image: itesImg,
    tags: ["HTML", "Bootstrap", "CSS", "JS"],
    href: "https://www.ites-srl.it/index.html",
  },
  {
    tags: ["HTML", "Bootstrap", "CSS", "JS"],
    href: "https://tabaccheria-lama.netlify.app/",
  },
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
    <section id="projects" className="relative px-6 py-20 sm:py-28 compact:py-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-ink-muted">
            {t.projects.eyebrow}
          </span>
          <h2 className="section-title mt-3 font-display font-bold uppercase text-ink">
            {t.projects.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-ink" />
          <p className="mx-auto mt-6 max-w-2xl text-ink-soft">
            {t.projects.description}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ name, desc, tags, href, image, github }, i) => (
            <motion.article
              key={name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              whileHover={{ y: -6 }}
              className="flex h-full flex-col overflow-hidden border border-ink/15 bg-surface-card backdrop-blur transition-colors hover:border-ink"
            >
              {image && (
                <img
                  src={image}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={675}
                  className="aspect-[16/9] w-full border-b border-ink/15 object-cover object-top"
                />
              )}
              <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
              <h3 className="font-display italic text-lg font-bold text-ink">
                {name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-ink/20 px-3 py-1 font-display text-xs font-semibold italic text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-between gap-2 border border-ink px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-surface"
              >
                {github ? t.projects.visitGithub : t.projects.visit}
                <ArrowUpRight size={16} />
              </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
