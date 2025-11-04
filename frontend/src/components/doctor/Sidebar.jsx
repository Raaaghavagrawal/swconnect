import React from 'react';
import { LayoutDashboard, Users, FileText, Calendar, MessageSquare, Pill, BarChart3, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeSection, onSectionChange, isMobile, isOpen, onClose }) {
  const handleClick = (sectionId) => {
    onSectionChange(sectionId);
    if (isMobile) {
      onClose();
    }
  };

  const sidebarContent = (
    <motion.div
      initial={isMobile ? { x: '-100%' } : false}
      animate={isMobile ? { x: isOpen ? 0 : '-100%' } : false}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={`${isMobile ? 'fixed inset-y-0 left-0 z-50 w-72 glass-card border-r border-emerald-100 dark:border-emerald-900/30' : 'w-64 glass-card border-r border-emerald-100 dark:border-emerald-900/30'} ${isMobile ? '' : ''}`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-emerald-100 dark:border-emerald-900/30">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Menu</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto" role="navigation" aria-label="Doctor sections">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all relative ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-white shadow-lg'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 glass-card'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[var(--color-primary)]'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-200 rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
    </motion.div>
  );

  // Mobile bottom navbar
  if (isMobile) {
    return (
      <>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="fixed bottom-0 left-0 right-0 glass-card border-t border-emerald-100 dark:border-emerald-900/30 z-50 md:hidden shadow-2xl"
        >
          <div className="flex justify-around items-center h-16 overflow-x-auto no-scrollbar px-2 gap-2">
            {menuItems.slice(0, 5).map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleClick(item.id)}
                  className={`shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobileIndicator"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-primary)]"
                      transition={{ type: 'spring', stiffness: 300 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        {sidebarContent}
      </>
    );
  }

  // Desktop sidebar
  return sidebarContent;
}
