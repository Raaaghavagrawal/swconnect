import React, { useState } from 'react';
import { Calendar, Clock, User, Plus, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AppointmentsTab({ appointments, onCreateAppointment }) {
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('Clinic');
  const [reason, setReason] = useState('');

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'Upcoming') return apt.status === 'Scheduled';
    if (filter === 'Completed') return apt.status === 'Completed';
    if (filter === 'Cancelled') return apt.status === 'Cancelled';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Appointments</h2>
          <span className="px-3 py-1 text-sm rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium shadow-sm">
            {appointments.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm((v) => !v)}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            New Appointment
          </motion.button>
        </div>
      </div>

      {/* Booking Form */}
      {showForm && (
        <div className="glass-card p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Patient Name</label>
              <input value={patientName} onChange={(e)=>setPatientName(e.target.value)} className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" placeholder="e.g., Rajesh Kumar" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Date</label>
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Time</label>
                <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Location</label>
              <input value={location} onChange={(e)=>setLocation(e.target.value)} className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Reason</label>
              <input value={reason} onChange={(e)=>setReason(e.target.value)} className="mt-2 w-full border border-emerald-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" placeholder="e.g., Follow-up consultation" />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={()=>setShowForm(false)} className="px-4 py-2 rounded-lg border border-emerald-200 text-slate-700 hover:bg-slate-50">Cancel</button>
            <button
              onClick={()=>{
                if (!patientName || !date || !time) return;
                onCreateAppointment({ patientName, date, time, location, reason });
                setShowForm(false);
                setPatientName(''); setReason('');
              }}
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:brightness-110"
            >Confirm</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {['All', 'Upcoming', 'Completed', 'Cancelled'].map((f) => (
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

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <Calendar className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">No appointments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt, idx) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-5 h-5 text-[var(--color-primary)]" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{apt.patientName || 'Patient'}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {apt.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {apt.time || '10:00 AM'}
                    </div>
                    {apt.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {apt.location}
                      </div>
                    )}
                  </div>
                  {apt.reason && (
                    <p className="text-slate-700 dark:text-slate-300 text-sm">{apt.reason}</p>
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
