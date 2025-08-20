import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * UIContext centralizes app-wide UI state like theme, sidebar, and modal/toast helpers.
 */
const UIContext = createContext(null);

// PUBLIC_INTERFACE
export function useUI() {
  /** Returns UI context value with theme, toggles, modal helpers, and toasts. */
  return useContext(UIContext);
}

// PUBLIC_INTERFACE
export function UIProvider({ children }) {
  /**
   * Provides UI state and actions: theme (light/dark), sidebar open, modal, and toasts.
   * Persists theme preference in localStorage and applies data-theme attribute.
   */
  const [theme, setTheme] = useState(() => localStorage.getItem("hms_theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem("hms_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const openModal = useCallback((content) => setModal(content), []);
  const closeModal = useCallback(() => setModal(null), []);
  const showToast = useCallback((message, type = "info", timeout = 2500) => {
    const id = String(Date.now());
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, timeout);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      sidebarOpen,
      setSidebarOpen,
      modal,
      openModal,
      closeModal,
      toasts,
      showToast,
    }),
    [theme, toggleTheme, sidebarOpen, modal, toasts, showToast]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
