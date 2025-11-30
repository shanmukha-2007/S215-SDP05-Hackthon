import { useEffect, useState } from "react";
import AnimatePage from "../components/AnimatePage";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  // Load leaderboard from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setUsers(data);
  }, []);

  return (
    <AnimatePage>
      <div className="space-y-6 p-6 max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-indigo-600 text-center">
          🏆 ConstitutionVerse Leaderboard
        </h1>

        <p className="text-center text-slate-600 dark:text-slate-300">
          Ranked by XP earned from quizzes, simulations, and activities.
        </p>

        {/* No Data */}
        {users.length === 0 && (
          <div className="card text-center">
            <p className="text-slate-600 dark:text-slate-300">
              No leaderboard data yet. Earn XP to appear here!
            </p>
          </div>
        )}

        {/* Leaderboard List */}
        {users.length > 0 && (
          <div className="space-y-3">
            {users
              .sort((a, b) => b.xp - a.xp)
              .map((user, index) => {
                const rank =
                  index === 0 ? "🥇"
                  : index === 1 ? "🥈"
                  : index === 2 ? "🥉"
                  : `#${index + 1}`;

                return (
                  <div
                    key={index}
                    className="card flex items-center justify-between px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{rank}</span>

                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                          Joined: {user.joined || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
                        {user.xp} XP
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

      </div>
    </AnimatePage>
  );
}
