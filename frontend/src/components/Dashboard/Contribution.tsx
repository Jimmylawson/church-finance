import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { Search, ArrowLeft, LoaderCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createContribution,
  getContribution,
  updateContribution,
  type ContributionRequest,
  type UpdateContributionRequest,
} from "@/lib/contribution";
import { searchMembers, type MemberResponse } from "@/lib/members";

const contributionSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than zero."),
  contributionType: z.enum(["TITHE", "OFFERING", "DONATION", "OTHER"]),
  memberId: z.number().positive("Select a member from the search results."),
  reference: z.string().min(1, "Reference is required."),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required."),
});

const contributionTypes = [
  { value: "TITHE", label: "Tithe" },
  { value: "OFFERING", label: "Offering" },
  { value: "DONATION", label: "Donation" },
  { value: "OTHER", label: "Other" },
] as const;

const getMemberFullName = (member: MemberResponse) =>
  [member.firstName, member.lastName].filter(Boolean).join(" ");

type FormState = {
  amount: string;
  contributionType: ContributionRequest["contributionType"];
  memberId: number | null;
  memberQuery: string;
  reference: string;
  description: string;
  date: string;
};

const initialFormState: FormState = {
  amount: "",
  contributionType: "TITHE",
  memberId: null,
  memberQuery: "",
  reference: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
};

function Contribution() {
  const navigate = useNavigate();
  const { contributionId } = useParams();
  const isEditMode = Boolean(contributionId);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [memberOptions, setMemberOptions] = useState<MemberResponse[]>([]);
  const [searchingMembers, setSearchingMembers] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingContribution, setIsLoadingContribution] = useState(isEditMode);

  useEffect(() => {
    const parsedContributionId = Number(contributionId);

    if (!isEditMode) {
      setIsLoadingContribution(false);
      return;
    }

    if (Number.isNaN(parsedContributionId)) {
      setSubmitError("Invalid contribution selected for editing.");
      setIsLoadingContribution(false);
      return;
    }

    const loadContribution = async () => {
      try {
        setIsLoadingContribution(true);
        setSubmitError(null);

        const contribution = await getContribution(parsedContributionId);

        setForm({
          amount: String(contribution.amount),
          contributionType: contribution.contributionType as ContributionRequest["contributionType"],
          memberId: contribution.memberId,
          memberQuery: contribution.memberFullName,
          reference: contribution.reference,
          description: contribution.description ?? "",
          date: contribution.date,
        });
      } catch {
        setSubmitError("Unable to load the contribution for editing.");
      } finally {
        setIsLoadingContribution(false);
      }
    };

    loadContribution();
  }, [contributionId, isEditMode]);

  useEffect(() => {
    const trimmedQuery = form.memberQuery.trim();

    if (trimmedQuery.length < 2 || form.memberId !== null) {
      setMemberOptions([]);
      setSearchingMembers(false);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        setSearchingMembers(true);
        const response = await searchMembers(trimmedQuery, 0, 8);
        setMemberOptions(response.content);
      } catch {
        setMemberOptions([]);
      } finally {
        setSearchingMembers(false);
      }
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [form.memberId, form.memberQuery]);

  const selectedMemberLabel = useMemo(
    () =>
      form.memberId === null
        ? "Search by first or last name"
        : "Member selected",
    [form.memberId],
  );

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((current) => {
      const nextState = { ...current, [field]: value };

      if (field === "memberQuery") {
        nextState.memberId = null;
      }

      return nextState;
    });

    setErrors((current) => ({ ...current, [field]: "" }));
    setSubmitError(null);
  };

  const handleMemberSelect = (member: MemberResponse) => {
    setForm((current) => ({
      ...current,
      memberId: member.id,
      memberQuery: getMemberFullName(member),
    }));
    setMemberOptions([]);
    setErrors((current) => ({ ...current, memberId: "" }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = contributionSchema.safeParse({
      amount: form.amount,
      contributionType: form.contributionType,
      memberId: form.memberId,
      reference: form.reference,
      description: form.description || undefined,
      date: form.date,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        amount: fieldErrors.amount?.[0] ?? "",
        contributionType: fieldErrors.contributionType?.[0] ?? "",
        memberId: fieldErrors.memberId?.[0] ?? "",
        reference: fieldErrors.reference?.[0] ?? "",
        date: fieldErrors.date?.[0] ?? "",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      if (isEditMode) {
        await updateContribution(
          Number(contributionId),
          result.data as UpdateContributionRequest,
        );
      } else {
        await createContribution(result.data as ContributionRequest);
      }

      navigate(
        form.memberId !== null
          ? `/members/${form.memberId}/contributions`
          : "/dashboard",
      );
    } catch {
      setSubmitError(
        isEditMode
          ? "Unable to update contribution right now. Try again."
          : "Unable to save contribution right now. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(
      form.memberId !== null
        ? `/members/${form.memberId}/contributions`
        : "/dashboard",
    );
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ee_0%,#eff5ff_55%,#f8fbff_100%)] px-6 py-8 text-slate-900 dark:bg-[linear-gradient(180deg,#07101d_0%,#0b1524_58%,#0d1828_100%)] dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-[var(--color-sky)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-ocean)] dark:bg-slate-900/80 dark:text-[#7ca0ff]">
              Ledgerly Admin
            </p>
            <h1 className="font-display text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
              {isEditMode ? "Edit contribution" : "Record contribution"}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {isEditMode
                ? "Correct contribution details without deleting the original record."
                : "Search for a member, select the right person, and save the contribution against that exact member record."}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleBack}
            className="rounded-2xl border-slate-200 bg-white px-5 py-6 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {form.memberId !== null ? "Back to member profile" : "Back to dashboard"}
          </Button>
        </div>

        <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
          <CardHeader>
            <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Contribution Form
            </CardDescription>
            <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100">
              {isEditMode ? "Update contribution" : "Add a new contribution"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingContribution ? (
              <div className="py-8 text-sm text-slate-500 dark:text-slate-400">
                Loading contribution...
              </div>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="member-search">Member</Label>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="member-search"
                      value={form.memberQuery}
                      onChange={(event) => handleFieldChange("memberQuery", event.target.value)}
                      placeholder="Type a member name"
                      className="rounded-2xl border-slate-200 bg-white pl-11 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    {form.memberId !== null && (
                      <div className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        <Check className="h-4 w-4" />
                        Selected
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedMemberLabel}
                  </p>
                  {errors.memberId && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.memberId}</p>
                  )}
                  {searchingMembers && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">Searching members...</p>
                  )}
                  {memberOptions.length > 0 && (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
                      {memberOptions.map((member) => (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => handleMemberSelect(member)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">
                              {getMemberFullName(member)}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {member.email}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.amount}
                    onChange={(event) => handleFieldChange("amount", event.target.value)}
                    placeholder="0.00"
                    className="rounded-2xl border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  {errors.amount && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contributionType">Contribution Type</Label>
                  <select
                    id="contributionType"
                    value={form.contributionType}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        contributionType: event.target.value as FormState["contributionType"],
                      }))
                    }
                    className="flex h-10 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {contributionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={form.reference}
                    onChange={(event) => handleFieldChange("reference", event.target.value)}
                    placeholder="Cash, transfer, receipt number"
                    className="rounded-2xl border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  {errors.reference && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.reference}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <DatePicker
                    value={form.date}
                    onChange={(value) => handleFieldChange("date", value)}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.date}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    rows={4}
                    value={form.description}
                    onChange={(event) => handleFieldChange("description", event.target.value)}
                    placeholder="Optional note about this contribution"
                    className="flex w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[var(--color-ocean)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {submitError && (
                <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
              )}

              <div className="flex flex-wrap justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="rounded-2xl border-slate-200 bg-white px-5 py-6 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoadingContribution}
                  className="rounded-2xl bg-[var(--color-ocean)] px-5 py-6 text-white hover:bg-[color-mix(in_srgb,var(--color-ocean),black_10%)]"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      {isEditMode ? "Updating..." : "Saving..."}
                    </>
                  ) : (
                    isEditMode ? "Update contribution" : "Save contribution"
                  )}
                </Button>
              </div>
            </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Contribution;
