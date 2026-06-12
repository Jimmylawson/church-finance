import { useState } from "react";
import { z } from "zod";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import AuthBrand from "@/components/AuthBrand";
import Oauth2 from "@/components/Oauth2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/AuthProvider";

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await login(result.data);
      navigate(redirectTo, { replace: true });
    } catch {
      setSubmitError("Login failed. Check your credentials and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ee_0%,#eff5ff_55%,#f8fbff_100%)] px-6 py-10 dark:bg-[linear-gradient(180deg,#07101d_0%,#0b1524_58%,#0d1828_100%)] sm:px-8 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <AuthBrand />
          <div className="max-w-xl">
            <p className="mb-3 inline-flex rounded-full bg-[var(--color-sky)] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-ocean)] dark:bg-slate-900/80 dark:text-[#7ca0ff]">
              Ledgerly Admin Access
            </p>
            <h1 className="font-display text-4xl font-black tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">
              Sign in to manage your church finance workflow.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
              Access the dashboard, record contributions, and keep your giving and
              expense records organized in one place.
            </p>
          </div>
        </div>

        <Card className="border-white/70 bg-white/90 shadow-[0_24px_80px_-48px_rgba(16,35,63,0.45)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/78 dark:shadow-[0_24px_80px_-48px_rgba(0,0,0,0.35)]">
          <CardHeader className="space-y-2">
            <CardDescription className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Welcome Back
            </CardDescription>
            <CardTitle className="text-3xl font-black tracking-tight text-slate-950 dark:text-slate-100">
              Sign in
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrors((current) => ({ ...current, email: "" }));
                    }}
                    placeholder="you@church.org"
                    className="rounded-2xl border-slate-200 bg-white pl-11 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrors((current) => ({ ...current, password: "" }));
                    }}
                    placeholder="Enter your password"
                    className="rounded-2xl border-slate-200 bg-white pl-11 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                )}
              </div>

              {submitError && (
                <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-2xl bg-[var(--color-ocean)] text-white shadow-[0_18px_40px_rgba(37,90,240,0.22)] hover:bg-[color-mix(in_srgb,var(--color-ocean),black_10%)]"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.22em]">
                <span className="bg-white px-3 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            <Oauth2 />

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Need to go back first?{" "}
              <Link to="/" className="font-semibold text-[var(--color-ocean)] hover:underline">
                Return to the landing page
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
