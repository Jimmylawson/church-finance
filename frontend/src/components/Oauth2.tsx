import { googleOAuthUrl } from "../lib/auth";
import { Button } from "./ui/button";

const GoogleIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4c-.2 1.2-.9 2.2-1.9 2.9v2.4h3.1c1.8-1.7 3-4.1 3-7z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-0.9 6.6-2.5l-3.1-2.4c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H3v2.5C4.6 19.6 8 22 12 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.2 13.7c-.2-.6-.3-1.1-.3-1.7s.1-1.2.3-1.7V7.8H3C2.4 9.1 2 10.5 2 12s.4 2.9 1 4.2l3.2-2.5z"
      />
      <path
        fill="#EA4335"
        d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3 14.7 2 12 2 8 2 4.6 4.4 3 7.8l3.2 2.5C7 7.7 9.3 5.9 12 5.9z"
      />
    </svg>
  );
};
const Oauth2 = () => {
  return (
    <Button
      asChild
      variant="outline"
      className="h-11 w-full rounded-2xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      <a href={googleOAuthUrl}>
        <GoogleIcon />
        Continue with Google
      </a>
    </Button>
  );
};

export default Oauth2;
