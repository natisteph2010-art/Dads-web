import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { supabase } from "./lib/supabase";
import { redirectByRole } from "./lib/auth";

function AuthRedirect() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    redirectByRole(navigate).finally(() => setLoading(false));
  }, [navigate]);

  return loading ? <div className="min-h-screen bg-royal-970" /> : null;
}

function ProtectedRoute({ role, children }: { role: "admin" | "student"; children: React.ReactNode }) {
  const location = useLocation();
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">("loading");

  useEffect(() => {
    let active = true;
    async function checkAccess() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        if (active) setStatus("denied");
        return;
      }
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
      if (active) setStatus(profile?.role === role ? "allowed" : "denied");
    }
    checkAccess();
    return () => { active = false; };
  }, [role, location.pathname]);

  if (status === "loading") return <div className="min-h-screen bg-royal-970" />;
  if (status === "denied") return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<CreateAccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/redirect" element={<AuthRedirect />} />
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
