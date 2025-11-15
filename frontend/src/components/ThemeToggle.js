import React from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-14 h-7 rounded-full bg-[var(--glass)] border border-[rgba(255,255,255,0.06)] p-1 transition-fast cursor-pointer"
    >
      {/* Sliding bubble */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] shadow-md"
        style={{ x: isDark ? 0 : 24 }}
      />

      {/* Icons */}
      <div className="absolute left-2 top-1.5 text-[10px] text-[var(--muted)]">
        <MoonIcon className="w-3 h-3" />
      </div>
      <div className="absolute right-2 top-1.5 text-[10px] text-[var(--muted)]">
        <SunIcon className="w-3 h-3" />
      </div>
    </button>
  );
}


