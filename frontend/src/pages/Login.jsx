import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function ensureRole(userId, selectedRole) {
    const ref = doc(db, 'userRoles', userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, { role: selectedRole, updatedAt: Date.now() });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let userCred;
      try {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        if (String(err?.code).includes('auth/user-not-found')) {
          userCred = await createUserWithEmailAndPassword(auth, email, password);
        } else {
          throw err;
        }
      }
      await ensureRole(userCred.user.uid, role);
      const roleDoc = await getDoc(doc(db, 'userRoles', userCred.user.uid));
      const effectiveRole = roleDoc.exists() ? (roleDoc.data().role || role) : role;
      if (effectiveRole === 'Doctor') navigate('/doctor');
      else if (effectiveRole === 'RMP') navigate('/official');
      else navigate('/user');
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
        <div className="hidden md:block bg-gradient-to-br from-indigo-700 to-emerald-600 p-8 text-white">
          <div className="text-2xl font-semibold">SwasthyaConnect</div>
          <p className="mt-4 text-sm text-indigo-50/90">Bridging Rural Healthcare Digitally</p>
          <div className="mt-10 space-y-3 text-sm">
            <div className="flex items-center gap-2"><span>✅</span> Offline-first & Sync</div>
            <div className="flex items-center gap-2"><span>🔐</span> Secure records</div>
            <div className="flex items-center gap-2"><span>🗺️</span> Geo insights</div>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8">
          <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
          <p className="text-slate-600 mt-1">Sign in or create an account</p>
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
              <div className="flex items-center justify-between mt-2 text-sm">
                <label className="inline-flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="rounded border-slate-300" /> Remember me
                </label>
                <button type="button" className="text-indigo-600 hover:underline">Forgot password?</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-1 grid grid-cols-3 gap-2">
                {['Doctor','User','RMP'].map(r => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-3 py-2 rounded-lg border text-sm transition-all ${role===r ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white hover:bg-slate-50'}`}
                  >{r}</button>
                ))}
              </div>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Please wait…' : 'Continue'}
            </button>
            <div className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms and Privacy Policy.
            </div>
            <div className="text-sm text-center">
              New here? <Link to="/signup" className="text-indigo-600 hover:underline">Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

