import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { channels } from "../socials";

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
