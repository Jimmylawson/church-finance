import { Link } from "react-router-dom";

const AuthBrand = () => {
  return (
    <Link to="/" className="flex flex-col items-center gap-3 text-center">
      <img
        src="/favicon.svg"
        alt="Ledgerly logo"
        className="h-16 w-16 rounded-2xl"
      />
      <div className="text-2xl font-semibold tracking-tight dark:text-slate-100">Ledgerly</div>
      <p className="text-sm text-muted-foreground">
        Track church contributions, expenses, and monthly balances with clarity.
      </p>
    </Link>
  );
};

export default AuthBrand;
