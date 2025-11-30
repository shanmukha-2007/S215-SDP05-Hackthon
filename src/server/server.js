// server/server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// basic rate-limit stub (for hackathon demo)
let lastCallTs = 0;
const MIN_INTERVAL = 200; // ms between requests from demo clients

app.post("/api/chat", async (req, res) => {
  try {
    const now = Date.now();
    if (now - lastCallTs < MIN_INTERVAL) {
      // rudimentary throttle to avoid abuse in demo
      return res.status(429).json({ error: "Too many requests. Try again." });
    }
    lastCallTs = now;

    const { messages, max_tokens = 500, temperature = 0.3 } = req.body;
    if (!messages) return res.status(400).json({ error: "messages required" });

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res.status(500).json({ error: "OpenAI API key not set on server." });
    }

    const resp = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // change if you prefer gpt-3.5-turbo or other
        messages,
        max_tokens,
        temperature,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
      }
    );

    const assistantMessage = resp.data.choices?.[0]?.message || null;
    return res.json({ assistant: assistantMessage });
  } catch (err) {
    console.error("OpenAI error:", err?.response?.data || err.message);
    return res.status(500).json({
      error: "AI service error",
      details: err?.response?.data || err.message,
    });
  }
});

const PORT = process.env.PORT || 5179;
app.listen(PORT, () => console.log(`AI proxy running on http://localhost:${PORT}`));
