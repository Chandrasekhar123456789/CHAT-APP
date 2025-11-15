import React from "react";
import { motion } from "framer-motion";

export default function ChatMessage({ message }) {
  const ts = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isAssistant = message.role === "assistant";

  // animation variants
  const bubbleAnim = {
    hidden: { opacity: 0, scale: 0.8, x: isAssistant ? -25 : 25 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.20, ease: "easeOut" }
    }
  };

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"} my-2`}>

      {/* Assistant avatar */}
      {isAssistant && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.6 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="mr-3 w-9 h-9 rounded-full bg-gradient-to-br 
          from-[var(--accent)] to-[var(--accent-2)] 
          flex items-center justify-center text-white font-semibold shadow"
        >
          B
        </motion.div>
      )}

      {/* Chat Bubble */}
      <motion.div
        variants={bubbleAnim}
        initial="hidden"
        animate="visible"
        className={`
          bubble px-4 py-2 max-w-[70%] rounded-2xl shadow-sm leading-relaxed
          ${isAssistant 
            ? "bg-[rgba(255,255,255,0.05)] text-[var(--txt)] border border-[rgba(255,255,255,0.06)]" 
            : "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white"
          }
        `}
      >
        <div className="text-sm whitespace-pre-line">
          {isAssistant 
            ? message.answerText || message.question 
            : message.question
          }
        </div>

        {/* timestamp */}
        <div className={`text-[0.65rem] mt-1 ${isAssistant ? "text-[var(--muted)]" : "text-white/80"}`}>
          {ts}
        </div>
      </motion.div>

      {/* User avatar */}
      {!isAssistant && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.6 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="ml-3 w-9 h-9 rounded-full bg-[var(--panel)] 
          flex items-center justify-center text-[var(--muted)] shadow"
        >
          U
        </motion.div>
      )}
    </div>
  );
}


