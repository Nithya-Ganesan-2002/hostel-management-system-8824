import React from "react";

/**
 * Card container with header/footer slots.
 */
// PUBLIC_INTERFACE
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-[#0f172a] border border-[var(--border)] rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// PUBLIC_INTERFACE
export function CardHeader({ title, subtitle, actions }) {
  return (
    <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
      <div>
        {title && <h3 className="font-semibold">{title}</h3>}
        {subtitle && <p className="text-sm text-[var(--muted)]">{subtitle}</p>}
      </div>
      <div className="flex gap-2">{actions}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function CardBody({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// PUBLIC_INTERFACE
export function CardFooter({ children, className = "" }) {
  return (
    <div className={`px-4 py-3 border-t border-[var(--border)] ${className}`}>
      {children}
    </div>
  );
}
