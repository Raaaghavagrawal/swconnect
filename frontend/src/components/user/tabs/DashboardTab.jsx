import React from 'react';
import { Pill, Calendar, MessageSquare, FileText, Heart, Activity, Clock, CheckCircle2 } from 'lucide-react';
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

export default function UserDashboardTab({ stats, prescriptions, appointments, messages, onNavigate }) {
  const upcomingAppointment = appointments?.find((apt) => apt.status === 'Scheduled');
  const activePrescription = prescriptions?.find((pres) => pres.status === 'Active');

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
            Welcome back! 👋
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-emerald-50"
          >
            Here's your health overview
          </motion.p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Prescriptions"
          value={stats?.activePrescriptions || 0}
          Icon={Pill}
          tone="success"
          delay={0.02}
        />
        <StatCard
          title="Upcoming Appointments"
          value={stats?.upcomingAppointments || 0}
          Icon={Calendar}
          tone="warning"
          delay={0.06}
        />
        <StatCard
          title="Unread Messages"
          value={stats?.unreadMessages || 0}
          Icon={MessageSquare}
          tone="info"
          delay={0.1}
        />
        <StatCard
          title="Last Visit"
          value={stats?.lastVisit || 'N/A'}
          Icon={FileText}
          tone="accent"
          delay={0.14}
        />
      </div>

      {/* Quick Actions & Upcoming */}
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
            {[
              { label: 'Book Appointment', icon: Calendar, action: () => onNavigate('appointments'), color: 'primary' },
              { label: 'View Prescriptions', icon: Pill, action: () => onNavigate('prescriptions'), color: 'secondary' },
              { label: 'My Reports', icon: FileText, action: () => onNavigate('reports'), color: 'accent' },
              { label: 'Messages', icon: MessageSquare, action: () => onNavigate('messages'), color: 'primary' },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx + 0.25 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.action}
                    className="w-full p-4 rounded-xl glass-card hover:shadow-lg transition-all text-left group border-emerald-100 dark:border-emerald-900/30 hover:border-[var(--color-primary)]"
                  >
                    <Icon className="w-6 h-6 mb-2 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{action.label}</p>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Appointment */}
        {upcomingAppointment && (
          <motion.div
            variants={itemVariants}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
              Next Appointment
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">{upcomingAppointment.doctor}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{upcomingAppointment.type}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700">
                    {upcomingAppointment.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mt-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {upcomingAppointment.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {upcomingAppointment.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">{upcomingAppointment.location}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Medication */}
        {activePrescription && (
          <motion.div
            variants={itemVariants}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-[var(--color-primary)]" />
              Current Medication
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">{activePrescription.medicineName}</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    {activePrescription.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{activePrescription.dosage}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                  <span>Duration: {activePrescription.duration}</span>
                  <span>Remaining: {activePrescription.remainingDays} days</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[var(--color-primary)]" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {[
            { action: 'Prescription refilled - Paracetamol', time: '2 hours ago', type: 'success' },
            { action: 'Appointment booked with Dr. Anjali Mehta', time: '1 day ago', type: 'info' },
            { action: 'Test results uploaded', time: '2 days ago', type: 'info' },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * idx + 0.45 }}
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
    </motion.div>
  );
}

