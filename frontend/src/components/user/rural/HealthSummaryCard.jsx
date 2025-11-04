import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function HealthSummaryCard({ stats }) {
  const { language } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#00A67E] to-[#008B6B] rounded-3xl p-6 sm:p-8 shadow-xl text-white mb-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold">
          {language === 'hi' ? 'स्वास्थ्य सारांश' : 'Health Summary'}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/20 rounded-2xl p-5 sm:p-6 backdrop-blur-sm" role="region" aria-label={language === 'hi' ? 'सक्रिय दवा' : 'Active Medicine'}>
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-xl sm:text-2xl font-semibold">
              {language === 'hi' ? 'सक्रिय दवा' : 'Active Medicine'}
            </span>
          </div>
          <p className="text-4xl sm:text-5xl font-bold" aria-label={`${stats?.activeMedicines || 0} ${language === 'hi' ? 'सक्रिय दवाएं' : 'active medicines'}`}>
            {stats?.activeMedicines || 0}
          </p>
        </div>

        <div className="bg-white/20 rounded-2xl p-5 sm:p-6 backdrop-blur-sm" role="region" aria-label={language === 'hi' ? 'अगली भेट' : 'Next Visit'}>
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-xl sm:text-2xl font-semibold">
              {language === 'hi' ? 'अगली भेट' : 'Next Visit'}
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-bold" aria-label={language === 'hi' ? `अगली भेट ${stats?.nextVisit || 'कोई नहीं'}` : `Next visit ${stats?.nextVisit || 'None'}`}>
            {stats?.nextVisit || (language === 'hi' ? 'कोई नहीं' : 'None')}
          </p>
        </div>

        <div className="bg-white/20 rounded-2xl p-5 sm:p-6 backdrop-blur-sm" role="region" aria-label={language === 'hi' ? 'स्वास्थ्य स्थिति' : 'Health Status'}>
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-xl sm:text-2xl font-semibold">
              {language === 'hi' ? 'स्वास्थ्य स्थिति' : 'Health Status'}
            </span>
          </div>
          <p className="text-3xl sm:text-4xl font-bold" aria-label={language === 'hi' ? 'स्वास्थ्य स्थिति अच्छा' : 'Health status good'}>
            {language === 'hi' ? 'अच्छा' : 'Good'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

