import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Volume2, VolumeX, AlertCircle, Info } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

const alerts = [
  {
    type: 'info',
    icon: '📢',
    title: 'Vaccination Camp',
    titleHi: 'टीकाकरण शिविर',
    message: 'Free vaccination camp on Jan 25 at Village Center',
    messageHi: '25 जनवरी को गांव केंद्र में निःशुल्क टीकाकरण शिविर',
    date: '2024-01-25',
  },
  {
    type: 'warning',
    icon: '⚠️',
    title: 'Dengue Alert',
    titleHi: 'डेंगू अलर्ट',
    message: 'Keep your surroundings clean. Remove standing water.',
    messageHi: 'अपने आसपास साफ रखें। खड़े पानी को हटाएं।',
    date: '2024-01-20',
  },
  {
    type: 'info',
    icon: '💉',
    title: 'Health Checkup',
    titleHi: 'स्वास्थ्य जांच',
    message: 'Free health checkup camp this Sunday',
    messageHi: 'इस रविवार निःशुल्क स्वास्थ्य जांच शिविर',
    date: '2024-01-21',
  },
];

export default function LocalHealthAlerts() {
  const { language } = useTranslation();
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled && 'speechSynthesis' in window) {
      // Read all alerts
      alerts.forEach((alert, idx) => {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(
            language === 'hi'
              ? `${alert.titleHi}. ${alert.messageHi}`
              : `${alert.title}. ${alert.message}`
          );
          utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
          utterance.rate = 0.9;
          speechSynthesis.speak(utterance);
        }, idx * 3000);
      });
    } else {
      speechSynthesis.cancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <Megaphone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {language === 'hi' ? 'स्थानीय स्वास्थ्य अलर्ट' : 'Local Health Alerts'}
          </h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleVoice}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            voiceEnabled
              ? 'bg-[#00A67E] hover:bg-[#008B6B]'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          title={language === 'hi' ? 'आवाज़ चालू/बंद करें' : 'Toggle Voice'}
        >
          {voiceEnabled ? (
            <Volume2 className="w-7 h-7 text-white" />
          ) : (
            <VolumeX className="w-7 h-7 text-gray-600" />
          )}
        </motion.button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-5 rounded-2xl border-2 ${
              alert.type === 'warning'
                ? 'bg-yellow-50 border-yellow-300'
                : 'bg-blue-50 border-blue-300'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl sm:text-5xl flex-shrink-0">{alert.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {alert.type === 'warning' ? (
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  ) : (
                    <Info className="w-6 h-6 text-blue-600" />
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {language === 'hi' ? alert.titleHi : alert.title}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-gray-700 mb-2">
                  {language === 'hi' ? alert.messageHi : alert.message}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'hi' ? 'तारीख:' : 'Date:'} {alert.date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

