import React from "react";
import { motion } from "framer-motion";

export default function TableResponse({ table }) {
  if (!table) return null;

  return (
    <motion.div
      className="overflow-auto my-3 rounded-md border border-[rgba(255,255,255,0.03)]"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <table className="min-w-full text-left">
        <thead className="bg-[rgba(255,255,255,0.02)]">
          <tr>
            {table.columns.map((c, i) => (
              <th
                key={i}
                className="px-3 py-2 text-sm text-[var(--muted)] font-medium"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {table.rows.map((row, idx) => (
            <tr
              key={idx}
              className={`transition-fast ${
                idx % 2 === 0
                  ? "bg-transparent"
                  : "bg-[rgba(255,255,255,0.01)]"
              } hover:bg-[rgba(255,255,255,0.05)]`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}


