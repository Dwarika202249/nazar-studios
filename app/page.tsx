export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-ink">
      <div className="max-w-3xl space-y-6">
        <p className="font-mono text-xs uppercase tracking-wide-mono text-champagne">
          Flagship Demo · Jaipur · Worldwide
        </p>
        <h1 className="font-cormorant text-5xl md:text-8xl tracking-tight-display text-ivory">
          NAZAR
        </h1>
        <p className="font-cormorant italic text-xl md:text-3xl text-sand">
          Seen by the heart. Kept forever.
        </p>
        <div className="pt-8">
          <span className="inline-block px-4 py-2 border border-champagne/40 rounded-full font-mono text-xs text-champagne">
            Architecture Setup Complete · Ready for Phase 1
          </span>
        </div>
      </div>
    </main>
  );
}
