import { Link } from "react-router-dom";
import { ModeToggle } from "@/components";

function Navbar() {
  return (
    <header className="sticky top-4 z-20 mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-[0_20px_60px_rgba(16,35,63,0.08)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60 dark:shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-ocean)] text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(37,90,240,0.32)]">
          L
        </div>
        <div>
          <p className="font-['Space_Grotesk'] text-lg font-bold tracking-tight dark:text-slate-100">Ledgerly</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Church finance made simple</p>
        </div>
      </div>

      <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
        <a href="#features" className="transition hover:text-[var(--color-ocean)]">
          Features
        </a>
        <a href="#preview" className="transition hover:text-[var(--color-ocean)]">
          Preview
        </a>
        <a href="#how-it-works" className="transition hover:text-[var(--color-ocean)]">
          How it works
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <ModeToggle />
        <Link
          to="/dashboard"
          className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 sm:inline-flex"
        >
          Sign in
        </Link>
        <Link
          to="/dashboard"
          className="rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,35,63,0.18)] transition hover:-translate-y-0.5 dark:bg-[var(--color-ocean)] dark:shadow-[0_18px_40px_rgba(37,90,240,0.24)]"
        >
          Start free
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
