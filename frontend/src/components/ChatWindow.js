import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TableResponse from "./TableResponse";
import AnswerFeedback from "./AnswerFeedback";
import ChatMessage from "./ChatMessage";

export default function ChatWindow() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!sessionId) return;
    fetchSession();
  }, [sessionId]);

  function fetchSession() {
    fetch(`http://localhost:4000/api/session/${sessionId}`)
      .then((r) => r.json())
      .then((d) => setSession(d.session))
      .catch((e) => console.error(e));
  }

  function send() {
    if (!question.trim()) return;
    setLoading(true);
    // show typing for 600-900ms for realism
    setTyping(true);
    fetch(`http://localhost:4000/api/chat/${sessionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })
      .then((r) => r.json())
      .then(() => {
        setQuestion("");
        setTimeout(() => {
          setTyping(false);
          fetchSession();
        }, 700);
      })
      .catch((e) => { console.error(e); setTyping(false); })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session, typing]);

  return (
    <div className="card rounded-lg shadow p-4 flex flex-col h-[78vh] max-h-[78vh]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-semibold text-lg">{session?.title || sessionId}</div>
          <div className="text-xs text-[var(--muted)]">{session?.history?.length || 0} messages</div>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-4 mb-4 px-1">
        <AnimatePresence initial={false}>
          {session?.history?.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }}>
              <ChatMessage message={m} />
              <div className="mt-2 ml-2">
                {m.answerText && <div className="text-sm mb-2">{m.answerText}</div>}
                <TableResponse table={m.table} />
                <AnswerFeedback sessionId={sessionId} messageId={m.id} feedback={m.feedback} onUpdate={fetchSession} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* typing indicator */}
        {typing && (
          <div className="flex items-start gap-3">
            <div className="mr-3 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white font-semibold">B</div>
            <div className="bubble bg-[rgba(255,255,255,0.03)]">
              <div className="typing">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 items-center">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your question and press Enter"
          className="flex-1 rounded-full px-4 py-2 outline-none border border-[rgba(255,255,255,0.03)] bg-[var(--card)]"
        />
        <button onClick={send} disabled={loading} className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white shadow-md">
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

