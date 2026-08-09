import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<CreateAccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
