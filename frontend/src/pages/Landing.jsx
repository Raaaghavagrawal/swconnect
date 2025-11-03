import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Landing() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const loginItems = [
    { label: 'Doctor Login', desc: 'For medical professionals', icon: '👨‍⚕️' },
    { label: 'User (Patient) Login', desc: 'For patients and families', icon: '🧑‍🤝‍🧑' },
    { label: 'Government Official Login', desc: 'For health officials', icon: '🏛️' },
  ];

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current || !btnRef.current) return;
      if (!menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold text-lg text-indigo-700">SwasthyaConnect</div>
        <div className="relative">
          <button
            ref={btnRef}
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="group px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-block transform group-hover:scale-105 transition-transform">Login</span>
              <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
            </span>
          </button>
          <div
            ref={menuRef}
            className={`absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border overflow-hidden transition-all duration-200 origin-top-right z-50 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
          >
            {loginItems.map((it) => (
              <button
                key={it.label}
                onClick={() => { setOpen(false); navigate('/login'); }}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-start gap-3 group"
              >
                <span className="text-xl" aria-hidden>{it.icon}</span>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {it.label}
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">new</span>
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-700">{it.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 items-center gap-10 relative z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 tracking-tight">
            SwasthyaConnect — Bridging Rural Healthcare Digitally.
          </h1>
          <p className="mt-5 text-lg md:text-xl text-slate-600">
            Connect Patients, Doctors, and Officials — Anytime, Anywhere.
          </p>
          <div className="mt-10 flex gap-3">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="relative z-0">
          <div className="h-64 md:h-96 rounded-3xl bg-gradient-to-tr from-indigo-100 via-white to-emerald-100 shadow-inner" />
          <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur border rounded-xl shadow p-4 text-sm z-0 text-slate-600">
            Offline-first • Multilingual • Secure
          </div>
        </div>
      </header>

      <footer className="mt-10 border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-slate-500">
          © {new Date().getFullYear()} SwasthyaConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

