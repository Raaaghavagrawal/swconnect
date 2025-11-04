import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Pill, HelpCircle, Calendar } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

const menuItems = [
  {
    id: 'health',
    icon: Heart,
    label: 'Health',
    labelHi: 'स्वास्थ्य',
    color: 'bg-[#00A67E]',
    onClick: () => {},
  },
  {
    id: 'medicine',
    icon: Pill,
    label: 'Medicine',
    labelHi: 'दवा',
    color: 'bg-[#FFD166]',
    onClick: () => {},
  },
  {
    id: 'help',
    icon: HelpCircle,
    label: 'Help',
    labelHi: 'मदद',
    color: 'bg-[#00A67E]',
    onClick: () => {},
  },
  {
    id: 'visits',
    icon: Calendar,
    label: 'Visits',
    labelHi: 'भेटें',
    color: 'bg-[#FFD166]',
    onClick: () => {},
  },
];

export default function MainMenuGrid({ onMenuClick, activeSection }) {
  const { language } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {menuItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        const label = language === 'hi' ? item.labelHi : item.label;
        
        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              item.onClick();
              onMenuClick(item.id);
            }}
            className={`${item.color} rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center min-h-[160px] sm:min-h-[180px] ${
              isActive ? 'ring-4 ring-white ring-offset-4 ring-offset-[#00A67E]' : ''
            }`}
          >
            <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-white mb-4" />
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

