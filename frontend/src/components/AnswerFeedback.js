import React, { useState } from "react";

export default function AnswerFeedback({ sessionId, messageId, feedback = {}, onUpdate }) {
  const [sending, setSending] = useState(false);

  function send(type) {
    setSending(true);
    fetch(`http://localhost:4000/api/feedback/${sessionId}/${messageId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    })
      .then((r) => r.json())
      .then(() => {
        if (onUpdate) onUpdate();
      })
      .catch((e) => console.error(e))
      .finally(() => setSending(false));
  }

  return (
    <div className="mt-2 flex items-center gap-3">
      <button onClick={() => send("like")} disabled={sending} className="px-3 py-1 rounded-md border transition-fast">
        👍 {feedback?.likes || 0}
      </button>
      <button onClick={() => send("dislike")} disabled={sending} className="px-3 py-1 rounded-md border transition-fast">
        👎 {feedback?.dislikes || 0}
      </button>
    </div>
  );
}

