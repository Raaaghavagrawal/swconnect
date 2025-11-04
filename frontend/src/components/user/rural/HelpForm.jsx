import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

const symptoms = [
  { icon: '🤒', label: 'Fever', labelHi: 'बुखार' },
  { icon: '🤧', label: 'Cold', labelHi: 'जुकाम' },
  { icon: '😷', label: 'Cough', labelHi: 'खांसी' },
  { icon: '🤢', label: 'Nausea', labelHi: 'मतली' },
  { icon: '💊', label: 'Pain', labelHi: 'दर्द' },
  { icon: '😴', label: 'Tired', labelHi: 'थकान' },
];

export default function HelpForm({ onClose, onSubmit }) {
  const { language } = useTranslation();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [message, setMessage] = useState('');

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length > 0 || message.trim()) {
      onSubmit({
        symptoms: selectedSymptoms,
        message: message.trim(),
      });
      setSelectedSymptoms([]);
      setMessage('');
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            {language === 'hi' ? 'मदद चाहिए?' : 'Need Help?'}
          </h2>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Symptom Selection */}
        <div className="mb-6">
          <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
            {language === 'hi' ? 'लक्षण चुनें:' : 'Select Symptoms:'}
          </p>
          <div className="grid grid-cols-3 gap-4">
            {symptoms.map((symptom, idx) => {
              const isSelected = selectedSymptoms.includes(symptom.label);
              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSymptomToggle(symptom.label)}
                  className={`p-4 rounded-2xl border-4 transition-all ${
                    isSelected
                      ? 'bg-[#FFD166] border-[#FFD166] shadow-lg'
                      : 'bg-white border-gray-200 hover:border-[#00A67E]'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl block mb-2">{symptom.icon}</span>
                  <span className="text-lg sm:text-xl font-semibold text-gray-800">
                    {language === 'hi' ? symptom.labelHi : symptom.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Message Input */}
        <div className="mb-6">
          <label className="block text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            {language === 'hi' ? 'अधिक जानकारी (वैकल्पिक):' : 'More Details (Optional):'}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={language === 'hi' ? 'अपनी समस्या बताएं...' : 'Describe your problem...'}
            className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#00A67E] resize-none"
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={selectedSymptoms.length === 0 && !message.trim()}
          className="w-full py-4 bg-[#00A67E] text-white rounded-2xl text-xl sm:text-2xl font-bold shadow-xl hover:bg-[#008B6B] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-6 h-6" />
          {language === 'hi' ? 'भेजें' : 'Send Request'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

