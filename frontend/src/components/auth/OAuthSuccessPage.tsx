import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import type { LoginResponse } from "@/lib/auth";

function OAuthSuccessPage() {
  const navigate = useNavigate();
  const { completeLogin } = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const accessToken = searchParams.get("accessToken");
    const tokenType = searchParams.get("tokenType") ?? "Bearer";
    const expiresInValue = searchParams.get("expiresIn");
    const expiresAt = searchParams.get("expiresAt");
    const userIdValue = searchParams.get("userId");
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName") ?? undefined;
    const email = searchParams.get("email");

    if (
      !accessToken ||
      !expiresAt ||
      !userIdValue ||
      !firstName ||
      !email
    ) {
      navigate("/login", {
        replace: true,
        state: { error: "Google sign-in could not be completed." },
      });
      return;
    }

    const expiresIn = Number(expiresInValue ?? "0");
    const userId = Number(userIdValue);

    if (Number.isNaN(expiresIn) || Number.isNaN(userId)) {
      navigate("/login", {
        replace: true,
        state: { error: "Google sign-in returned invalid session data." },
      });
      return;
    }

    const response: LoginResponse = {
      accessToken,
      tokenType,
      expiresIn,
      expiresAt,
      user: {
        id: userId,
        firstName,
        lastName,
        email,
      },
    };

    completeLogin(response);
    navigate("/dashboard", { replace: true });
  }, [completeLogin, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="rounded-2xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground shadow-sm">
        Finishing Google sign-in...
      </div>
    </div>
  );
}

export default OAuthSuccessPage;
