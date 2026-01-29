import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CitizenDashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "citizen") {
      navigate("/dashboard");
    }
  }, [navigate]);
  const item =
    "p-6 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition";

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
        Citizen Dashboard 👤
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/articles" className={item}>📘 Explore Articles</Link>
        <Link to="/court" className={item}>⚖ Virtual Courtroom</Link>
        <Link to="/parliament" className={item}>🏛 Parliament Simulator</Link>
        <Link to="/gamification" className={item}>🎮 Gamification Zone</Link>
        <Link to="/chatbot" className={item}>🤖 AI Chatbot</Link>
        <Link to="/profile" className={item}>👤 Profile</Link>
      </div>
    </div>
  );
}
