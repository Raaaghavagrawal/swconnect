import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

const insights = [
  {
    type: 'positive',
    icon: TrendingUp,
    title: 'Blood Pressure',
    titleHi: 'रक्तचाप',
    message: 'Your BP is normal. Keep it up!',
    messageHi: 'आपका BP सामान्य है। इसे बनाए रखें!',
    color: 'from-green-400 to-emerald-500',
  },
  {
    type: 'warning',
    icon: AlertCircle,
    title: 'Medication Adherence',
    titleHi: 'दवा पालन',
    message: 'Take your medicine on time for better results.',
    messageHi: 'बेहतर परिणाम के लिए समय पर दवा लें।',
    color: 'from-yellow-400 to-amber-500',
  },
  {
    type: 'tip',
    icon: CheckCircle2,
    title: 'Health Tip',
    titleHi: 'स्वास्थ्य सुझाव',
    message: 'Drink more water today. You\'re doing great!',
    messageHi: 'आज और पानी पिएं। आप बहुत अच्छा कर रहे हैं!',
    color: 'from-blue-400 to-cyan-500',
  },
];

export default function AIHealthInsights() {
  const { language } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {language === 'hi' ? 'AI स्वास्थ्य अंतर्दृष्टि' : 'AI Health Insights'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`bg-gradient-to-br ${insight.color} rounded-2xl p-5 sm:p-6 shadow-xl text-white`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {language === 'hi' ? insight.titleHi : insight.title}
                </h3>
              </div>
              <p className="text-base sm:text-lg leading-relaxed">
                {language === 'hi' ? insight.messageHi : insight.message}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

