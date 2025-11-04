import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Heart, User } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

const mockFamilyMembers = [
  { id: '1', name: 'Priya Sharma', age: 32, relation: 'Self', status: 'Good', lastCheckup: '2024-01-15' },
  { id: '2', name: 'Rajesh Sharma', age: 45, relation: 'Husband', status: 'Good', lastCheckup: '2024-01-10' },
  { id: '3', name: 'Aarav Sharma', age: 8, relation: 'Son', status: 'Good', lastCheckup: '2024-01-12' },
];

export default function FamilyHealthSection() {
  const { language } = useTranslation();
  const [members] = useState(mockFamilyMembers);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#00A67E] rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {language === 'hi' ? 'परिवार का स्वास्थ्य' : 'Family Health'}
          </h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#FFD166] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FFC947] transition-colors"
        >
          <Plus className="w-7 h-7 text-gray-800" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200 hover:border-[#00A67E] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-[#00A67E] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-base sm:text-lg text-gray-600">
                  {language === 'hi' ? member.relation === 'Self' ? 'स्वयं' : member.relation === 'Husband' ? 'पति' : member.relation === 'Son' ? 'बेटा' : member.relation : member.relation}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg text-gray-700 font-medium">
                  {language === 'hi' ? 'उम्र:' : 'Age:'}
                </span>
                <span className="text-lg sm:text-xl font-bold text-gray-800">{member.age} {language === 'hi' ? 'वर्ष' : 'years'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg text-gray-700 font-medium flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {language === 'hi' ? 'स्थिति:' : 'Status:'}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-base font-bold">
                  {language === 'hi' ? 'अच्छा' : member.status}
                </span>
              </div>
              <div className="pt-2 border-t border-green-200">
                <p className="text-sm text-gray-600">
                  {language === 'hi' ? 'अंतिम जांच:' : 'Last Checkup:'} {member.lastCheckup}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

