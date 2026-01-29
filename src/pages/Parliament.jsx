import { useState } from "react";
import AnimatePage from "../components/AnimatePage";

export default function Parliament() {
  const [billTitle, setBillTitle] = useState("");
  const [billDesc, setBillDesc] = useState("");
  const [stage, setStage] = useState("draft"); // draft → debate → vote → result
  const [votes, setVotes] = useState({ yes: 0, no: 0 });

  const handleVote = (type) => {
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const resetSimulator = () => {
    setStage("draft");
    setVotes({ yes: 0, no: 0 });
    setBillTitle("");
    setBillDesc("");
  };

  return (
    <AnimatePage>
      <div className="space-y-6 p-6">
        <h1 className="text-3xl font-bold text-indigo-600">Parliament Simulator 🏛️</h1>

        {/* 📝 BILL DRAFTING */}
        {stage === "draft" && (
          <div className="p-6 bg-white shadow rounded-xl space-y-4">
            <h2 className="text-xl font-semibold">Draft Your Bill</h2>

            <input
              type="text"
              placeholder="Bill Title..."
              className="w-full p-3 border rounded-lg"
              value={billTitle}
              onChange={(e) => setBillTitle(e.target.value)}
            />

            <textarea
              placeholder="Describe the purpose of the bill..."
              className="w-full p-3 border rounded-lg min-h-[120px]"
              value={billDesc}
              onChange={(e) => setBillDesc(e.target.value)}
            />

            <button
              onClick={() => billTitle && billDesc && setStage("debate")}
              className="px-4 py-2 bg-indigo-600 text-white rounded shadow"
            >
              Proceed to Debate →
            </button>
          </div>
        )}

        {/* 🗣️ DEBATE STAGE */}
        {stage === "debate" && (
          <div className="p-6 bg-white shadow rounded-xl space-y-4">
            <h2 className="text-2xl font-bold">{billTitle}</h2>
            <p className="text-slate-700">{billDesc}</p>

            <h3 className="font-semibold text-lg mt-4">Simulated Debate:</h3>
            <ul className="list-disc ml-6 text-slate-700 space-y-2">
              <li>Minister A: This bill brings positive reforms.</li>
              <li>Minister B: There may be budget issues.</li>
              <li>Opposition: Further review required.</li>
              <li>Speaker: Time for voting!</li>
            </ul>

            <button
              onClick={() => setStage("vote")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Proceed to Voting →
            </button>
          </div>
        )}

        {/* 🗳️ VOTING STAGE */}
        {stage === "vote" && (
          <div className="p-6 bg-white shadow rounded-xl space-y-6">
            <h2 className="text-2xl font-bold">Voting Session</h2>

            <div className="flex gap-4">
              <button
                onClick={() => handleVote("yes")}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                👍 Vote YES
              </button>

              <button
                onClick={() => handleVote("no")}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                👎 Vote NO
              </button>
            </div>

            <div className="text-lg">
              Yes: <span className="font-bold">{votes.yes}</span> | No:{" "}
              <span className="font-bold">{votes.no}</span>
            </div>

            <button
              onClick={() => setStage("result")}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Show Result →
            </button>
          </div>
        )}

        {/* 🏆 RESULT STAGE */}
        {stage === "result" && (
          <div className="p-6 bg-white shadow rounded-xl space-y-4">
            <h2 className="text-2xl font-bold">Final Verdict</h2>

            {votes.yes > votes.no ? (
              <p className="text-green-600 text-xl font-semibold">
                🎉 Bill PASSED with majority!
              </p>
            ) : (
              <p className="text-red-600 text-xl font-semibold">
                ❌ Bill REJECTED by the House.
              </p>
            )}

            <button
              onClick={resetSimulator}
              className="mt-4 px-4 py-2 bg-gray-300 text-black rounded"
            >
              Start New Simulation
            </button>
          </div>
        )}
      </div>
    </AnimatePage>
  );
}
