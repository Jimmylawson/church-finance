import type { MixItem } from "../../data/landingPageData";

type PreviewSectionProps = {
  contributionMix: MixItem[];
  expenseMix: MixItem[];
};

function PreviewSection({ contributionMix, expenseMix }: PreviewSectionProps) {
  return (
    <section id="preview" className="py-14">
      <div className="rounded-[2.5rem] bg-[var(--color-ink)] px-6 py-10 text-white shadow-[0_35px_80px_rgba(16,35,63,0.18)] sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Preview</p>
            <h2 className="mt-3 font-['Space_Grotesk'] text-3xl font-bold tracking-tight sm:text-4xl">
              A dashboard built to answer the monthly question fast.
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-white/75">
              How much came in, what went out, and what is the net? Ledgerly keeps those answers
              visible instead of buried in scattered sheets.
            </p>
          </div>

          <div className="grid gap-4 rounded-[2rem] bg-white/8 p-4 backdrop-blur sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white px-5 py-6 text-[var(--color-ink)]">
              <p className="text-sm font-semibold text-slate-500">Contribution mix</p>
              <div className="mt-4 space-y-3">
                {contributionMix.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span className="font-['Space_Grotesk'] text-lg font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 px-5 py-6">
              <p className="text-sm font-semibold text-white/70">Expense categories</p>
              <div className="mt-4 space-y-3">
                {expenseMix.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span className="font-['Space_Grotesk'] text-lg font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PreviewSection;
