import React, { useState } from 'react';
import { Calendar, Plus, Search, Clock, MapPin, User, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig = {
  Scheduled: { icon: Clock, color: 'yellow', bg: 'bg-yellow-50 dark:bg-yellow-900/30', border: 'border-yellow-200 dark:border-yellow-800', text: 'text-yellow-800 dark:text-yellow-300' },
  Completed: { icon: CheckCircle2, color: 'emerald', bg: 'bg-emerald-50 dark:bg-emerald-900/30', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-800 dark:text-emerald-300' },
  Cancelled: { icon: XCircle, color: 'red', bg: 'bg-red-50 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800', text: 'text-red-800 dark:text-red-300' },
};

export default function AppointmentsTab({ appointments, onCreateAppointment }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [providerType, setProviderType] = useState('Doctor');
  const [providerName, setProviderName] = useState('');
  const [visitType, setVisitType] = useState('General Checkup');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('Clinic');

  const filteredAppointments = appointments?.filter((apt) => {
    const matchesSearch = apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) || apt.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
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
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Appointments</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Schedule and manage appointments</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Book Appointment
        </motion.button>
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
            placeholder="Search by doctor or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Scheduled', 'Completed', 'Cancelled'].map((s) => (
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

      {/* Booking Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">Provider</label>
                <div className="mt-2 flex gap-2">
                  {['Doctor','RMP'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setProviderType(t)}
                      className={`px-3 py-2 rounded-lg border text-sm ${providerType===t ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white border-emerald-100 hover:bg-slate-50 text-[var(--color-text)]'}`}
                    >{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">{providerType} Name</label>
                <input
                  type="text"
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
                  placeholder={providerType==='Doctor' ? 'e.g., Dr. Arjun Mehta' : 'e.g., RMP Suresh Kumar'}
                  className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-[var(--color-text)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">Visit Type</label>
                <select
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value)}
                  className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-[var(--color-text)]"
                >
                  {['General Checkup','Follow Up','Prescription Refill','Teleconsultation'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)]">Date</label>
                  <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-[var(--color-text)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)]">Time</label>
                  <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-[var(--color-text)]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">Location</label>
                <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-[var(--color-text)]" />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border border-emerald-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!providerName || !date || !time) return;
                  onCreateAppointment({
                    via: providerType,
                    doctor: providerName,
                    type: visitType,
                    date,
                    time,
                    location,
                  });
                  setShowForm(false);
                  setProviderName('');
                }}
                className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:brightness-110"
              >
                Confirm Booking
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appointments List */}
      <AnimatePresence mode="wait">
        {filteredAppointments.length === 0 ? (
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
              <Calendar className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            </motion.div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">No appointments found</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Click "Book Appointment" to schedule one</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment, idx) => {
              const statusInfo = statusConfig[appointment.status] || statusConfig.Scheduled;
              const StatusIcon = statusInfo.icon;
              return (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="glass-card p-5 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-[var(--color-primary)]" />
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                          {appointment.doctor}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{appointment.type}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {appointment.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {appointment.location}
                        </span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.bg} ${statusInfo.border} border shadow-sm`}>
                      <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                      <span className={`text-xs font-medium ${statusInfo.text}`}>{appointment.status}</span>
                    </div>
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

