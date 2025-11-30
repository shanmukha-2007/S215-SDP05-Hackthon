import { useState } from "react";
import AnimatePage from "../components/AnimatePage";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = {
      sender: "bot",
      text: "I'm your Constitution Assistant. More AI features coming soon!"
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <AnimatePage>
      <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow">

        <h1 className="text-3xl font-bold text-indigo-600">
          Constitution Chatbot 🤖
        </h1>

        <div className="h-80 overflow-y-auto p-4 bg-slate-100 rounded-lg space-y-3">
          {messages.map((m, i) => (
            <p
              key={i}
              className={`p-2 rounded-lg w-fit ${
                m.sender === "user"
                  ? "bg-indigo-600 text-white ml-auto"
                  : "bg-slate-300 text-black"
              }`}
            >
              {m.text}
            </p>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            className="flex-1 p-3 border rounded-lg input"
            placeholder="Ask anything about the Indian Constitution..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </AnimatePage>
  );
}
