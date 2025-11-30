import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // AUTO-REDIRECT if already logged in
  useEffect(() => {
    if (role) {
      navigate(`/dashboard/${role}`);
    }
  }, [role]);

  const cardClass =
    "p-6 bg-white dark:bg-slate-800 shadow rounded-xl hover:shadow-lg transition cursor-pointer";

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
        Select Your Role
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <Link to="/dashboard/citizen" className={cardClass}>
          <h2 className="text-xl font-bold">👤 Citizen</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Explore Articles, Courtroom, Gamification & 3D World.
          </p>
        </Link>

        <Link to="/dashboard/educator" className={cardClass}>
          <h2 className="text-xl font-bold">🧑‍🏫 Educator</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Create lessons, quizzes & track students.
          </p>
        </Link>

        <Link to="/dashboard/legal" className={cardClass}>
          <h2 className="text-xl font-bold">⚖ Legal Expert</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Approve articles, verify AI answers & add case laws.
          </p>
        </Link>

        <Link to="/dashboard/admin" className={cardClass}>
          <h2 className="text-xl font-bold">👨‍💼 Admin</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Manage users, approve content, view analytics.
          </p>
        </Link>
      </div>
    </div>
  );
}
