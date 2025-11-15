import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function MobileTopBar() {
  return (
    <motion.div
      className="md:hidden mb-3 flex items-center justify-between"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Logo Bubble */}
        <motion.div
          className="rounded-full w-8 h-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)]
          flex items-center justify-center text-white font-bold shadow-md"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          L
        </motion.div>

        {/* Text */}
        <div>
          <div className="text-sm font-semibold">Lumibyte</div>
          <div className="text-xs text-[var(--muted)] leading-none">tap + to start</div>
        </div>
      </div>

      {/* Menu Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85, rotate: 8 }}
        className="p-2 rounded-md bg-[var(--glass)] border border-white/10 shadow-sm backdrop-blur-md"
      >
        <Bars3Icon className="w-5 h-5 text-[var(--txt)]" />
      </motion.button>
    </motion.div>
  );
}

