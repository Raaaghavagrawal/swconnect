import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '../contexts/ToastContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function RMPLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('RMP');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { show } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

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

      // Enforce RMP-only login on this page
      if (effectiveRole !== 'RMP') {
        show('This portal is for RMPs only. Please use the correct login page for your role.', { type: 'error' });
        await signOut(auth);
        return;
      }

      show('Welcome back!', { type: 'success' });
      navigate('/official');
    } catch (err) {
      setError(err?.message || 'Login failed');
      show(err?.message || 'Login failed', { type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg)' }}>
      {/* Home button */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="px-4 py-2 rounded-lg glass-card text-[var(--color-text)] hover:shadow-md transition">
          Home
        </Link>
      </div>
      {/* Selected role badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <span className="px-3 py-1 rounded-full glass-card text-xs text-[var(--color-text)]">
          Role: RMP
        </span>
      </div>
      {/* Other logins dropdown */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            ref={btnRef}
            onClick={() => setMenuOpen((v) => !v)}
            className="px-4 py-2 rounded-lg glass-card text-[var(--color-text)] hover:shadow-md transition"
          >
            Other logins
          </button>
          <div
            ref={menuRef}
            className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border overflow-hidden transition-all duration-200 origin-top-right z-50 ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
          >
            <button
              onClick={() => { setMenuOpen(false); navigate('/login'); }}
              className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-slate-700"
            >
              Patient Login
            </button>
            <button
              onClick={() => { setMenuOpen(false); navigate('/doctor-login'); }}
              className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-slate-700 border-t"
            >
              Doctor Login
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
                <p className="mt-3 text-emerald-50 text-lg">RMP Portal</p>
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  {[
                    ['🏛️', 'Patient Visits'],
                    ['📝', 'Reports'],
                    ['💊', 'PharmaConnect'],
                    ['📊', 'Analytics'],
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
              <h2 className="text-2xl font-semibold text-[var(--color-text)]">RMP Login</h2>
              <p className="text-slate-600 mt-1">Sign in to your RMP account</p>
              <div className="mt-1 text-xs text-slate-500">For patients and doctors, use the "Other logins" menu at the top-right.</div>
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
                    placeholder="rmp@example.com"
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
                <div className="flex items-center justify-between mt-2 text-sm">
                  <label className="inline-flex items-center gap-2 text-slate-600">
                    <input type="checkbox" className="rounded border-slate-300" /> Remember me
                  </label>
                  <button type="button" className="text-[var(--color-secondary)] hover:underline">Forgot password?</button>
                </div>
              </div>
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
                {loading ? 'Please wait…' : 'Continue'}
              </button>
              <div className="text-xs text-slate-500 text-center">
                By continuing, you agree to our Terms and Privacy Policy.
              </div>
              <div className="text-sm text-center">
                New here? <Link to="/signup" state={{ role: 'RMP' }} className="text-[var(--color-secondary)] hover:underline">Create an RMP account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

