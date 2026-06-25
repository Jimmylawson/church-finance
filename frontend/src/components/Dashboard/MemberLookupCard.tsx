import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, Search, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { searchMembers, type MemberResponse } from "@/lib/members";

const getMemberFullName = (member: MemberResponse) =>
  [member.firstName, member.lastName].filter(Boolean).join(" ");

function MemberLookupCard() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MemberResponse[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      try {
        setIsSearching(true);
        const response = await searchMembers(trimmedQuery, 0, 8);
        setResults(response.content);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  return (
    <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
      <CardHeader>
        <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          Member Lookup
        </CardDescription>
        <CardTitle className="text-2xl font-black tracking-tight text-slate-950 dark:text-slate-100">
          Search and open member profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Search for a member by name, then open a separate contribution profile
          page to review that member&apos;s yearly and monthly history.
        </p>

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type a member name"
            className="rounded-2xl border-slate-200 bg-white pl-11 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="min-h-24 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/70">
          {isSearching ? (
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Searching members...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => navigate(`/members/${member.id}/contributions`)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left transition hover:border-[var(--color-ocean)] hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/80 dark:hover:bg-slate-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {getMemberFullName(member)}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-ocean)]">
                    Open profile
                  </span>
                </button>
              ))}
            </div>
          ) : query.trim().length >= 2 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No members matched that name.
            </p>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Start typing at least two letters to search members.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default MemberLookupCard;
