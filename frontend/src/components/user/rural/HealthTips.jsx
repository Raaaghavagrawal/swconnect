import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';

const tips = [
  {
    emoji: '💧',
    title: 'Drink Water',
    titleHi: 'पानी पिएं',
    description: 'Drink 8-10 glasses daily',
    descriptionHi: 'रोजाना 8-10 गिलास पानी पिएं',
  },
  {
    emoji: '🧘',
    title: 'Exercise Daily',
    titleHi: 'रोजाना व्यायाम',
    description: '30 minutes of walking helps',
    descriptionHi: '30 मिनट की चलना मदद करता है',
  },
  {
    emoji: '😴',
    title: 'Sleep Well',
    titleHi: 'अच्छी नींद',
    description: 'Sleep 7-8 hours daily',
    descriptionHi: 'रोजाना 7-8 घंटे सोएं',
  },
  {
    emoji: '🥗',
    title: 'Eat Healthy',
    titleHi: 'स्वस्थ खाएं',
    description: 'Fresh fruits and vegetables',
    descriptionHi: 'ताजे फल और सब्जियां',
  },
];

export default function HealthTips() {
  const { language } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        {language === 'hi' ? 'स्वास्थ्य सुझाव' : 'Health Tips'}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {tips.map((tip, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-br from-[#FFD166] to-[#FFC947] rounded-2xl p-4 sm:p-6 shadow-lg"
          >
            <div className="text-4xl sm:text-5xl mb-3">{tip.emoji}</div>
            <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {language === 'hi' ? tip.titleHi : tip.title}
            </h4>
            <p className="text-base sm:text-lg text-gray-700">
              {language === 'hi' ? tip.descriptionHi : tip.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

