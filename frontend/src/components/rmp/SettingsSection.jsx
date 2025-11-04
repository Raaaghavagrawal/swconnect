import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsSection({ profile, onUpdateProfile, onSync }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: profile.name || '',
    area: profile.area || '',
    language: profile.language || 'English',
  });

  const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam'];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/login');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Settings</h2>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
        {/* Profile Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Area</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your area"
              />
            </div>
          </div>
        </section>

        {/* Language Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Language</h3>
          <select
            value={formData.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </section>

        {/* Sync Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Data Sync</h3>
          <button
            onClick={onSync}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <span>🔄</span> Manual Sync
          </button>
          <p className="mt-2 text-sm text-slate-600">
            Sync all offline data to the server
          </p>
        </section>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-200 space-y-3">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

