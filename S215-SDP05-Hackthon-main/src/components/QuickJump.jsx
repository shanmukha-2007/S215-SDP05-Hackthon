import { useState } from "react";

export default function QuickJump({ total, onJump }) {
  const [number, setNumber] = useState("");

  const handleJump = () => {
    if (!number) return;
    onJump(Number(number));
    setNumber("");
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-xl flex gap-3 items-center">
      <input
        type="number"
        min="1"
        max={total}
        placeholder="Article No..."
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="input w-32"
      />

      <button className="btn btn-primary" onClick={handleJump}>
        Jump →
      </button>
    </div>
  );
}
