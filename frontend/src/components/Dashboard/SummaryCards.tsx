import type { DashboardStat } from "@/data/dashboardData";
import OverviewCard from "./OverviewCard";

type SummaryCardsProps = {
  stats: DashboardStat[];
};

function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <OverviewCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}

export default SummaryCards;
