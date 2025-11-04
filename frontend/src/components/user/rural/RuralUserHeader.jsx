import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Globe2, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from '../../../hooks/useTranslation';

export default function RuralUserHeader({ userName = 'User' }) {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/login');
    }
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-[#00A67E] shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Title */}
          <div className="flex items-center gap-4">
            {/* Advanced Dashboard Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/user/advanced')}
              className="px-4 py-2 bg-white/20 text-white rounded-full text-base sm:text-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
              title="Switch to Advanced Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="hidden sm:inline">Advanced</span>
            </motion.button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              SwasthyaConnect
            </h1>
          </div>

          {/* Language Toggle & Logout */}
          <div className="flex items-center gap-4">
            {/* Large Language Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="px-6 py-3 bg-white rounded-full shadow-lg flex items-center gap-3 hover:bg-yellow-50 transition-colors"
            >
              <Globe2 className="w-6 h-6 text-[#00A67E]" />
              <span className="text-lg sm:text-xl font-bold text-[#00A67E]">
                {language === 'en' ? 'English' : 'हिंदी'}
              </span>
            </motion.button>

            {/* Logout */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 text-white rounded-full text-base sm:text-lg font-medium hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">{t('common.logout')}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

