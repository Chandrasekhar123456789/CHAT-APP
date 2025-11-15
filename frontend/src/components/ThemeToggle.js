import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-3 py-1 rounded-md border border-[rgba(255,255,255,0.05)] bg-[var(--glass)] transition-fast"
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}

