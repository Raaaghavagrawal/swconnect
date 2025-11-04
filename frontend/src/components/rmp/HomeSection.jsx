import React from 'react';

export default function HomeSection({ stats, userName, onViewPatients, onNewVisit }) {
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="relative overflow-hidden rounded-2xl p-6 text-white bg-gradient-to-r from-indigo-600 to-emerald-600 shadow-sm">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -right-20 -bottom-14 w-56 h-56 bg-white/10 rounded-full" />
        <h2 className="relative text-2xl font-bold mb-2">Hello, {userName}! 👋</h2>
        <p className="relative text-indigo-50">Welcome back to your dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Active Patients</span>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.activePatients}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Pending Visits</span>
            <span className="text-2xl">🟡</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.pendingVisits}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Reports to Send</span>
            <span className="text-2xl">📄</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.reportsToSend}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Last Sync</span>
            <span className="text-2xl">🔄</span>
          </div>
          <p className="text-sm font-medium text-slate-900">
            <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {stats.lastSync}
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onViewPatients}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          View Patients
        </button>
        <button
          onClick={onNewVisit}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
        >
          New Visit
        </button>
      </div>
    </div>
  );
}

