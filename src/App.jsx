import { Routes, Route } from "react-router-dom";

/* MAIN PAGES */
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import Simulator from "./pages/Simulator";
import CourtRoom from "./pages/CourtRoom";
import Parliament from "./pages/Parliament";
import Gamification from "./pages/Gamification";
import Chatbot from "./pages/Chatbot";

/* AUTH PAGES */
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/auth/Profile";

/* DASHBOARD PAGES */
import Dashboard from "./pages/dashboard/Dashboard";
import CitizenDashboard from "./pages/dashboard/CitizenDashboard";
import EducatorDashboard from "./pages/dashboard/EducatorDashboard";
import LegalExpertDashboard from "./pages/dashboard/LegalExpertDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

/* COMPONENTS */
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">

        <Routes>

          {/* MAIN ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />

          <Route path="/court" element={<CourtRoom />} />
          <Route path="/parliament" element={<Parliament />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/chatbot" element={<Chatbot />} />

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />

          {/* DASHBOARD ROUTES */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
          <Route path="/dashboard/educator" element={<EducatorDashboard />} />
          <Route path="/dashboard/legal" element={<LegalExpertDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          {/* 404 PAGE */}
          <Route
            path="*"
            element={
              <h1 className="text-center text-3xl font-bold mt-20">
                404 — Page Not Found
              </h1>
            }
          />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}
