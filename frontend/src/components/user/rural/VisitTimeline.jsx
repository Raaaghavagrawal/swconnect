import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function VisitTimeline({ visits }) {
  const { language } = useTranslation();

  const recentVisits = visits?.slice(0, 3) || [];

  if (recentVisits.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          {language === 'hi' ? 'भेटें' : 'Recent Visits'}
        </h3>
        <p className="text-xl text-gray-600">
          {language === 'hi' ? 'कोई भेट नहीं' : 'No visits yet'}
        </p>
      </motion.div>
    );
  }

  const statusEmojis = {
    Scheduled: '📅',
    Completed: '✅',
    Cancelled: '❌',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6"
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        {language === 'hi' ? 'भेटें' : 'Recent Visits'}
      </h3>

      <div className="space-y-4">
        {recentVisits.map((visit, idx) => (
          <motion.div
            key={visit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200 hover:border-[#00A67E] transition-colors"
          >
            <div className="text-4xl sm:text-5xl flex-shrink-0">
              {statusEmojis[visit.status] || '📋'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {visit.doctor}
                </h4>
                {visit.status === 'Completed' && (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-lg sm:text-xl text-gray-700 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {visit.date}
                </p>
                <p className="text-lg sm:text-xl text-gray-700 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {visit.time}
                </p>
                <p className="text-lg sm:text-xl text-gray-700 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {visit.location}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

