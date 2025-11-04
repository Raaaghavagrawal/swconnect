import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function MedicineTracker({ medicines }) {
  const { language } = useTranslation();

  const currentMed = medicines?.find((m) => m.status === 'Active') || medicines?.[0];

  if (!currentMed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          {language === 'hi' ? 'दवा ट्रैकर' : 'Medicine Tracker'}
        </h3>
        <p className="text-xl text-gray-600">
          {language === 'hi' ? 'कोई सक्रिय दवा नहीं' : 'No active medicine'}
        </p>
      </motion.div>
    );
  }

  // Simulate daily doses (morning, afternoon, evening)
  const doses = [
    { time: language === 'hi' ? 'सुबह' : 'Morning', taken: true },
    { time: language === 'hi' ? 'दोपहर' : 'Afternoon', taken: false },
    { time: language === 'hi' ? 'शाम' : 'Evening', taken: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-[#FFD166] rounded-full flex items-center justify-center">
          <span className="text-3xl">💊</span>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {currentMed.medicineName}
          </h3>
          <p className="text-lg sm:text-xl text-gray-600">{currentMed.dosage}</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="space-y-4">
        {doses.map((dose, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-2xl ${
              dose.taken ? 'bg-green-50 border-2 border-green-400' : 'bg-gray-50 border-2 border-gray-200'
            }`}
          >
            {dose.taken ? (
              <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
            ) : (
              <Circle className="w-8 h-8 text-gray-400 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                {dose.time}
              </p>
              <p className="text-base sm:text-lg text-gray-600">
                {dose.taken
                  ? language === 'hi' ? 'लिया गया ✓' : 'Taken ✓'
                  : language === 'hi' ? 'बाकी है' : 'Pending'}
              </p>
            </div>
            {!dose.taken && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#00A67E] text-white rounded-full text-lg font-bold shadow-lg hover:bg-[#008B6B] transition-colors"
              >
                {language === 'hi' ? 'मार्क करें' : 'Mark'}
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Remaining Days */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-300">
        <p className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
          {language === 'hi' ? 'शेष दिन:' : 'Remaining Days:'} {currentMed.remainingDays || 0}
        </p>
      </div>
    </motion.div>
  );
}

