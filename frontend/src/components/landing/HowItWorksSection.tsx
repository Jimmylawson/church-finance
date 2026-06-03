import type { StepItem } from "../../data/landingPageData";

type HowItWorksSectionProps = {
  steps: StepItem[];
};

function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="py-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ocean)]">
          How it works
        </p>
        <h2 className="mt-3 font-['Space_Grotesk'] text-3xl font-bold tracking-tight dark:text-slate-50 sm:text-4xl">
          Small workflow, strong clarity.
        </h2>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {steps.map((step) => (
          <article
            key={step.kicker}
            className="rounded-[2rem] border border-slate-200/70 bg-[rgba(255,255,255,0.7)] p-6 shadow-[0_16px_35px_rgba(16,35,63,0.05)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-[0_18px_40px_rgba(0,0,0,0.2)]"
          >
            <p className="font-['Space_Grotesk'] text-sm font-bold tracking-[0.28em] text-[var(--color-ocean)]">
              {step.kicker}
            </p>
            <h3 className="mt-4 text-2xl font-bold dark:text-slate-100">{step.title}</h3>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowItWorksSection;
