import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Calendar } from 'lucide-react';

const statusColors = {
  Pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
  Completed: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
  Referred: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700',
};

export default function PatientCard({ patient, onVisitClick, onViewReport }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-card p-5 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 flex items-center justify-center text-white text-xl font-semibold flex-shrink-0 shadow-md"
        >
          {patient.name?.charAt(0) || 'P'}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                {patient.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {patient.age} years
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {patient.village}
                </span>
              </div>
              {patient.phone && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {patient.phone}
                </p>
              )}
              {patient.lastVisit && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Last visit: {patient.lastVisit}
                </p>
              )}
            </div>
            <motion.span
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-1 text-xs font-medium rounded-full border flex-shrink-0 shadow-sm ${
                statusColors[patient.status] || statusColors.Pending
              }`}
            >
              {patient.status}
            </motion.span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onVisitClick(patient)}
              className="px-4 py-2 text-sm font-medium bg-[var(--color-primary)] text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg flex-1"
            >
              Visit Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewReport(patient)}
              className="px-4 py-2 text-sm font-medium glass-card text-slate-700 dark:text-slate-300 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors border border-emerald-100 dark:border-emerald-900/30"
            >
              View Report
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
