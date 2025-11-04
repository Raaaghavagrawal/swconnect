import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, X, MapPin } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { useToast } from '../../../contexts/ToastContext';

export default function SOSButton() {
  const { language } = useTranslation();
  const { show } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSOS = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // Simulate emergency call
    show(
      language === 'hi'
        ? 'आपातकालीन कॉल शुरू की जा रही है... (108)'
        : 'Initiating emergency call... (108)',
      { type: 'warning' }
    );
    setShowConfirm(false);
    setIsActive(true);
    
    // Simulate call duration
    setTimeout(() => setIsActive(false), 5000);
  };

  const emergencyContacts = [
    { name: 'Emergency', nameHi: 'आपातकाल', number: '108', icon: '🚨' },
    { name: 'Ambulance', nameHi: 'एम्बुलेंस', number: '102', icon: '🚑' },
    { name: 'Police', nameHi: 'पुलिस', number: '100', icon: '🚔' },
  ];

  return (
    <>
      {/* Fixed SOS Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSOS}
        className={`fixed bottom-6 right-6 z-50 w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-2xl flex items-center justify-center ${
          isActive
            ? 'bg-red-600 animate-pulse'
            : 'bg-red-500 hover:bg-red-600'
        } transition-all`}
        style={{ boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)' }}
      >
        <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </motion.button>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {language === 'hi' ? 'आपातकालीन कॉल' : 'Emergency Call'}
                </h3>
                <p className="text-lg sm:text-xl text-gray-600">
                  {language === 'hi' 
                    ? 'क्या आप आपातकालीन सेवाओं को कॉल करना चाहते हैं?'
                    : 'Do you want to call emergency services?'}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {emergencyContacts.map((contact, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.95 }}
                    className="w-full p-4 bg-red-50 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{contact.icon}</span>
                      <div className="text-left">
                        <p className="text-lg font-bold text-gray-800">
                          {language === 'hi' ? contact.nameHi : contact.name}
                        </p>
                        <p className="text-base text-gray-600">{contact.number}</p>
                      </div>
                    </div>
                    <Phone className="w-6 h-6 text-red-600" />
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  className="flex-1 py-4 bg-red-600 text-white rounded-2xl text-xl font-bold shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-6 h-6" />
                  {language === 'hi' ? 'कॉल करें' : 'Call Now'}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirm(false)}
                  className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl text-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

