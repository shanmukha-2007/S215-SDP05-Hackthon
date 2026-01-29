import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);
  const card =
    "p-6 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition";

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-red-600 dark:text-red-400">
        Admin Dashboard 👨‍💼
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={card}>👥 Manage Users</div>
        <div className={card}>✔ Approve Content</div>
        <div className={card}>📊 Platform Analytics</div>
        <div className={card}>🛡 Security & Permissions</div>
      </div>
    </div>
  );
}
