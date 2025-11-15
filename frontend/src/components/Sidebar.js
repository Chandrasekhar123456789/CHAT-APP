import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function Sidebar({ collapsed, setCollapsed }) {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const API = "https://chat-app-kjwu.onrender.com";
  useEffect(() => {
    fetchSessions();
  }, []);

  function fetchSessions() {
   fetch(`${API}/api/sessions`)
      .then((r) => r.json())
      .then((d) => setSessions(d.sessions || []))
      .catch((e) => console.error(e));
  }

  function newChat() {
    fetch(`${API}/api/new-chat`)
      .then((r) => r.json())
      .then((d) => {
        navigate(`/chat/${d.id}`);
        fetchSessions();
      })
      .catch((e) => console.error(e));
  }

  return (
    <>
      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: collapsed ? -250 : 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className={`w-72 bg-[var(--panel)] border-r border-white/5 p-4 
          h-screen fixed md:static z-30`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="rounded-full w-10 h-10 bg-gradient-to-br
              from-[var(--accent)] to-[var(--accent-2)]
              flex items-center justify-center text-white font-bold shadow-md"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              L
            </motion.div>

            <div>
              <div className="font-semibold">Lumibyte</div>
              <div className="text-xs text-[var(--muted)]">Mock chat studio</div>
            </div>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setCollapsed((s) => !s)}
            className="p-2 rounded hover:bg-white/10 transition"
          >
            <Bars3Icon className="w-5 h-5 text-[var(--txt)]" />
          </motion.button>
        </div>

        {/* NEW CHAT BUTTON */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.92 }}
          onClick={newChat}
          className="w-full flex items-center gap-2 justify-center py-2 rounded
          bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]
          text-white shadow-md mb-4"
        >
          <PlusIcon className="w-4 h-4" />
          New Chat
        </motion.button>

        {/* SESSIONS LIST */}
        <h3 className="text-sm font-medium mb-2 text-[var(--muted)]">Recent Sessions</h3>

        <div className="space-y-2 overflow-y-auto h-[70vh] pr-1">
          <AnimatePresence>
            {sessions.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={`/chat/${s.id}`}
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 
                  backdrop-blur-md transition flex justify-between"
                >
                  <div>
                    <div className="font-medium">{s.title || s.id}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {(s.history?.length) || 0} messages
                    </div>
                  </div>

                  <div className="text-xs text-[var(--muted)]">
                    {new Date(s.updatedAt || Date.now()).toLocaleDateString()}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* FLOATING NEW CHAT — MOBILE */}
      <motion.button
        onClick={newChat}
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 md:hidden p-4 rounded-full
        bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)]
        text-white shadow-xl z-40"
      >
        <PlusIcon className="w-6 h-6" />
      </motion.button>
    </>
  );
}

