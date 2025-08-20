import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './modules/auth/AuthContext';
import { UIProvider, useUI } from './modules/ui/UIContext';
import AppRouter from './router/AppRouter';
import { AnimatePresence, motion } from 'framer-motion';

function Toasts() {
  const { toasts } = useUI();
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="px-3 py-2 rounded-lg shadow border border-[var(--border)] bg-white dark:bg-[#0f172a]"
          >
            <div className="text-sm">{t.message}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function AppRoot() {
  return (
    <UIProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
          <Toasts />
        </BrowserRouter>
      </AuthProvider>
    </UIProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);
