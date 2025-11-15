export default function TableResponse({ table }) {
  if (!table) return null;
  return (
    <div className="overflow-auto my-3 rounded-md border border-[rgba(255,255,255,0.03)]">
      <table className="min-w-full text-left">
        <thead className="bg-[rgba(255,255,255,0.02)]">
          <tr>
            {table.columns.map((c, i) => (
              <th key={i} className="px-3 py-2 text-sm text-[var(--muted)]">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, idx) => (
            <tr key={idx} className={`${idx % 2 === 0 ? "bg-transparent" : "bg-[rgba(255,255,255,0.01)]"}`}>
              {r.map((cell, i) => (
                <td key={i} className="px-3 py-2 text-sm">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

