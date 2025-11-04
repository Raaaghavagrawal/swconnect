import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, TrendingUp, Heart } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

const milestones = [
  { date: '2024-01-15', achievement: 'Completed 7 days of medication', achievementHi: '7 दिन की दवा पूरी की', icon: '🎯' },
  { date: '2024-01-10', achievement: 'Regular checkup done', achievementHi: 'नियमित जांच पूरी', icon: '✅' },
  { date: '2024-01-05', achievement: 'Started health journey', achievementHi: 'स्वास्थ्य यात्रा शुरू की', icon: '🚀' },
];

export default function HealthJourneyTracker() {
  const { language } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {language === 'hi' ? 'स्वास्थ्य यात्रा' : 'Health Journey'}
        </h2>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200"
          >
            <div className="text-4xl sm:text-5xl flex-shrink-0">{milestone.icon}</div>
            <div className="flex-1">
              <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                {language === 'hi' ? milestone.achievementHi : milestone.achievement}
              </p>
              <div className="flex items-center gap-2 text-base sm:text-lg text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{milestone.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-[#00A67E] to-[#008B6B] rounded-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-xl font-semibold mb-1">
              {language === 'hi' ? 'कुल यात्रा' : 'Total Journey'}
            </p>
            <p className="text-2xl sm:text-3xl font-bold">15 {language === 'hi' ? 'दिन' : 'days'}</p>
          </div>
          <div className="text-right">
            <p className="text-lg sm:text-xl font-semibold mb-1">
              {language === 'hi' ? 'स्वास्थ्य स्कोर' : 'Health Score'}
            </p>
            <p className="text-2xl sm:text-3xl font-bold">85%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

