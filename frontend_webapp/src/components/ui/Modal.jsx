import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

/**
 * Accessible modal dialog with framer-motion animations.
 */
// PUBLIC_INTERFACE
export default function Modal({ open, title, onClose, children, actions }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            className="relative bg-white dark:bg-[#0f172a] rounded-xl border border-[var(--border)] w-[95vw] max-w-lg shadow-xl"
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="font-semibold">{title}</h3>
              <Button variant="ghost" onClick={onClose} aria-label="Close modal">
                ✕
              </Button>
            </div>
            <div className="p-4">{children}</div>
            {actions && <div className="px-4 py-3 border-t border-[var(--border)]">{actions}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
