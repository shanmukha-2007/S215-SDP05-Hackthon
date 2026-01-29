import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function EducatorDashboard() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "educator") {
      navigate("/dashboard");
    }
  }, [navigate]);
  const card =
    "p-6 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition";

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
        Educator Dashboard 🧑‍🏫
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={card}>📚 Create Lessons</div>
        <div className={card}>📝 Create Quizzes</div>
        <div className={card}>📊 Track Student Progress</div>
        <div className={card}>🗂 Upload Study Material</div>
      </div>
    </div>
  );
}
