import React, { useState } from 'react';
import { Pill, Search, Clock, CheckCircle2, AlertCircle, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig = {
  Active: { icon: Clock, color: 'emerald', bg: 'bg-emerald-50 dark:bg-emerald-900/30', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-800 dark:text-emerald-300' },
  Completed: { icon: CheckCircle2, color: 'blue', bg: 'bg-blue-50 dark:bg-blue-900/30', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-800 dark:text-blue-300' },
  Expired: { icon: AlertCircle, color: 'red', bg: 'bg-red-50 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800', text: 'text-red-800 dark:text-red-300' },
};

export default function PrescriptionsTab({ prescriptions, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPrescriptions = prescriptions?.filter((pres) => {
    const matchesSearch = pres.medicineName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || pres.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-emerald-600 flex items-center justify-center shadow-lg">
            <Pill className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Prescriptions</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Track your medications</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search medications..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchQuery(searchText.trim());
              }
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            type="button"
            onClick={() => setSearchQuery(searchText.trim())}
            aria-label="Search"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full min-w-0 pb-1">
          {['All', 'Active', 'Completed', 'Expired'].map((s) => (
            <motion.button
              key={s}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition whitespace-nowrap ${
                statusFilter === s
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                  : 'glass-card text-slate-700 dark:text-slate-300 border-emerald-100 dark:border-emerald-900/30 hover:border-[var(--color-primary)] hover:shadow-sm'
              }`}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Prescriptions List */}
      <AnimatePresence mode="wait">
        {filteredPrescriptions.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-16 glass-card"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Pill className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            </motion.div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">No prescriptions found</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrescriptions.map((prescription, idx) => {
              const statusInfo = statusConfig[prescription.status] || statusConfig.Active;
              const StatusIcon = statusInfo.icon;
              return (
                <motion.div
                  key={prescription.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="glass-card p-5 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg mb-2">
                        {prescription.medicineName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                        <User className="w-4 h-4" />
                        <span>{prescription.prescribedBy}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.bg} ${statusInfo.border} border shadow-sm`}>
                      <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                      <span className={`text-xs font-medium ${statusInfo.text}`}>{prescription.status}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Dosage:</span>
                      <span className="text-slate-900 dark:text-slate-100">{prescription.dosage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Duration:</span>
                      <span className="text-slate-900 dark:text-slate-100">{prescription.duration}</span>
                    </div>
                    {prescription.status === 'Active' && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[var(--color-primary)]" />
                        <span className="text-slate-600 dark:text-slate-400">
                          {prescription.remainingDays} days remaining
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {prescription.startDate} - {prescription.endDate}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

