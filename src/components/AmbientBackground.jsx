import { motion } from "framer-motion";

const blobs = [
  {
    className: "w-[32rem] h-[32rem] bg-brand-300/40 dark:bg-brand-700/30 -top-40 -left-40",
    duration: 22,
    x: [0, 40, -20, 0],
    y: [0, 30, -30, 0],
  },
  {
    className: "w-[26rem] h-[26rem] bg-accent-300/30 dark:bg-accent-500/20 top-1/3 -right-32",
    duration: 26,
    x: [0, -30, 20, 0],
    y: [0, -40, 20, 0],
  },
  {
    className: "w-[24rem] h-[24rem] bg-brand-500/20 dark:bg-brand-500/20 bottom-0 left-1/4",
    duration: 30,
    x: [0, 25, -25, 0],
    y: [0, -20, 25, 0],
  },
];

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-surface bg-noise">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={{ x: blob.x, y: blob.y }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface" />
    </div>
  );
}
