import React from "react";

/**
 * Simple responsive table component.
 */
// PUBLIC_INTERFACE
export default function Table({ columns = [], data = [], rowKey = "id", actions }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b border-[var(--border)]">
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 font-semibold">{c.header}</th>
            ))}
            {actions && <th className="px-3 py-2" />}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td className="px-3 py-3 text-[var(--muted)]" colSpan={columns.length + (actions ? 1 : 0)}>
                No records.
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr key={row[rowKey]} className="border-b border-[var(--border)] hover:bg-gray-50/60 dark:hover:bg-white/5">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-2">{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
              ))}
              {actions && <td className="px-3 py-2">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
