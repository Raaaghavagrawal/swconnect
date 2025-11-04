import React from 'react';
import { Users, Calendar, FileText, RefreshCw, MapPin, Activity, TrendingUp, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../../rmp/ui/StatCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function DashboardTab({ stats, onNavigate }) {
  const quickActions = [
    { label: 'View Patients', icon: Users, action: () => onNavigate('patients') },
    { label: 'New Report', icon: FileText, action: () => onNavigate('reports') },
    { label: 'Appointments', icon: Calendar, action: () => onNavigate('appointments') },
    { label: 'Prescriptions', icon: Stethoscope, action: () => onNavigate('prescriptions') },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl p-8 text-white bg-gradient-to-r from-[var(--color-primary)] to-emerald-600 dark:from-emerald-700 dark:to-emerald-800 shadow-xl"
      >
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -right-20 -bottom-14 w-56 h-56 bg-white/10 rounded-full blur-xl" />
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-2"
          >
            Welcome back, Doctor! 👨‍⚕️
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-emerald-50 text-lg"
          >
            Here's your healthcare overview and patient management dashboard
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard title="Total Patients" value={stats.totalPatients || 0} Icon={Users} tone="success" delay={0.1} />
        <StatCard title="Pending Cases" value={stats.pendingCases || 0} Icon={Calendar} tone="warning" delay={0.15} />
        <StatCard title="Reports to Review" value={stats.reportsToReview || 0} Icon={FileText} tone="info" delay={0.2} />
        <StatCard
          title="Last Sync"
          value={
            <span className="text-sm">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {stats.lastSync || 'Just now'}
              </span>
            </span>
          }
          Icon={RefreshCw}
          tone="success"
          delay={0.25}
        />
      </motion.div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[var(--color-primary)]" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={action.action}
                    className="w-full p-4 rounded-xl glass-card hover:shadow-lg transition-all text-left group border-emerald-100 dark:border-emerald-900/30 hover:border-[var(--color-primary)]"
                  >
                    <Icon className="w-6 h-6 mb-2 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{action.label}</p>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { action: 'Reviewed case for Priya Sharma', time: '1 hour ago', type: 'success' },
              { action: 'New report submitted for Rajesh Kumar', time: '3 hours ago', type: 'info' },
              { action: 'Prescription issued for Amit Patel', time: '5 hours ago', type: 'info' },
              { action: 'Appointment scheduled for Sunita Devi', time: '1 day ago', type: 'info' },
            ].map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-3 p-4 glass-card hover:shadow-md transition-shadow"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${activity.type === 'success' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-blue-500 shadow-lg shadow-blue-500/50'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{activity.action}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
