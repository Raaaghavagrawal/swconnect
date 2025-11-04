import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((message, options = {}) => {
    const id = ++idCounter;
    const toast = {
      id,
      message,
      type: options.type || 'info',
      duration: typeof options.duration === 'number' ? options.duration : 3000,
    };
    setToasts((prev) => [toast, ...prev]);
    if (toast.duration > 0) {
      setTimeout(() => remove(id), toast.duration);
    }
    return id;
  }, [remove]);

  const value = useMemo(() => ({ show, remove }), [show, remove]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-3 w-80 max-w-[92vw]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`glass-card border ${t.type === 'success' ? 'border-emerald-200' : t.type === 'error' ? 'border-red-200' : t.type === 'warning' ? 'border-amber-200' : 'border-emerald-100'} shadow-lg animate-in`}
            role="status"
            aria-live="polite"
          >
            <div className="p-4 flex items-start gap-3">
              <span className={`text-xl ${t.type === 'success' ? 'text-emerald-600' : t.type === 'error' ? 'text-red-600' : t.type === 'warning' ? 'text-amber-600' : 'text-[var(--color-primary)]'}`} aria-hidden>
                {t.type === 'success' ? '✅' : t.type === 'error' ? '⚠️' : t.type === 'warning' ? '🟡' : 'ℹ️'}
              </span>
              <div className="flex-1 text-sm text-[var(--color-text)]">{t.message}</div>
              <button
                onClick={() => remove(t.id)}
                className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900"
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}


