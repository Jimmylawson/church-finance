import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage, LandingPage } from "@/components";
import Contribution from "@/components/Dashboard/Contribution";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/contributions/new" element={<Contribution />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
