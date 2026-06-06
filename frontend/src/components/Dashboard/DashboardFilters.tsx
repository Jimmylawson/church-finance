import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Plus, Filter } from "lucide-react";

function DashboardFilters() {
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(2000, i, 1).toLocaleString("en-US", { month: "long" }),
  }));
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/78 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="flex min-w-[140px] flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Year
            </span>
            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[var(--color-ocean)] focus:ring-2 focus:ring-[var(--color-ocean)]/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-[var(--color-ocean)]/20">
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </label>
          <label className="flex min-w-[140px] flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Month
            </span>
            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[var(--color-ocean)] focus:ring-2 focus:ring-[var(--color-ocean)]/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-[var(--color-ocean)]/20">
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-[140px] flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              From
            </span>
            <input
              type="date"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[var(--color-ocean)] focus:ring-2 focus:ring-[var(--color-ocean)]/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-[var(--color-ocean)]/20"
              defaultValue="2026-05-01"
            />
          </label>
          <label className="flex min-w-[140px] flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              To
            </span>
            <input
              type="date"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[var(--color-ocean)] focus:ring-2 focus:ring-[var(--color-ocean)]/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-[var(--color-ocean)]/20"
              defaultValue="2026-05-29"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/contributions/new"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "min-w-[220px] justify-center rounded-2xl bg-slate-950 px-5 text-white shadow-[0_18px_40px_rgba(16,35,63,0.14)] hover:bg-slate-900 dark:bg-[#7ca0ff] dark:text-slate-950 dark:shadow-[0_18px_40px_rgba(124,160,255,0.2)] dark:hover:bg-[#95b3ff]",
            )}
          >
            <Plus className="h-4 w-4" />
            Record contribution
          </Link>
          <Button
            variant="outline"
            className="min-w-[160px] rounded-2xl border-slate-200 bg-white px-5 py-6 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Clear
          </Button>
          <Button className="min-w-[220px] rounded-2xl bg-[var(--color-ocean)] px-5 py-6 text-white shadow-[0_18px_40px_rgba(37,90,240,0.22)] hover:bg-[color-mix(in_srgb,var(--color-ocean),black_10%)] dark:bg-[#2d5df5] dark:text-white dark:shadow-[0_18px_40px_rgba(37,90,240,0.18)] dark:hover:bg-[#3c6af7]">
            <span className="inline-flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Apply filters
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default DashboardFilters;
