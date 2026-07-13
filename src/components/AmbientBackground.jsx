export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-surface bg-noise">
      <div className="absolute inset-y-0 left-[8%] hidden w-px bg-ink/10 sm:block" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-ink/10" />
      <div className="absolute inset-y-0 right-[8%] hidden w-px bg-ink/10 sm:block" />
      <div className="absolute inset-x-0 top-[30%] h-px bg-ink/10" />
      <div className="absolute right-0 top-0 h-[42vh] w-[45vw] border-b border-l border-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-surface" />
    </div>
  );
}
