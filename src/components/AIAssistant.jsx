import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faXmark, faPaperPlane, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const SUGGESTIONS = [
  "Help me write a resume summary",
  "How do I prepare for an interview?",
  "Which jobs suit a freSeer?",
];
const WELCOME = {
  role: "assistant",
  content: "Hi! I'm the Xhirez Assistant. Ask me about jobs, resumes, interviews or careers.",
};
const STORE_KEY = "xh-ai-chat";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [debug, setDebug] = useState("");
  const endRef = useRef(null);
  const loaded = useRef(false);

  // Restore this tab's chat (cleared automatically when the tab closes)
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || "null");
      if (Array.isArray(saved) && saved.length) setMessages(saved);
    } catch {}
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(messages.slice(-30))); } catch {}
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const clearChat = () => {
    setMessages([WELCOME]);
    setInput("");
    setDebug("");
    try { sessionStorage.removeItem(STORE_KEY); } catch {}
  };

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setDebug("");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (data.debug) setDebug(data.debug); // only sent in development
      setMessages((m) => [
        ...m,
        { role: "assistant", content: res.ok ? data.reply : data.error || "Something went wrong." },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button className="xh-ai-fab" onClick={() => setOpen(true)} aria-label="Open AI assistant">
          <FontAwesomeIcon icon={faWandMagicSparkles} />
          <span>Ask AI</span>
        </button>
      )}

      {open && (
        <div className="xh-ai-panel notranslate" role="dialog" aria-label="AI assistant">
          <div className="xh-ai-head">
            <div>
              <strong>Xhirez Assistant</strong>
              <small>AI-powered · can make mistakes · don't share personal details</small>
            </div>
            <div className="xh-ai-head-actions">
              <button onClick={clearChat} aria-label="Clear chat" title="Clear chat">
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close" title="Close">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>

          <div className="xh-ai-body">
            {messages.map((m, i) => (
              <div key={i} className={`xh-ai-msg ${m.role}`}>{m.content}</div>
            ))}
            {loading && (
              <div className="xh-ai-msg assistant xh-ai-typing"><i /><i /><i /></div>
            )}
            {debug && <div className="xh-ai-debug">Dev note: {debug}</div>}

            {messages.length === 1 && (
              <div className="xh-ai-chips">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form className="xh-ai-form" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              maxLength={500}
              aria-label="Message"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAssistant;