import React from "react";

export default function ChatMessage({ message }) {
  const ts = new Date(message.createdAt).toLocaleTimeString();
  const isAssistant = message.role === "assistant";
  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      {isAssistant && (
        <div className="mr-3 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white font-semibold">
          B
        </div>
      )}
      <div className={`${isAssistant ? "bg-[rgba(255,255,255,0.03)] text-[var(--txt)]" : "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white"} bubble transition-fast`}>
        <div className="text-sm">{isAssistant ? message.answerText || message.question : message.question}</div>
        <div className="text-xs mt-1 text-[var(--muted)]">{ts}</div>
      </div>
      {!isAssistant && (
        <div className="ml-3 w-9 h-9 rounded-full bg-[var(--panel)] flex items-center justify-center text-[var(--muted)]">U</div>
      )}
    </div>
  );
}

