export default function LegalExpertDashboard() {
  const card =
    "p-6 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition";

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
        Legal Expert Dashboard ⚖
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={card}>✔ Approve Article Content</div>
        <div className={card}>📜 Add Case Laws</div>
        <div className={card}>🤖 Validate AI Chatbot Answers</div>
        <div className={card}>📘 Review Amendments</div>
      </div>
    </div>
  );
}
