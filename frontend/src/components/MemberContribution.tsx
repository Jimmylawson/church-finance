import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  DollarSign,
  UserRound,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getContributionByMemberId, type ContributionResponse } from "@/lib/contribution";
import { getMember, type MemberResponse } from "@/lib/members";

const getMemberFullName = (member: MemberResponse) =>
  [member.firstName, member.lastName].filter(Boolean).join(" ");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function MemberContribution() {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<MemberResponse | null>(null);
  const [contributions, setContributions] = useState<ContributionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonthKey, setSelectedMonthKey] = useState<string | null>(null);

  useEffect(() => {
    const parsedMemberId = Number(memberId);

    if (Number.isNaN(parsedMemberId)) {
      setError("Invalid member profile.");
      setIsLoading(false);
      return;
    }

    const loadMemberProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [memberResponse, contributionResponse] = await Promise.all([
          getMember(parsedMemberId),
          getContributionByMemberId(parsedMemberId, 0, 100),
        ]);

        setMember(memberResponse);
        setContributions(contributionResponse.content);
      } catch {
        setError("Unable to load this member profile right now.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMemberProfile();
  }, [memberId]);

  const summary = useMemo(() => {
    const totalContributions = contributions.reduce(
      (sum, contribution) => sum + contribution.amount,
      0,
    );

    const years = new Set(
      contributions.map((contribution) =>
        new Date(contribution.date).getFullYear(),
      ),
    );

    return {
      totalContributions,
      activeYears: years.size,
    };
  }, [contributions]);

  const yearlyContributions = useMemo(() => {
    const grouped = new Map<number, ContributionResponse[]>();

    for (const contribution of contributions) {
      const year = new Date(contribution.date).getFullYear();
      const existing = grouped.get(year) ?? [];
      existing.push(contribution);
      grouped.set(year, existing);
    }

    return Array.from(grouped.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([year, rows]) => ({
        year,
        rows: rows.sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
        total: rows.reduce((sum, row) => sum + row.amount, 0),
      }));
  }, [contributions]);

  const buildMonthKey = (year: number, month: number) => `${year}-${month}`;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ee_0%,#eff5ff_55%,#f8fbff_100%)] px-6 py-8 text-slate-900 dark:bg-[linear-gradient(180deg,#07101d_0%,#0b1524_58%,#0d1828_100%)] dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-[var(--color-sky)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-ocean)] dark:bg-slate-900/80 dark:text-[#7ca0ff]">
              Member Profile
            </p>
            <h1 className="font-display text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
              {member ? getMemberFullName(member) : "Member contribution profile"}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Review this member&apos;s contribution history outside the main
              dashboard, then drill into yearly and monthly breakdowns from here.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-2xl border-slate-200 bg-white px-5 py-6 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <Card className="border-white/70 bg-white/90 dark:border-slate-800/80 dark:bg-slate-950/70">
            <CardContent className="py-10 text-sm text-slate-500 dark:text-slate-400">
              Loading member profile...
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="border-white/70 bg-white/90 dark:border-slate-800/80 dark:bg-slate-950/70">
            <CardContent className="py-10 text-sm text-red-600 dark:text-red-400">
              {error}
            </CardContent>
          </Card>
        ) : (
          <>
            <section className="grid gap-4 md:grid-cols-3">
              <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
                <CardHeader>
                  <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Member
                  </CardDescription>
                  <CardTitle className="flex items-center gap-3 text-xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                    <UserRound className="h-5 w-5" />
                    {member ? getMemberFullName(member) : "Unknown member"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                  {member?.email ?? "No email available"}
                </CardContent>
              </Card>

              <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
                <CardHeader>
                  <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Total contributions
                  </CardDescription>
                  <CardTitle className="flex items-center gap-3 text-xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                    <DollarSign className="h-5 w-5" />
                    {currencyFormatter.format(summary.totalContributions)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                  Across {contributions.length} recorded contributions
                </CardContent>
              </Card>

              <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
                <CardHeader>
                  <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Active years
                  </CardDescription>
                  <CardTitle className="flex items-center gap-3 text-xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                    <CalendarDays className="h-5 w-5" />
                    {summary.activeYears}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                  Yearly breakdown is the next feature to add here
                </CardContent>
              </Card>
            </section>

            <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
              <CardHeader>
                <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Contribution History
                </CardDescription>
                <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                  Yearly contribution totals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {yearlyContributions.length > 0 ? (
                  yearlyContributions.map((entry) => {
                    const isOpen = selectedYear === entry.year;

                    return (
                      <div
                        key={entry.year}
                        className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/70"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedYear((current) => {
                              const nextYear =
                                current === entry.year ? null : entry.year;

                              if (nextYear !== entry.year) {
                                setSelectedMonthKey(null);
                              }

                              return nextYear;
                            })
                          }
                          className="flex w-full items-center justify-between px-5 py-5 text-left transition hover:bg-slate-100/80 dark:hover:bg-slate-900"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm dark:bg-slate-950 dark:text-slate-200">
                              {isOpen ? (
                                <ChevronDown className="h-5 w-5" />
                              ) : (
                                <ChevronRight className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <p className="text-xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                                {entry.year}
                              </p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {entry.rows.length} recorded tithe
                                {entry.rows.length === 1 ? "" : "s"}
                              </p>
                            </div>
                          </div>
                          <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                            {currencyFormatter.format(entry.total)}
                          </span>
                        </button>

                        {isOpen ? (
                          <div className="space-y-3 border-t border-slate-200/80 px-5 py-4 dark:border-slate-800">
                            {Array.from(
                              entry.rows.reduce(
                                (months, contribution) => {
                                  const date = new Date(contribution.date);
                                  const month = date.getMonth();
                                  const monthYearKey = buildMonthKey(
                                    entry.year,
                                    month,
                                  );
                                  const current = months.get(monthYearKey) ?? {
                                    month,
                                    label: date.toLocaleString("en-US", {
                                      month: "long",
                                    }),
                                    rows: [] as ContributionResponse[],
                                    total: 0,
                                  };

                                  current.rows.push(contribution);
                                  current.total += contribution.amount;
                                  months.set(monthYearKey, current);

                                  return months;
                                },
                                new Map<
                                  string,
                                  {
                                    month: number;
                                    label: string;
                                    rows: ContributionResponse[];
                                    total: number;
                                  }
                                >(),
                              ).values(),
                            )
                              .sort((a, b) => b.month - a.month)
                              .map((monthEntry) => {
                                const monthKey = buildMonthKey(
                                  entry.year,
                                  monthEntry.month,
                                );
                                const isMonthOpen = selectedMonthKey === monthKey;

                                return (
                                  <div
                                    key={monthKey}
                                    className="overflow-hidden rounded-2xl border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950/80"
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setSelectedMonthKey((current) =>
                                          current === monthKey ? null : monthKey,
                                        )
                                      }
                                      className="flex w-full items-center justify-between px-4 py-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-900"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                                          {isMonthOpen ? (
                                            <ChevronDown className="h-4 w-4" />
                                          ) : (
                                            <ChevronRight className="h-4 w-4" />
                                          )}
                                        </div>
                                        <div>
                                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                                            {monthEntry.label}
                                          </p>
                                          <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {monthEntry.rows.length} tithe
                                            {monthEntry.rows.length === 1
                                              ? ""
                                              : "s"}
                                          </p>
                                        </div>
                                      </div>
                                      <span className="font-black text-emerald-700 dark:text-emerald-400">
                                        {currencyFormatter.format(monthEntry.total)}
                                      </span>
                                    </button>

                                    {isMonthOpen ? (
                                      <div className="space-y-3 border-t border-slate-200/80 px-4 py-4 dark:border-slate-800">
                                        {monthEntry.rows.map((contribution) => (
                                          <div
                                            key={contribution.id}
                                            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900/70"
                                          >
                                            <div>
                                              <p className="font-semibold text-slate-900 dark:text-slate-100">
                                                {contribution.contributionType}
                                              </p>
                                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {new Date(
                                                  contribution.date,
                                                ).toLocaleDateString("en-US", {
                                                  month: "long",
                                                  day: "numeric",
                                                  year: "numeric",
                                                })}
                                                {contribution.reference
                                                  ? ` · ${contribution.reference}`
                                                  : ""}
                                              </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                              <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                  navigate(
                                                    `/contributions/${contribution.id}/edit`,
                                                  )
                                                }
                                                className="rounded-xl border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
                                              >
                                                Edit
                                              </Button>
                                              <span className="font-black text-emerald-700 dark:text-emerald-400">
                                                {currencyFormatter.format(
                                                  contribution.amount,
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : null}
                                  </div>
                                );
                              })}
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No contributions were found for this member yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default MemberContribution;
