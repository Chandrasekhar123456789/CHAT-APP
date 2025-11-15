import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import TableResponse from "./TableResponse";
import AnswerFeedback from "./AnswerFeedback";
import ChatMessage from "./ChatMessage";
import LikeDislikeButtons from "./LikeDislikeButtons";

export default function ChatWindow() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
const API = "https://chat-app-kjwu.onrender.com";

  // ----------------------------------------
  // Fetch session
  // ----------------------------------------
  useEffect(() => {
    if (sessionId) fetchSession();
  }, [sessionId]);

  function fetchSession() {
    fetch(`${API}/api/session/${sessionId}`
)
      .then((r) => r.json())
      .then((d) => setSession(d.session))
      .catch((e) => console.error(e));
  }

  // ----------------------------------------
  // Send question
  // ----------------------------------------
  function send() {
    if (!question.trim()) return;
    setLoading(true);
    setTyping(true);

   fetch(`${API}/api/chat/${sessionId}`
, {
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
      .catch((e) => {
        console.error(e);
        setTyping(false);
      })
      .finally(() => setLoading(false));
  }

  // scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session, typing]);

  // ----------------------------------------
  // Animations
  // ----------------------------------------
  const msgVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  const typingVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const sendBtnTap = { scale: 0.92 };

  return (
    <motion.div
      className="card rounded-lg shadow p-4 flex flex-col h-[78vh] max-h-[78vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <div className="font-semibold text-lg">{session?.title || sessionId}</div>
          <div className="text-xs text-[var(--muted)]">{session?.history?.length || 0} messages</div>
        </div>
      </motion.div>

      {/* Chat Body */}
      <div className="flex-1 overflow-auto space-y-4 mb-4 px-1">
        <AnimatePresence initial={false}>
          {session?.history?.map((m) => (
            <motion.div
              key={m.id}
              variants={msgVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.18 }}
            >
              <ChatMessage message={m} />

              {/* Animated Extras */}
              <motion.div
                className="mt-2 ml-2 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {m.answerText && (
                  <motion.div
                    className="text-sm mb-2"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {m.answerText}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <TableResponse table={m.table} />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <AnswerFeedback
                    sessionId={sessionId}
                    messageId={m.id}
                    feedback={m.feedback}
                    onUpdate={fetchSession}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <LikeDislikeButtons />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              className="flex items-start gap-3"
              variants={typingVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mr-3 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white font-semibold">
                B
              </div>
              <div className="bubble bg-[rgba(255,255,255,0.03)]">
                <div className="typing">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 items-center">
        <motion.input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your question..."
          className="flex-1 rounded-full px-4 py-2 outline-none border border-[rgba(255,255,255,0.03)] bg-[var(--card)]"
          whileFocus={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
        />

        <motion.button
          onClick={send}
          disabled={loading}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white shadow-md"
          whileTap={sendBtnTap}
        >
          {loading ? "Sending..." : "Send"}
        </motion.button>
      </div>
    </motion.div>
  );
}
