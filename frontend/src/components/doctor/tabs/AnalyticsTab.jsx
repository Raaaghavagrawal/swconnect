import React from 'react';
import { TrendingUp, Activity, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../../rmp/ui/StatCard';

export default function AnalyticsTab({ analyticsData, stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-[var(--color-primary)]" />
        Analytics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value={stats.totalPatients || 0} Icon={Users} tone="success" delay={0.1} />
        <StatCard title="Completed Cases" value={stats.completedCases || 0} Icon={Activity} tone="success" delay={0.15} />
        <StatCard title="Appointments" value={stats.appointments || 0} Icon={Calendar} tone="info" delay={0.2} />
        <StatCard title="Prescriptions" value={stats.prescriptions || 0} Icon={TrendingUp} tone="warning" delay={0.25} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases by Month */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Cases Overview</h3>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl h-64 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/30">
            <div className="text-center">
              <Activity className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <p className="text-slate-600 dark:text-slate-400">Chart visualization coming soon</p>
            </div>
          </div>
        </div>

        {/* Patient Distribution */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Patient Distribution</h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl h-64 flex items-center justify-center border border-blue-100 dark:border-blue-900/30">
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="text-slate-600 dark:text-slate-400">Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Trends */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Recent Trends</h3>
        <div className="space-y-3">
          {[
            { label: 'Patient consultations', value: '+12%', trend: 'up' },
            { label: 'Prescriptions issued', value: '+8%', trend: 'up' },
            { label: 'Appointments scheduled', value: '+15%', trend: 'up' },
            { label: 'Case completion rate', value: '94%', trend: 'stable' },
          ].map((trend, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-3 glass-card hover:shadow-md transition-shadow"
            >
              <span className="text-slate-700 dark:text-slate-300 font-medium">{trend.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-emerald-600">{trend.value}</span>
                {trend.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
