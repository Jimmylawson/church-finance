import { Link } from "react-router-dom";
import type { RecentRecord, StatItem } from "../../data/landingPageData";

type HeroSectionProps = {
  stats: StatItem[];
  recentRecords: RecentRecord[];
};

function HeroSection({ stats, recentRecords }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-2 pb-16 pt-18 sm:pt-24">
      <div className="absolute left-[8%] top-18 h-28 w-28 rounded-full bg-[var(--color-mint)] blur-2xl dark:bg-[var(--color-ocean)]/25" />
      <div className="absolute right-[10%] top-32 h-32 w-32 rounded-full bg-[var(--color-sky)] blur-3xl dark:bg-white/10" />

      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-ocean)] shadow-sm dark:border-slate-700 dark:bg-slate-950/70 dark:text-[#7ca0ff]">
            Built for churches
          </span>
          <h1 className="mt-6 max-w-3xl font-['Space_Grotesk'] text-5xl font-bold tracking-tight text-balance text-[var(--color-ink)] dark:text-slate-50 sm:text-6xl lg:text-7xl">
            Church finance that feels calm, clear, and finally under control.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
            Replace spreadsheet sprawl with a finance workspace that tracks contributions,
            organizes expenses, and makes the monthly picture obvious.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="rounded-full bg-[var(--color-ocean)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,90,240,0.28)] transition hover:-translate-y-0.5"
            >
              Get started
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
            >
              View dashboard
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl ${stat.tone} px-4 py-3 shadow-[0_10px_24px_rgba(16,35,63,0.06)] dark:border dark:border-slate-800/80 dark:shadow-[0_18px_40px_rgba(0,0,0,0.18)]`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-1 font-['Space_Grotesk'] text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-[2rem] bg-[var(--color-peach)]/80 blur-2xl dark:bg-[var(--color-ocean)]/15 md:block" />
          <div className="absolute -right-8 bottom-4 hidden h-36 w-36 rounded-full bg-[var(--color-butter)]/90 blur-3xl dark:bg-white/8 md:block" />

          <div className="relative rounded-[2rem] border border-white/80 bg-[rgba(255,255,255,0.82)] p-4 shadow-[0_35px_90px_rgba(16,35,63,0.12)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-[0_35px_90px_rgba(0,0,0,0.32)]">
            <div className="rounded-[1.5rem] bg-[var(--color-card)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">May overview</p>
                  <h2 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold dark:text-slate-100">Ledgerly dashboard</h2>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  Updated today
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-[var(--color-ink)] p-4 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">Income</p>
                  <p className="mt-3 font-['Space_Grotesk'] text-3xl font-bold">$18,420</p>
                  <p className="mt-2 text-sm text-white/80">Tithes, offerings, donations</p>
                </div>
                <div className="rounded-3xl bg-[var(--color-mint)] p-4 dark:text-slate-100">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">Expenses</p>
                  <p className="mt-3 font-['Space_Grotesk'] text-3xl font-bold">$10,520</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Utilities, outreach, food</p>
                </div>
                <div className="rounded-3xl bg-[var(--color-sky)] p-4 dark:text-slate-100">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">Net</p>
                  <p className="mt-3 font-['Space_Grotesk'] text-3xl font-bold">$7,900</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">A clean monthly picture</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold dark:text-slate-100">Income trend</p>
                    <span className="rounded-full bg-[var(--color-mint)] px-2 py-1 text-xs font-semibold text-slate-600">
                      +18%
                    </span>
                  </div>
                  <div className="mt-6 flex h-44 items-end gap-3">
                    {[32, 48, 40, 64, 56, 82, 74].map((height, index) => (
                      <div key={index} className="flex-1">
                        <div
                          className="rounded-t-[1rem] bg-gradient-to-t from-[var(--color-ocean)] to-[#7ca0ff]"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                  <p className="font-semibold dark:text-slate-100">Recent records</p>
                  <div className="mt-4 space-y-3">
                    {recentRecords.map((record) => (
                      <div
                        key={record.title}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/90"
                      >
                        <div>
                          <p className="text-sm font-semibold dark:text-slate-100">{record.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{record.date}</p>
                        </div>
                        <p className="font-['Space_Grotesk'] text-lg font-bold dark:text-slate-100">{record.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
