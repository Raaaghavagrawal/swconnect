import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import ConfirmDialog from '../common/ConfirmDialog';

export default function Header({ userName = 'Rakesh', onMenuClick }) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(true);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 25 }}
      className="glass-card border-b border-emerald-100 dark:border-emerald-900/30 sticky top-0 z-40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onMenuClick}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-emerald-100 dark:border-emerald-900/30 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 glass-card"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              SwasthyaConnect <span className="text-[var(--color-primary)]">| RMP Dashboard</span>
            </motion.h1>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-medium shadow-md">
                {userName?.charAt(0) || 'R'}
              </div>
              <span className="hidden sm:block text-sm text-slate-700 dark:text-slate-300 truncate max-w-[120px] font-medium">{userName}</span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors glass-card border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-2"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors glass-card border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={showLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        onCancel={() => setShowLogout(false)}
        onConfirm={() => { setShowLogout(false); navigate('/login'); }}
      />
    </motion.header>
  );
}
