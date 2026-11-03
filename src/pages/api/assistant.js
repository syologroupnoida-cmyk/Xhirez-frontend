// Free assistant: Google Gemini free tier + built-in fallback.
const SYSTEM_PROMPT = `You are the Xhirez Assistant, a friendly helper on the Xhirez job portal.
Help job seekers with: finding jobs, writing resumes and cover letters, interview preparation,
career advice, and using the site. Site pages you can point to:
- /alljob (browse and search all jobs)
- /jobs-by-sector (jobs by sector)
- /signUp and /login (create an account or sign in)
- /career-counselling, /campus-buddy, /SheCanCode, /business (E-Campus)
Rules: keep answers short and practical (under 150 words unless asked for more).
Do not invent specific job listings, salaries, or company details. If you don't know, say so.
If the user writes in Hindi or another language, reply in that language.`;

const isDev = process.env.NODE_ENV !== "production";

// ---- Rate limit (in-memory, per server instance) ----
const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_REQ = 10;
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQ;
}

// ---- Free fallback ----
const FALLBACK = [
  { k: ["hello", "hi", "hey", "namaste"], a: "Hello! 👋 I'm the Xhirez Assistant. I can help with jobs, resumes, interviews and careers. What would you like to know?" },
  { k: ["resume", "cv"], a: "Resume tips: keep it to 1 page, start with a 2-line summary, list achievements with numbers, and tailor skills to each job. Build your profile after signing up at /signUp." },
  { k: ["interview"], a: "Interview prep: research the company, practise common questions, prepare 2-3 STAR-format stories, and ask 2 questions at the end." },
  { k: ["freSeer", "no experience", "student", "internship"], a: "As a freSeer, look for internships and entry-level roles at /alljob, build 2-3 small projects, and check Campus Buddy at /campus-buddy." },
  { k: ["job", "vacancy", "opening", "hiring"], a: "You can browse and search all jobs at /alljob, or explore by industry at /jobs-by-sector." },
  { k: ["sign up", "signup", "register", "account"], a: "Create a free account at /signUp. Already registered? Log in at /login." },
  { k: ["career", "counsel", "guidance"], a: "For one-to-one guidance, see /career-counselling." },
  { k: ["women", "SheCanCode"], a: "Check out SheCanCode at /SheCanCode for women-in-tech opportunities." },
];
function fallbackReply(text) {
  const t = ` ${text.toLowerCase()} `;
  const hit = FALLBACK.find((f) => f.k.some((w) => t.includes(` ${w}`) || t.includes(w) && w.length > 3));
  return hit
    ? hit.a
    : "I can help with jobs, resumes, interviews and careers. Try asking: 'How do I prepare for an interview?' or browse jobs at /alljob.";
}

async function callGemini(key, model, messages) {
  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
  };
  // 2.5-flash "thinking" eats output tokens and can leave an empty reply
  if (model.includes("2.5-flash")) body.generationConfig.thinkingConfig = { thinkingBudget: 0 };

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify(body),
    }
  );
  const data = await r.json();
  return { ok: r.ok, status: r.status, data };
}

export default async function handler(req, res) {
  const key = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  // ---- Dev-only health check: open http://localhost:3000/api/assistant ----
  if (req.method === "GET") {
    if (!isDev) return res.status(404).end();
    const info = { keyLoaded: !!key, keyLength: key ? key.length : 0, model };
    if (!key) {
      info.problem = "GEMINI_API_KEY not found. Check .env.local name/location and restart npm run dev.";
      return res.status(200).json(info);
    }
    try {
      const t = await callGemini(key, model, [{ role: "user", content: "Say hi in 3 words" }]);
      info.geminiStatus = t.status;
      info.geminiError = t.data?.error?.message || null;
      info.sampleReply = t.data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || null;
      info.finishReason = t.data?.candidates?.[0]?.finishReason || null;
    } catch (e) {
      info.geminiError = String(e);
    }
    return res.status(200).json(info);
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress || "unknown";
  if (limited(ip)) return res.status(429).json({ error: "Too many messages. Please wait a minute." });

  const raw = Array.isArray(req.body?.messages) ? req.body.messages : [];
  let messages = raw
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "Invalid request." });
  }
  const lastUser = messages[messages.length - 1].content;

  const fb = (why) => {
    console.error("[assistant] using fallback:", why);
    return res.status(200).json({ reply: fallbackReply(lastUser), source: "fallback", ...(isDev && { debug: why }) });
  };

  if (!key) return fb("GEMINI_API_KEY missing (check .env.local and restart server)");

  try {
    const { ok, status, data } = await callGemini(key, model, messages);
    if (!ok) return fb(`Gemini HTTP ${status}: ${data?.error?.message}`);

    const reply = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
    if (!reply) return fb(`Empty reply. finishReason=${data.candidates?.[0]?.finishReason}, blocked=${data.promptFeedback?.blockReason}`);

    return res.status(200).json({ reply, source: "gemini" });
  } catch (e) {
    return fb(String(e));
  }
}