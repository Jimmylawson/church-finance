import { Button } from "@/components/ui/button";

function DashboardFilters() {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="flex min-w-[140px] flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Year
            </span>
            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[var(--color-ocean)]">
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </label>
          <label className="flex min-w-[140px] flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Month
            </span>
            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[var(--color-ocean)]">
              <option>May</option>
              <option>April</option>
              <option>March</option>
            </select>
          </label>
          <label className="flex min-w-[140px] flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              From
            </span>
            <input
              type="date"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[var(--color-ocean)]"
              defaultValue="2026-05-01"
            />
          </label>
          <label className="flex min-w-[140px] flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              To
            </span>
            <input
              type="date"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[var(--color-ocean)]"
              defaultValue="2026-05-29"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="rounded-2xl border-slate-200 bg-white px-5 py-6 text-slate-700 hover:bg-slate-50"
          >
            Clear
          </Button>
          <Button className="rounded-2xl bg-[var(--color-ocean)] px-5 py-6 text-white hover:bg-[color-mix(in_srgb,var(--color-ocean),black_10%)]">
            Apply filters
          </Button>
        </div>
      </div>
    </section>
  );
}

export default DashboardFilters;
