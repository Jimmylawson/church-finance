import type { FeatureItem } from "../../data/landingPageData";

type FeaturesSectionProps = {
  features: FeatureItem[];
};

function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section id="features" className="py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ocean)]">
            Why Ledgerly
          </p>
          <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold tracking-tight sm:text-4xl">
            Structured like modern fintech, softened for church teams.
          </h2>
        </div>
        <p className="max-w-xl text-slate-600">
          It gives finance admins a focused place to record what matters and skip what does not.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className="group rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_50px_rgba(16,35,63,0.07)] transition hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(16,35,63,0.11)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 font-['Space_Grotesk'] text-lg font-bold text-[var(--color-ocean)]">
              0{index + 1}
            </div>
            <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
