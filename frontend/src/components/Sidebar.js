import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function Sidebar({ collapsed, setCollapsed }) {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  function fetchSessions() {
    fetch("http://localhost:4000/api/sessions")
      .then((r) => r.json())
      .then((d) => setSessions(d.sessions || []))
      .catch((e) => console.error(e));
  }

  function newChat() {
    fetch("http://localhost:4000/api/new-chat")
      .then((r) => r.json())
      .then((d) => {
        navigate(`/chat/${d.id}`);
        fetchSessions();
      })
      .catch((e) => console.error(e));
  }

  return (
    <>
      <aside className="w-80 bg-[var(--panel)] border-r border-[rgba(255,255,255,0.03)] p-4 desktop-only">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full w-10 h-10 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white font-bold">
              L
            </div>
            <div>
              <div className="font-semibold">Lumibyte</div>
              <div className="text-xs text-[var(--muted)]">Mock chat studio</div>
            </div>
          </div>

          <button onClick={() => setCollapsed((s) => !s)} className="p-2 rounded hover:bg-[var(--glass)] transition-fast">
            <Bars3Icon className="w-5 h-5 text-[var(--txt)]" />
          </button>
        </div>

        <div className="mb-4">
          <button onClick={newChat} className="w-full flex items-center gap-2 justify-center py-2 rounded bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white shadow-md">
            <PlusIcon className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-[var(--muted)]">Recent Sessions</h3>
          <div className="space-y-2">
            <AnimatePresence>
              {sessions.map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link to={`/chat/${s.id}`} className="block p-3 rounded hover:bg-[var(--glass)] transition-medium">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{s.title || s.id}</div>
                        <div className="text-xs text-[var(--muted)]">{(s.history?.length) || 0} messages</div>
                      </div>
                      <div className="text-xs text-[var(--muted)]">{new Date(s.updatedAt || Date.now()).toLocaleDateString()}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </aside>

      {/* mobile floating new chat button */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button onClick={newChat} className="p-3 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] shadow-lg text-white">
          +
        </button>
      </div>
    </>
  );
}
