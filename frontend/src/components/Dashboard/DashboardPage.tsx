import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dashboardStats, type DashboardStat } from "@/data/dashboardData";
import { ModeToggle } from "@/components";
import { useAuth } from "@/components/AuthProvider";
import DashboardFilters from "./DashboardFilters";
import MemberLookupCard from "./MemberLookupCard";
import SummaryCards from "./SummaryCards";
import { getAllMembers } from "@/lib/members";
import { useEffect, useMemo, useState } from "react";

function DashboardPage() {
  const { user } = useAuth();
  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(" ")
    : "Guest";
  const [memberCount, setMemberCount] = useState<number | null>(null);
  const now = new Date();
  const currentPeriod = now.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const loadMemberCount = async () => {
      try {
        const response = await getAllMembers(0, 1);
        setMemberCount(response.totalElements);
      } catch (error) {
        console.error("Failed to load member count:", error);
      }
    };

    loadMemberCount();
  }, []);

  const summaryStats = useMemo<DashboardStat[]>(() => {
    return dashboardStats.map((stat) =>
      stat.title === "Active Members"
        ? {
            ...stat,
            value: memberCount !== null ? String(memberCount) : "--",
            helper: "Current members in the system",
            delta: undefined,
          }
        : stat,
    );
  }, [memberCount]);

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
                {displayName}
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
                {currentPeriod}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Updated with contribution and expense totals
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <DashboardFilters />
          <SummaryCards stats={summaryStats} />

          <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <MemberLookupCard />

            <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
              <CardHeader>
                <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Dashboard Focus
                </CardDescription>
                <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                  Keep only real actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Filter by year, month, and date range",
                  "Record new contributions",
                  "Review live summary totals",
                  "Navigate into member contribution history",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200"
                  >
                    {item}
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
