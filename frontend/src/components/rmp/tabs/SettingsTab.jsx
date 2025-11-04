import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Globe, RefreshCw, LogOut, Save } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from '../../../hooks/useTranslation';
import { languageOptions } from '../../../data/translations';

export default function SettingsTab({ profile, onUpdateProfile, onSync }) {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: profile.name || '',
    area: profile.area || '',
    phone: profile.phone || '',
    email: profile.email || '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    onUpdateProfile({ ...formData, language: languageOptions.find((l) => l.code === langCode)?.name || 'English' });
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
    <div className="space-y-6 animate-in">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
        <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        {t('settings.title')}
      </h2>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-green-100 dark:border-emerald-900/30 p-6 space-y-6 shadow-sm">
        {/* Profile Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {t('settings.profileInfo')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('settings.name')}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-green-200 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder={t('settings.enterName')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {t('settings.area')}
              </label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                className="w-full px-3 py-2 border border-green-200 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder={t('settings.enterArea')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('settings.phone')}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-green-200 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder={t('settings.enterPhone')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('settings.email')}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-green-200 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder={t('settings.enterEmail')}
              />
            </div>
          </div>
        </section>

        {/* Language Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {t('settings.language')}
          </h3>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full px-3 py-2 border border-green-200 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </section>

        {/* Sync Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            {t('settings.dataSync')}
          </h3>
          <button
            onClick={onSync}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {t('settings.manualSync')}
          </button>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {t('settings.syncAllData')}
          </p>
        </section>

        {/* Actions */}
        <div className="pt-6 border-t border-green-200 dark:border-emerald-900/30 space-y-3">
          <button
            onClick={handleSave}
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {t('settings.saveChanges')}
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

