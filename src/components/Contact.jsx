import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.89 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.1" cy="6.9" r="1.1" />
    </svg>
  );
}

function ThreadsIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161" />
    </svg>
  );
}

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "degiorgio.andrea2003@gmail.com",
    href: "mailto:degiorgio.andrea2003@gmail.com",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "Andrea De Giorgio",
    href: "https://www.linkedin.com/in/andrea-de-giorgio-a96937265/?locale=it-IT",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "andreadegiorgixo",
    href: "https://github.com/andreadegiorgixo",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@_andreadegiorgixo",
    href: "https://www.instagram.com/_andreadegiorgixo/",
  },
  {
    icon: ThreadsIcon,
    label: "Threads",
    value: "@_andreadegiorgixo",
    href: "https://www.threads.net/@_andreadegiorgixo",
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
    privacyAccepted: false,
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | privacy

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.privacyAccepted) {
      setStatus("privacy");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", website: "", privacyAccepted: false });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden border border-ink bg-ink px-8 py-16 text-center sm:px-16"
        >
          <span className="inline-flex items-center gap-2 border border-surface/30 px-4 py-1.5 text-sm font-semibold text-surface">
            <Send size={14} /> {t.contact.badge}
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase text-surface sm:text-5xl">
            {t.contact.title}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-surface/40" />
          <p className="mx-auto mt-6 max-w-xl text-surface/70">
            {t.contact.description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 grid max-w-xl gap-4 text-left"
          >
            {/* Honeypot field: hidden from real users, catches basic bots */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wide text-surface/60">
                  {t.contact.form.name}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.contact.form.namePlaceholder}
                  className="mt-1.5 w-full border border-surface/30 bg-transparent px-4 py-2.5 text-surface placeholder:text-surface/40 outline-none transition-colors focus:border-surface"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wide text-surface/60">
                  {t.contact.form.email}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.contact.form.emailPlaceholder}
                  className="mt-1.5 w-full border border-surface/30 bg-transparent px-4 py-2.5 text-surface placeholder:text-surface/40 outline-none transition-colors focus:border-surface"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wide text-surface/60">
                {t.contact.form.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder={t.contact.form.messagePlaceholder}
                className="mt-1.5 w-full resize-none border border-surface/30 bg-transparent px-4 py-2.5 text-surface placeholder:text-surface/40 outline-none transition-colors focus:border-surface"
              />
            </div>

            <label className="mt-2 flex items-start gap-2.5 text-sm text-surface/70">
              <input
                type="checkbox"
                name="privacyAccepted"
                checked={form.privacyAccepted}
                onChange={handleChange}
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-surface"
              />
              <span>
                {t.contact.form.privacyLabel}{" "}
                <a
                  href="#privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-surface"
                >
                  {t.contact.form.privacyLinkText}
                </a>
              </span>
            </label>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileTap={{ scale: 0.97 }}
              className="mt-2 inline-flex items-center justify-center gap-2 border border-surface bg-surface px-6 py-3 font-semibold uppercase tracking-wide text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> {t.contact.form.sending}
                </>
              ) : (
                <>
                  <Send size={16} /> {t.contact.form.send}
                </>
              )}
            </motion.button>

            {status === "success" && (
              <p className="text-sm font-medium text-surface">{t.contact.form.success}</p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium text-red-400">{t.contact.form.error}</p>
            )}
            {status === "privacy" && (
              <p className="text-sm font-medium text-red-400">
                {t.contact.form.privacyRequiredError}
              </p>
            )}
          </form>

          <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-4">
            {channels.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                title={label}
                className="border border-surface/20 p-2.5 text-surface transition-colors hover:border-surface hover:bg-surface/10"
              >
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
