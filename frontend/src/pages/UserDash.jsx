import React from 'react';

export default function UserDash() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Your Health</h1>
        <p className="text-slate-600 mt-2">Medications, visits, and prescriptions.</p>
        <div className="mt-6 rounded-xl border bg-white p-4">No prescriptions yet.</div>
      </div>
    </div>
  );
}

