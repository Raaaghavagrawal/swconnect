import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function VoiceAssistant({ content }) {
  const { language } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(content || 'Welcome to SwasthyaConnect. Your health companion.');
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsListening(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-8 left-6 z-40"
    >
      <div className="flex flex-col gap-3">
        {/* Read Aloud Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={isSpeaking ? handleStop : handleReadAloud}
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl flex items-center justify-center ${
            isSpeaking
              ? 'bg-[#00A67E] hover:bg-[#008B6B]'
              : 'bg-[#FFD166] hover:bg-[#FFC947]'
          } transition-colors`}
          title={language === 'hi' ? 'जोर से पढ़ें' : 'Read Aloud'}
        >
          {isSpeaking ? (
            <Volume2 className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
          ) : (
            <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-gray-800" />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

