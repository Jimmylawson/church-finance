export type DashboardStat = {
  title: string;
  value: string;
  helper: string;
  accent: "blue" | "mint" | "peach" | "butter";
  delta?: string;
};

export type DashboardBar = {
  label: string;
  income: number;
  expense: number;
};

export type DashboardActivity = {
  id: number;
  title: string;
  subtitle: string;
  amount: string;
  tone: "income" | "expense";
};

export const dashboardStats: DashboardStat[] = [
  {
    title: "Total Contributions",
    value: "$14,820",
    helper: "May 2026 giving overview",
    accent: "mint",
    delta: "+12.4%",
  },
  {
    title: "Total Expenses",
    value: "$6,470",
    helper: "Utilities, outreach, and operations",
    accent: "peach",
    delta: "-3.1%",
  },
  {
    title: "Net Balance",
    value: "$8,350",
    helper: "Healthy margin for the selected period",
    accent: "blue",
    delta: "+18.9%",
  },
  {
    title: "Active Members",
    value: "126",
    helper: "Members with recent financial activity",
    accent: "butter",
  },
];

export const dashboardBars: DashboardBar[] = [
  { label: "Week 1", income: 76, expense: 34 },
  { label: "Week 2", income: 64, expense: 46 },
  { label: "Week 3", income: 88, expense: 40 },
  { label: "Week 4", income: 72, expense: 52 },
];

export const recentContributions: DashboardActivity[] = [
  {
    id: 1,
    title: "Jimmy Lawson",
    subtitle: "Tithe · May 28",
    amount: "+$250.00",
    tone: "income",
  },
  {
    id: 2,
    title: "Mary Allen",
    subtitle: "Offering · May 27",
    amount: "+$120.00",
    tone: "income",
  },
  {
    id: 3,
    title: "Daniel Brooks",
    subtitle: "Building Fund · May 26",
    amount: "+$400.00",
    tone: "income",
  },
];

export const recentExpenses: DashboardActivity[] = [
  {
    id: 1,
    title: "Electric Utility",
    subtitle: "Utilities · May 28",
    amount: "-$320.00",
    tone: "expense",
  },
  {
    id: 2,
    title: "Community Outreach Food",
    subtitle: "Outreach · May 27",
    amount: "-$185.00",
    tone: "expense",
  },
  {
    id: 3,
    title: "Sound Equipment Repair",
    subtitle: "Equipment · May 25",
    amount: "-$640.00",
    tone: "expense",
  },
];
