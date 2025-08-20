import React from "react";

/**
 * Input wrapper with label and error text.
 */
// PUBLIC_INTERFACE
export default function Input({ label, error, className = "", ...props }) {
  return (
    <label className={`grid gap-1.5 text-sm ${className}`}>
      {label && <span className="font-medium">{label}</span>}
      <input
        className="px-3 py-2 rounded-xl border border-[var(--border)] bg-white dark:bg-[#0f172a] outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      {error && <span className="text-red-600">{error}</span>}
    </label>
  );
}
