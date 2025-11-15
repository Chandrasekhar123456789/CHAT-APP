import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function MobileTopBar() {
  return (
    <div className="md:hidden mb-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-full w-8 h-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white font-bold">L</div>
        <div>
          <div className="text-sm font-semibold">Lumibyte</div>
          <div className="text-xs text-[var(--muted)]">tap + to start</div>
        </div>
      </div>
      <button className="p-2 rounded bg-[var(--glass)]">
        <Bars3Icon className="w-5 h-5" />
      </button>
    </div>
  );
}
