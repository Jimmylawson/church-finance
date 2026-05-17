export type StatItem = {
  label: string;
  value: string;
  tone: string;
};

export type FeatureItem = {
  title: string;
  body: string;
};

export type StepItem = {
  kicker: string;
  title: string;
  body: string;
};

export type MixItem = {
  label: string;
  value: string;
};

export type RecentRecord = {
  title: string;
  amount: string;
  date: string;
};

export const statItems: StatItem[] = [
  { label: "This month income", value: "$18.4k", tone: "bg-mint" },
  { label: "Expenses recorded", value: "126", tone: "bg-sky" },
  { label: "Net overview", value: "+$7.9k", tone: "bg-peach" },
];

export const featureItems: FeatureItem[] = [
  {
    title: "Track giving without spreadsheet drift",
    body: "Capture tithes, offerings, and donations in a clean system built for repeat church workflows.",
  },
  {
    title: "Keep expenses tidy and reviewable",
    body: "Organize outflow by category, date, and note so monthly review stops feeling scattered.",
  },
  {
    title: "See the month clearly",
    body: "Turn raw entries into summaries and charts that make leadership conversations faster.",
  },
];

export const stepItems: StepItem[] = [
  {
    kicker: "01",
    title: "Record the activity",
    body: "Add contributions and expenses in a lightweight admin flow that favors speed and clarity.",
  },
  {
    kicker: "02",
    title: "Stay organized by member and category",
    body: "Keep records connected to the people and spending buckets that matter to the church.",
  },
  {
    kicker: "03",
    title: "Review the month in one view",
    body: "Open the dashboard and instantly see totals, trends, and what changed.",
  },
];

export const previewIncomeMix: MixItem[] = [
  { label: "Tithe", value: "58%" },
  { label: "Offering", value: "27%" },
  { label: "Donation", value: "15%" },
];

export const previewExpenseMix: MixItem[] = [
  { label: "Utilities", value: "32%" },
  { label: "Outreach", value: "21%" },
  { label: "Food", value: "18%" },
];

export const recentRecords: RecentRecord[] = [
  { title: "Tithe - Jimmy Lawson", amount: "$450", date: "Today" },
  { title: "Outreach supplies", amount: "$180", date: "Yesterday" },
  { title: "Sunday offering", amount: "$1,220", date: "May 12" },
];
