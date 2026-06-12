import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { DashboardPage, LandingPage } from "@/components";
import Contribution from "@/components/Dashboard/Contribution";
import LoginPage from "@/components/auth/LoginPage";
import OAuthSuccessPage from "@/components/auth/OAuthSuccessPage";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />
      <Route path="/oauth/success" element={<OAuthSuccessPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contributions/new" element={<Contribution />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
