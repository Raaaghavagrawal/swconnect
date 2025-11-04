import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '../contexts/ToastContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { show } = useToast();
  const location = useLocation();
  const displayRole = role === 'User' ? 'Patient' : role;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // Initialize from navigation state (not persisted on refresh). Default to Patient.
    const navRole = location.state?.role;
    if (navRole === 'Doctor' || navRole === 'RMP' || navRole === 'User') {
      setRole(navRole);
    } else {
      setRole('User');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current || !btnRef.current) return;
      if (!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'userRoles', cred.user.uid), { role, createdAt: Date.now() });
      show('Account created. Please log in.', { type: 'success' });
      navigate('/login');
    } catch (err) {
      setError(err?.message || 'Signup failed');
      show(err?.message || 'Signup failed', { type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg)' }}>
      {/* Home button */
      }
      <div className="absolute top-4 left-4">
        <Link to="/" className="px-4 py-2 rounded-lg glass-card text-[var(--color-text)] hover:shadow-md transition">
          Home
        </Link>
      </div>
      {/* Selected role badge (synced) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <span className="px-3 py-1 rounded-full glass-card text-xs text-[var(--color-text)]">
          Role: {role === 'User' ? 'Patient' : role}
        </span>
      </div>
      {/* Other signups dropdown */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            ref={btnRef}
            onClick={() => setMenuOpen((v) => !v)}
            className="px-4 py-2 rounded-lg glass-card text-[var(--color-text)] hover:shadow-md transition"
          >
            Other signups
          </button>
          <div
            ref={menuRef}
            className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border overflow-hidden transition-all duration-200 origin-top-right z-50 ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
          >
            <button
              onClick={() => { setRole('Doctor'); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-slate-700"
            >
              Doctor Signup
            </button>
            <button
              onClick={() => { setRole('RMP'); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-slate-700 border-t"
            >
              RMP Signup
            </button>
            <button
              onClick={() => { setRole('User'); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-slate-700 border-t"
            >
              Patient Signup
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Brand / Benefits */}
          <div className="hidden lg:block">
            <div className="relative overflow-hidden rounded-3xl p-10 text-white bg-gradient-to-r from-[var(--color-primary)] to-emerald-600 shadow-xl">
              <div className="absolute -right-12 -top-12 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -right-20 -bottom-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h1 className="text-4xl font-extrabold tracking-tight">SwasthyaConnect</h1>
                <p className="mt-3 text-emerald-50 text-lg">Create your account</p>
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  {[
                    ['✅', 'Offline-first & Sync'],
                    ['🔐', 'Secure records'],
                    ['🗺️', 'Geo insights'],
                    ['🌐', 'Multilingual UI'],
                  ].map(([icon, label]) => (
                    <div key={label} className="glass-card bg-white/10 border-white/20 text-white">
                      <div className="p-4 flex items-center gap-3">
                        <span className="text-xl" aria-hidden>{icon}</span>
                        <span className="font-medium">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[var(--color-text)]">{displayRole} Signup</h2>
              <p className="text-slate-600 mt-1">Create your {displayRole.toLowerCase()} account</p>
              <div className="mt-1 text-xs text-slate-500">Current role: {displayRole}. Use the "Other signups" menu at the top-right to switch.</div>
            </div>
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">Email</label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-emerald-100 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-[var(--color-text)]"
                    placeholder="you@example.com"
                  />
                  <span className="absolute left-3 top-2.5 text-slate-400">@</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">Password</label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-emerald-100 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-[var(--color-text)]"
                    placeholder="••••••••"
                  />
                  <span className="absolute left-3 top-2.5 text-slate-400">🔒</span>
                </div>
              </div>
              {/* Role defaults to User; other roles via dropdown; current: */}
              <div className="text-xs text-slate-500">Selected role: <span className="font-medium text-slate-700">{role}</span></div>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:brightness-110 transition-colors disabled:opacity-60"
              >
                {loading ? 'Creating…' : 'Create account'}
              </button>
              <div className="text-sm text-center">
                Already have an account? <Link to="/login" className="text-[var(--color-secondary)] hover:underline">Log in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

