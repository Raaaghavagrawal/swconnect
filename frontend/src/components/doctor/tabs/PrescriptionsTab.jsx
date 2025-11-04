import React, { useState } from 'react';
import { Pill, Plus, User, Calendar, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrescriptionsTab({ prescriptions, onCreatePrescription }) {
  const [filter, setFilter] = useState('All');

  const filteredPrescriptions = prescriptions.filter((pres) => {
    if (filter === 'Active') return pres.status === 'Active';
    if (filter === 'Completed') return pres.status === 'Completed';
    if (filter === 'Expired') return pres.status === 'Expired';
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Prescriptions</h2>
          <span className="px-3 py-1 text-sm rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium shadow-sm">
            {prescriptions.length}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCreatePrescription}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          New Prescription
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {['All', 'Active', 'Completed', 'Expired'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition whitespace-nowrap ${
              filter === f
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                : 'glass-card text-slate-700 dark:text-slate-300 border-emerald-100 dark:border-emerald-900/30 hover:border-[var(--color-primary)] hover:shadow-sm'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Prescriptions List */}
      {filteredPrescriptions.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <Pill className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">No prescriptions found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPrescriptions.map((pres, idx) => (
            <motion.div
              key={pres.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Pill className="w-5 h-5 text-[var(--color-primary)]" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{pres.patientName || 'Patient'}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${
                      pres.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      pres.status === 'Completed' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                      'bg-red-100 text-red-800 border-red-300'
                    }`}>
                      {pres.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {pres.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {pres.medicines?.length || 0} medicines
                    </div>
                  </div>
                  {pres.medicines && pres.medicines.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Medicines:</p>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                        {pres.medicines.slice(0, 3).map((med, i) => (
                          <li key={i}>{med.name} - {med.dosage}</li>
                        ))}
                        {pres.medicines.length > 3 && <li className="text-slate-500">+{pres.medicines.length - 3} more</li>}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <FileText className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
