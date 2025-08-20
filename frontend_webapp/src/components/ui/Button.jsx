import React from "react";
import { motion } from "framer-motion";

/**
 * Reusable Button component with variants and sizes.
 */
// PUBLIC_INTERFACE
export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };
  const variants = {
    primary:
      "bg-primary text-white hover:bg-blue-600 focus:ring-blue-500 ring-offset-[var(--bg)]",
    ghost:
      "bg-transparent border border-[var(--border)] text-[var(--text)] hover:bg-gray-50/60 dark:hover:bg-white/5 ring-offset-[var(--bg)]",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ring-offset-[var(--bg)]",
    secondary:
      "bg-secondary text-white hover:bg-gray-600 focus:ring-gray-500 ring-offset-[var(--bg)]",
  };
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
