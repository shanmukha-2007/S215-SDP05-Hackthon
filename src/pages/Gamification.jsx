import { useState, useEffect } from "react";

export default function Gamification() {
  // -----------------------------
  // STATE MANAGEMENT
  // -----------------------------
  const [xp, setXP] = useState(Number(localStorage.getItem("xp") || 0));
  const [streak, setStreak] = useState(Number(localStorage.getItem("streak") || 0));
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentQ, setCurrentQ] = useState(0);

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("quizHistory") || "[]")
  );

  // -----------------------------
  // QUESTIONS BANK (10 QUESTIONS)
  // -----------------------------
  const questions = [
    {
      q: "Which Article guarantees Freedom of Speech?",
      options: ["Article 14", "Article 19", "Article 32"],
      answer: "Article 19",
    },
    {
      q: "Which Article defines India as “Union of States”?",
      options: ["Article 1", "Article 51A", "Article 370"],
      answer: "Article 1",
    },
    {
      q: "Right to Equality is under which Article?",
      options: ["Article 14", "Article 21", "Article 19"],
      answer: "Article 14",
    },
    {
      q: "Right to Life is under which Article?",
      options: ["Article 21", "Article 51", "Article 4"],
      answer: "Article 21",
    },
    {
      q: "Fundamental Duties appear in which Article?",
      options: ["Article 51A", "Article 19", "Article 32"],
      answer: "Article 51A",
    },
    {
      q: "Right to Constitutional Remedies is?",
      options: ["Article 32", "Article 356", "Article 370"],
      answer: "Article 32",
    },
    {
      q: "Education is a Fundamental Right under?",
      options: ["Article 21A", "Article 51B", "Article 19"],
      answer: "Article 21A",
    },
    {
      q: "Which Article deals with Prohibition of Untouchability?",
      options: ["Article 17", "Article 52", "Article 10"],
      answer: "Article 17",
    },
    {
      q: "Which Article deals with President of India?",
      options: ["Article 52", "Article 14", "Article 355"],
      answer: "Article 52",
    },
    {
      q: "Freedom of Religion is under?",
      options: ["Article 25", "Article 20", "Article 51A"],
      answer: "Article 25",
    }
  ];

  const current = questions[currentQ];

  // -----------------------------
  // SAVE XP + STREAK + HISTORY
  // -----------------------------
  useEffect(() => {
    localStorage.setItem("xp", xp);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("quizHistory", JSON.stringify(history));
  }, [history]);

  // -----------------------------
  // LEADERBOARD AUTO-UPDATE
  // -----------------------------
  const updateLeaderboard = (newXP) => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    const entry = {
      name: "Citizen User",
      xp: newXP,
      date: new Date().toLocaleString(),
    };

    leaderboard.push(entry);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  };

  // -----------------------------
  // HANDLE SUBMIT
  // -----------------------------
  const submitAnswer = () => {
    if (!selected) return;

    let correct = selected === current.answer;

    if (correct) {
      setFeedback("✔ Correct! +10 XP");
      const newXP = xp + 10;
      setXP(newXP);
      setStreak(streak + 1);
      updateLeaderboard(newXP);
    } else {
      setFeedback("❌ Wrong answer");
      setStreak(0);
    }

    // Save history
    const newHistory = [
      ...history,
      {
        question: current.q,
        selected: selected,
        correct: current.answer,
        date: new Date().toLocaleDateString(),
      }
    ];

    setHistory(newHistory);

    // Move to next question
    setTimeout(() => {
      setFeedback("");
      setSelected("");
      setCurrentQ((prev) => (prev + 1) % questions.length);
    }, 1200);
  };

  return (
    <div className="space-y-6 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600">Gamification 🎮</h1>

      {/* XP + STREAK CARD */}
      <div className="p-6 card">
        <h2 className="text-xl font-semibold mb-3">Your Progress</h2>
        <p className="text-lg">⭐ XP: <strong>{xp}</strong></p>
        <p className="text-lg">🔥 Streak: <strong>{streak} days</strong></p>
      </div>

      {/* QUIZ CARD */}
      <div className="p-6 card">
        <h2 className="text-xl font-semibold">Daily Constitution Quiz</h2>

        <p className="mt-3 font-medium">{current.q}</p>

        <div className="mt-4 space-y-2">
          {current.options.map((op) => (
            <label key={op} className="flex gap-3 items-center">
              <input
                type="radio"
                name="answer"
                value={op}
                checked={selected === op}
                onChange={() => setSelected(op)}
              />
              {op}
            </label>
          ))}
        </div>

        <button onClick={submitAnswer} className="btn btn-primary mt-4">
          Submit Answer
        </button>

        {feedback && (
          <p className="mt-3 text-lg font-semibold">{feedback}</p>
        )}
      </div>

      {/* QUIZ HISTORY */}
      <div className="p-6 card">
        <h2 className="text-xl font-semibold mb-3">📜 Quiz History</h2>

        {history.length === 0 ? (
          <p className="text-slate-600">No quiz attempts yet.</p>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {history.map((h, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                <p className="font-medium">{h.question}</p>
                <p className="">
                  Your Answer: <strong>{h.selected}</strong>
                </p>
                <p className="">
                  Correct: <strong>{h.correct}</strong>
                </p>
                <p className="text-xs text-slate-500">{h.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
