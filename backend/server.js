const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const mock = require("./mockData");

const app = express();
app.use(cors());
app.use(express.json());

let sessions = mock.initialSessions.map(s => ({ ...s }));

app.get("/api/sessions", (req, res) => {
  res.json({ sessions });
});

app.get("/api/new-chat", (req, res) => {
  const id = uuidv4();
  const title = `Chat ${sessions.length + 1}`;
  const newSession = { id, title, history: [], updatedAt: Date.now() };
  sessions.unshift(newSession);
  res.json({ id, title });
});

app.get("/api/session/:id", (req, res) => {
  const session = sessions.find(s => s.id === req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  res.json({ session });
});

app.post("/api/chat/:id", (req, res) => {
  const { question } = req.body;
  const session = sessions.find(s => s.id === req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });

  const userMsg = { id: uuidv4(), role: "user", question, createdAt: Date.now() };
  session.history.push(userMsg);

  const assistantMsg = {
    id: uuidv4(),
    role: "assistant",
    question,
    answerText: mock.answerTemplate(question),
    table: mock.sampleTable(),
    feedback: { likes: 0, dislikes: 0 },
    createdAt: Date.now()
  };

  session.history.push(assistantMsg);
  session.updatedAt = Date.now();

  res.json({ message: assistantMsg });
});

app.post("/api/feedback/:sessionId/:messageId", (req, res) => {
  const { sessionId, messageId } = req.params;
  const { type } = req.body;
  const session = sessions.find(s => s.id === sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });
  const msg = session.history.find(m => m.id === messageId);
  if (!msg) return res.status(404).json({ error: "Message not found" });
  if (!msg.feedback) msg.feedback = { likes: 0, dislikes: 0 };
  if (type === "like") msg.feedback.likes = (msg.feedback.likes || 0) + 1;
  if (type === "dislike") msg.feedback.dislikes = (msg.feedback.dislikes || 0) + 1;
  res.json({ ok: true, feedback: msg.feedback });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Mock server listening on", PORT));

