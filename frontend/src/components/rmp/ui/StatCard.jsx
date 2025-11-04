import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, Icon, tone = 'primary', delay = 0 }) {
  const toneClasses = {
    primary: 'text-[var(--color-primary)]',
    success: 'text-emerald-600',
    info: 'text-[var(--color-secondary)]',
    warning: 'text-amber-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-card p-5 cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{title}</span>
        {Icon && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
          >
            <Icon className={`w-5 h-5 ${toneClasses[tone] || toneClasses.primary} group-hover:scale-110 transition-transform`} />
          </motion.div>
        )}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="text-3xl font-bold text-slate-900 dark:text-slate-100"
      >
        {value}
      </motion.p>
    </motion.div>
  );
}
