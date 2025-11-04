import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, AlertCircle, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReportsTab({ reports, onReviewReport }) {
  const [filter, setFilter] = useState('All');

  const filteredReports = reports.filter((report) => {
    if (filter === 'New') return report.isNew;
    if (filter === 'Reviewed') return !report.isNew;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Patient Reports</h2>
          <span className="px-3 py-1 text-sm rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium shadow-sm">
            {reports.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {['All', 'New', 'Reviewed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                filter === f
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                  : 'glass-card text-slate-700 dark:text-slate-300 border-emerald-100 dark:border-emerald-900/30 hover:border-[var(--color-primary)] hover:shadow-sm'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <FileText className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">No reports found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report, idx) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onReviewReport && onReviewReport(report)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-[var(--color-primary)]" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{report.patientName}</h3>
                    {report.isNew && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 border border-red-300">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {report.village}
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{report.doctorFeedback || 'No feedback provided'}</p>
                </div>
                <div className="ml-4">
                  {report.isNew ? (
                    <Clock className="w-6 h-6 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
