import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'userRoles', cred.user.uid), { role, createdAt: Date.now() });
      alert('Account created. Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
        <div className="hidden md:block bg-gradient-to-br from-indigo-700 to-emerald-600 p-8 text-white">
          <div className="text-2xl font-semibold">SwasthyaConnect</div>
          <p className="mt-4 text-sm text-indigo-50/90">Create your account</p>
          <div className="mt-10 space-y-3 text-sm">
            <div className="flex items-center gap-2"><span>✅</span> Offline-first & Sync</div>
            <div className="flex items-center gap-2"><span>🔐</span> Secure records</div>
            <div className="flex items-center gap-2"><span>🗺️</span> Geo insights</div>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8">
          <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
          <p className="text-slate-600 mt-1">Join SwasthyaConnect</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="you@example.com"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">@</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="••••••••"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option>Doctor</option>
                <option>User</option>
                <option>Official</option>
              </select>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Creating…' : 'Create account'}
            </button>
            <div className="text-sm text-center">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

