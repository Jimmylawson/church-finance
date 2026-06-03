function CallToActionSection() {
  return (
    <section className="pb-12 pt-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-gradient-to-br from-[var(--color-sky)] via-white to-[var(--color-peach)] px-8 py-12 shadow-[0_30px_80px_rgba(16,35,63,0.09)] dark:border-slate-800/80 dark:bg-[linear-gradient(135deg,#0f1d36_0%,#0b1324_55%,#1f1623_100%)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
        <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-white/70 blur-2xl dark:bg-[var(--color-ocean)]/18" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ocean)]">
              Start clean
            </p>
            <h2 className="mt-3 font-['Space_Grotesk'] text-3xl font-bold tracking-tight dark:text-slate-50 sm:text-4xl">
              Build a calmer finance routine for your church.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,35,63,0.16)]">
              Start with Ledgerly
            </button>
            <button className="rounded-full border border-white/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100">
              Talk to the team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection;
