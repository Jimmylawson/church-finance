import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type OverviewCardProps = {
  title: string;
  value: string;
  helper: string;
  accent: "blue" | "mint" | "peach" | "butter";
  delta?: string;
};

const accentStyles: Record<OverviewCardProps["accent"], string> = {
  blue: "bg-[var(--color-sky)] text-[var(--color-ocean)] dark:text-[#93b3ff]",
  mint: "bg-[var(--color-mint)] text-emerald-700 dark:text-emerald-300",
  peach: "bg-[var(--color-peach)] text-orange-700 dark:text-orange-300",
  butter: "bg-[var(--color-butter)] text-amber-700 dark:text-amber-300",
};

function OverviewCard({
  title,
  value,
  helper,
  accent,
  delta,
}: OverviewCardProps) {
  return (
    <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              {title}
            </CardDescription>
            <CardTitle className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              {value}
            </CardTitle>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${accentStyles[accent]}`}
          >
            {delta ?? "Stable"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 dark:text-slate-300">{helper}</p>
      </CardContent>
    </Card>
  );
}

export default OverviewCard;
