import { useState } from "react";
import AnimatePage from "../components/AnimatePage";

const cases = [
  {
    id: 1,
    title: "Case: Police Stops Citizen Without Reason",
    description:
      "A citizen was stopped and questioned by the police without any valid reason. The citizen claims violation of constitutional rights.",
    options: [
      "Article 14 – Equality Before Law",
      "Article 19 – Freedom of Movement",
      "Article 21 – Right to Life & Liberty"
    ],
    correct: "Article 21 – Right to Life & Liberty",
    explanation:
      "Stopping someone without cause violates personal liberty protected under Article 21."
  },
  {
    id: 2,
    title: "Case: Student Denied Admission Due to Religion",
    description:
      "A college refused admission to a student citing religious background.",
    options: [
      "Article 14 – Equality",
      "Article 25 – Freedom of Religion",
      "Article 21A – Right to Education"
    ],
    correct: "Article 14 – Equality",
    explanation:
      "Discrimination based on religion is a violation of Article 14 and equality principles."
  }
];

export default function CourtRoom() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [result, setResult] = useState("");

  const evaluate = () => {
    if (!selectedOption) return;

    if (selectedOption === selectedCase.correct) {
      setResult("✔ Correct Judgment! 🎉");
    } else {
      setResult("❌ Incorrect Judgment");
    }
  };

  return (
    <AnimatePage>
      <div className="space-y-6 p-6">
        <h1 className="text-3xl font-bold text-indigo-600">Virtual Courtroom ⚖️</h1>

        {/* Case Selection */}
        {!selectedCase && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select a Case</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {cases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className="p-5 bg-white shadow rounded-xl hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">
                    {c.description.slice(0, 80)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Case Simulation */}
        {selectedCase && (
          <div className="p-6 bg-white rounded-xl shadow space-y-4">
            <h2 className="text-2xl font-bold">{selectedCase.title}</h2>
            <p className="text-slate-600">{selectedCase.description}</p>

            <div className="space-y-2">
              <h3 className="font-semibold">Select the Right Article:</h3>

              {selectedCase.options.map((op) => (
                <label key={op} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="option"
                    value={op}
                    onChange={() => setSelectedOption(op)}
                  />
                  {op}
                </label>
              ))}
            </div>

            <button
              onClick={evaluate}
              className="px-4 py-2 bg-indigo-600 text-white rounded shadow mt-4"
            >
              Submit Judgment
            </button>

            {result && (
              <div className="p-4 bg-slate-100 rounded-xl mt-4">
                <h3 className="text-lg font-bold">{result}</h3>
                <p className="text-slate-700 mt-2">{selectedCase.explanation}</p>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedCase(null);
                setResult("");
                setSelectedOption("");
              }}
              className="mt-6 px-4 py-2 bg-gray-300 rounded shadow"
            >
              ⟵ Back to Cases
            </button>
          </div>
        )}
      </div>
    </AnimatePage>
  );
}
