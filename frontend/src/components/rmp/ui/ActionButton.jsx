import React from 'react';
import { motion } from 'framer-motion';

export default function ActionButton({ label, Icon, onClick, color = 'primary', className = '' }) {
  const colorClasses = {
    primary: 'bg-[var(--color-primary)] hover:bg-emerald-600 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-[var(--color-secondary)] hover:bg-blue-700 text-white shadow-md hover:shadow-lg',
    accent: 'bg-[var(--color-accent)] hover:bg-cyan-400 text-slate-900 shadow-md hover:shadow-lg',
    ghost: 'glass-card text-slate-900 border-emerald-100 hover:border-[var(--color-primary)]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${colorClasses[color]} ${className} flex items-center justify-center gap-2`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </motion.button>
  );
}
