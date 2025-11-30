import AnimatePage from "../components/AnimatePage";
import { useState } from "react";

export default function Simulator() {
  const [scenario, setScenario] = useState("");
  const [output, setOutput] = useState("");

  const runSimulation = () => {
    if (!scenario) return;

    // simple simulation logic
    if (scenario.toLowerCase().includes("police")) {
      setOutput(
        "This scenario may involve Article 21 (Right to Life & Liberty) and Article 22 (Protection against arrest)."
      );
    } else if (scenario.toLowerCase().includes("speech")) {
      setOutput("This involves Article 19 (Right to Freedom of Speech).");
    } else {
      setOutput("Simulation complete. Please provide a more specific scenario.");
    }
  };

  return (
    <AnimatePage>
      <div className="space-y-6 p-6">
        <h1 className="text-3xl font-bold text-indigo-600">Scenario Simulator 🎯</h1>

        <div className="p-6 bg-white shadow rounded-xl space-y-4">
          <textarea
            placeholder="Describe your scenario..."
            className="w-full p-3 border rounded-lg min-h-[120px]"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          />

          <button
            onClick={runSimulation}
            className="px-4 py-2 bg-indigo-600 text-white rounded shadow"
          >
            Run Simulation →
          </button>

          {output && (
            <div className="p-4 bg-slate-100 rounded-xl mt-4">
              {output}
            </div>
          )}
        </div>
      </div>
    </AnimatePage>
  );
}
