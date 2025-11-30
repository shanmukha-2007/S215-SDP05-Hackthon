import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function readNumber(key) {
  const val = localStorage.getItem(key);
  if (!val) return 0;
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function readActivityLog() {
  try {
    const raw = localStorage.getItem("activityLog");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

export default function Profile() {
  const email = localStorage.getItem("userEmail") || "(unknown)";
  const role = localStorage.getItem("userRole") || "guest";

  const [stats, setStats] = useState({
    articlesRead: 0,
    quizzesTaken: 0,
    avgScore: 0,
    simSessions: 0,
    points: 0,
  });

  const [log, setLog] = useState(() => readActivityLog());

  useEffect(() => {
    const s = {
      articlesRead: readNumber("articlesRead"),
      quizzesTaken: readNumber("quizzesTaken"),
      avgScore: readNumber("avgQuizScore"),
      simSessions: readNumber("simSessions"),
      points: readNumber("points"),
    };
    setStats(s);
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.storageArea !== localStorage) return;
      if (["articlesRead", "quizzesTaken", "avgQuizScore", "simSessions", "points"].includes(e.key)) {
        const s = {
          articlesRead: readNumber("articlesRead"),
          quizzesTaken: readNumber("quizzesTaken"),
          avgScore: readNumber("avgQuizScore"),
          simSessions: readNumber("simSessions"),
          points: readNumber("points"),
        };
        setStats(s);
      }
      if (e.key === "activityLog") {
        setLog(readActivityLog());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // A simple helper to push a history event
  const pushActivity = (type, label, details = {}) => {
    const activity = { type, label, details, ts: Date.now() };
    const nowLog = readActivityLog();
    const next = [activity, ...nowLog].slice(0, 200);
    localStorage.setItem("activityLog", JSON.stringify(next));
    setLog(next);
  };

  // Add sample data for demo/testing
  const addSampleData = () => {
    const ar = readNumber("articlesRead") + Math.floor(Math.random() * 5) + 1;
    const qs = readNumber("quizzesTaken") + Math.floor(Math.random() * 2);
    const avg = Math.round((readNumber("avgQuizScore") * readNumber("quizzesTaken") + Math.floor(Math.random() * 40) + 60) / Math.max(1, qs));
    const sim = readNumber("simSessions") + Math.floor(Math.random() * 3);
    const pts = readNumber("points") + Math.floor(Math.random() * 200);

    localStorage.setItem("articlesRead", String(ar));
    localStorage.setItem("quizzesTaken", String(qs));
    localStorage.setItem("avgQuizScore", String(avg));
    localStorage.setItem("simSessions", String(sim));
    localStorage.setItem("points", String(pts));

    setStats({ articlesRead: ar, quizzesTaken: qs, avgScore: avg, simSessions: sim, points: pts });
    pushActivity("system", `Added sample data (+${ar - readNumber("articlesRead")})`, { ar, qs, avg, sim, pts });
  };

  const resetStats = () => {
    localStorage.removeItem("articlesRead");
    localStorage.removeItem("quizzesTaken");
    localStorage.removeItem("avgQuizScore");
    localStorage.removeItem("simSessions");
    localStorage.removeItem("points");
    localStorage.removeItem("activityLog");
    setStats({ articlesRead: 0, quizzesTaken: 0, avgScore: 0, simSessions: 0, points: 0 });
    setLog([]);
  };

  const exportData = () => {
    const data = { email, role, stats, log };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `profile-${email || 'user'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const TimelineItem = ({ item }) => (
    <div className="border-b last:border-b-0 py-3 text-sm">
      <div className="flex justify-between">
        <div className="font-medium text-slate-700">{item.label}</div>
        <div className="text-slate-400">{formatDate(item.ts)}</div>
      </div>
      {item.details && <div className="text-slate-500 mt-1">{JSON.stringify(item.details)}</div>}
    </div>
  );

  const historyList = useMemo(() => log, [log]);

  if (role === 'guest') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-slate-800 shadow rounded-xl text-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">You're not logged in</h1>
        <p className="text-slate-600 mb-4">Please login or signup to view your profile, performance and history.</p>
        <div className="space-y-3">
          <Link to="/login" className="btn btn-primary w-full">Login</Link>
          <Link to="/signup" className="btn w-full">Signup</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-slate-800 shadow rounded-xl">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Your Profile</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-3">
          <div className="p-4 bg-white dark:bg-slate-700 border rounded">
            <div className="text-sm text-slate-500">Email</div>
            <div className="font-medium truncate">{email}</div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-700 border rounded">
            <div className="text-sm text-slate-500">Role</div>
            <div className="font-medium">{role}</div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-700 border rounded space-y-3">
            <div className="text-sm text-slate-500">Actions</div>
            <button className="btn btn-primary w-full" onClick={() => { window.location.href = `/dashboard/${role}`; }}>
              Go to Dashboard
            </button>
            <button className="btn w-full" onClick={addSampleData}>Add Sample Data</button>
            <button className="btn w-full" onClick={resetStats}>Reset Stats</button>
            <button className="btn w-full" onClick={exportData}>Export Profile</button>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="p-4 bg-white dark:bg-slate-700 border rounded">
            <div className="text-sm text-slate-500">Performance</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <div className="p-3 border rounded bg-white dark:bg-slate-800 text-center">
                <div className="text-sm text-slate-400">Articles Read</div>
                <div className="text-xl font-bold">{stats.articlesRead}</div>
              </div>
              <div className="p-3 border rounded bg-white dark:bg-slate-800 text-center">
                <div className="text-sm text-slate-400">Quizzes</div>
                <div className="text-xl font-bold">{stats.quizzesTaken}</div>
              </div>
              <div className="p-3 border rounded bg-white dark:bg-slate-800 text-center">
                <div className="text-sm text-slate-400">Avg Quiz Score</div>
                <div className="text-xl font-bold">{stats.avgScore}</div>
              </div>
              <div className="p-3 border rounded bg-white dark:bg-slate-800 text-center">
                <div className="text-sm text-slate-400">Points</div>
                <div className="text-xl font-bold">{stats.points}</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-700 border rounded">
            <div className="text-sm text-slate-500">Activity History</div>
            {historyList.length === 0 ? (
              <div className="text-slate-500 mt-3">No activity recorded yet. Use Add Sample Data to simulate activity.</div>
            ) : (
              <div className="mt-3">
                {historyList.map((it, idx) => (
                  <TimelineItem key={idx} item={it} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
