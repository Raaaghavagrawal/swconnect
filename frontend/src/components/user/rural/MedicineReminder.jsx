import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Pill, X, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function MedicineReminder({ medicines }) {
  const { language } = useTranslation();
  const [showReminder, setShowReminder] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);

  useEffect(() => {
    // Simulate medicine reminder (every 2 minutes for demo)
    const interval = setInterval(() => {
      const activeMed = medicines?.find((m) => m.status === 'Active');
      if (activeMed) {
        const now = new Date();
        const hour = now.getHours();
        
        // Check if it's time for medicine (morning: 8-9, afternoon: 1-2, evening: 7-8)
        if ((hour >= 8 && hour < 9) || (hour >= 13 && hour < 14) || (hour >= 19 && hour < 20)) {
          setCurrentReminder({
            medicine: activeMed.medicineName,
            time: hour >= 8 && hour < 9 ? 'Morning' : hour >= 13 && hour < 14 ? 'Afternoon' : 'Evening',
            timeHi: hour >= 8 && hour < 9 ? 'सुबह' : hour >= 13 && hour < 14 ? 'दोपहर' : 'शाम',
            dosage: activeMed.dosage,
          });
          setShowReminder(true);
          
          // Voice announcement
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(
              language === 'hi'
                ? `दवा का समय। ${activeMed.medicineName} लें।`
                : `Time for medicine. Take ${activeMed.medicineName}.`
            );
            utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
            speechSynthesis.speak(utterance);
          }
        }
      }
    }, 120000); // Check every 2 minutes

    return () => clearInterval(interval);
  }, [medicines, language]);

  const handleDismiss = () => {
    setShowReminder(false);
    setCurrentReminder(null);
  };

  const handleTaken = () => {
    setShowReminder(false);
    setCurrentReminder(null);
    // Voice confirmation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        language === 'hi' ? 'दवा लेने के लिए धन्यवाद।' : 'Thank you for taking your medicine.'
      );
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  if (!showReminder || !currentReminder) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50"
      >
        <div className="bg-gradient-to-br from-[#FFD166] to-[#FFC947] rounded-3xl p-6 shadow-2xl border-4 border-yellow-400">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Bell className="w-8 h-8 text-[#FFD166]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {language === 'hi' ? '💊 दवा याद दिलाना' : '💊 Medicine Reminder'}
                </h3>
                <p className="text-lg sm:text-xl text-gray-700">
                  {language === 'hi' ? `${currentReminder.timeHi} का समय` : `Time for ${currentReminder.time}`}
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="w-10 h-10 rounded-full bg-white/80 hover:bg-white transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white/90 rounded-2xl p-4 mb-4">
            <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              {currentReminder.medicine}
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              {currentReminder.dosage}
            </p>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleTaken}
              className="flex-1 py-4 bg-[#00A67E] text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-[#008B6B] transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-6 h-6" />
              {language === 'hi' ? 'लिया गया' : 'Taken'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleDismiss}
              className="px-6 py-4 bg-white/80 text-gray-700 rounded-2xl text-xl font-bold hover:bg-white transition-colors"
            >
              {language === 'hi' ? 'बाद में' : 'Later'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

