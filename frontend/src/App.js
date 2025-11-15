import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ThemeToggle from "./components/ThemeToggle";
import MobileTopBar from "./components/MobileTopBar";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") root.classList.add("light");
    else root.classList.remove("light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold">Lumibyte — Modern Chat</h1>
            <p className="text-sm text-[var(--muted)]">Responsive • Animated • Modern</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>

        <MobileTopBar />

        <Routes>
          <Route
            path="/"
            element={
              <div className="card rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2">Welcome</h2>
                <p className="text-[var(--muted)]">Create a new chat from the sidebar. Try on mobile too — the layout is responsive.</p>
              </div>
            }
          />
          <Route path="/chat/:sessionId" element={<ChatWindow />} />
        </Routes>
      </div>
    </div>
  );
}
