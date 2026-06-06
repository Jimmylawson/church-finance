import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  dashboardBars,
  dashboardStats,
  recentContributions,
  recentExpenses,
} from "@/data/dashboardData";
import { ModeToggle } from "@/components";
import DashboardFilters from "./DashboardFilters";
import SummaryCards from "./SummaryCards";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ee_0%,#eff5ff_55%,#f8fbff_100%)] text-slate-900 dark:bg-[linear-gradient(180deg,#07101d_0%,#0b1524_58%,#0d1828_100%)] dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex rounded-full bg-[var(--color-sky)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-ocean)] dark:bg-slate-900/80 dark:text-[#7ca0ff]">
              Ledgerly Admin
            </p>
            <h1 className="font-display text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
              Dashboard
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Monitor contributions, expenses, and balances for the selected
              period.
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Signed in as{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                Jimmy Lawson
              </span>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ModeToggle />
            <div className="rounded-[26px] border border-slate-200/80 bg-white/85 px-5 py-4 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.45)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                AS OF
              </p>
              <p className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                May 2026
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Updated with contribution and expense totals
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <DashboardFilters />
          <SummaryCards stats={dashboardStats} />

          <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
            <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
              <CardHeader>
                <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Cash Flow Pulse
                </CardDescription>
                <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                  Contributions vs expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {dashboardBars.map((bar) => (
                    <div key={bar.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
                        <span>{bar.label}</span>
                        <span className="text-slate-500 dark:text-slate-400">
                          Income {bar.income}% · Expense {bar.expense}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#255af0_0%,#78a2ff_100%)]"
                            style={{ width: `${bar.income}%` }}
                          />
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#f59e0b_0%,#ffd27b_100%)]"
                            style={{ width: `${bar.expense}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
              <CardHeader>
                <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Stewardship Snapshot
                </CardDescription>
                <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                  Where the money is moving
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-[24px] bg-[linear-gradient(135deg,#10233f_0%,#255af0_85%)] p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    Reserve health
                  </p>
                  <p className="mt-3 text-4xl font-black tracking-tight">67%</p>
                  <p className="mt-2 max-w-xs text-sm text-white/75">
                    Enough runway for operations, outreach, and building needs
                    if giving stays consistent.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    ["Utilities", "28%", "bg-[var(--color-sky)]"],
                    ["Outreach", "22%", "bg-[var(--color-mint)]"],
                    ["Equipment", "18%", "bg-[var(--color-peach)]"],
                    ["Other", "32%", "bg-[var(--color-butter)]"],
                  ].map(([label, value, accent]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/70"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${accent}`} />
                        <span className="font-medium text-slate-700 dark:text-slate-200">
                          {label}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
              <CardHeader>
                <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Recent Contributions
                </CardDescription>
                <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                  Latest giving activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentContributions.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/75 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="font-black text-emerald-700">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
              <CardHeader>
                <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Recent Expenses
                </CardDescription>
                <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                  Latest spending activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentExpenses.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/75 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="font-black text-orange-700">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
