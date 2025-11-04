import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function OfflineSyncBanner({ onSync }) {
  const { language } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingData, setPendingData] = useState(3);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    // Simulate sync
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPendingData(0);
    setSyncing(false);
    setSynced(true);
    if (onSync) onSync();
    
    setTimeout(() => setSynced(false), 3000);
  };

  if (isOnline && pendingData === 0 && !synced) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className={`${
          !isOnline
            ? 'bg-red-500'
            : synced
            ? 'bg-green-500'
            : pendingData > 0
            ? 'bg-yellow-500'
            : 'bg-[#00A67E]'
        } text-white shadow-lg sticky top-0 z-40`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!isOnline ? (
                <WifiOff className="w-6 h-6 sm:w-8 sm:h-8" />
              ) : synced ? (
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
              ) : (
                <Wifi className="w-6 h-6 sm:w-8 sm:h-8" />
              )}
              <div>
                <p className="text-lg sm:text-xl font-bold">
                  {!isOnline
                    ? language === 'hi'
                      ? 'आप ऑफ़लाइन हैं'
                      : 'You are offline'
                    : synced
                    ? language === 'hi'
                      ? 'सभी डेटा सिंक हो गया!'
                      : 'All data synced!'
                    : pendingData > 0
                    ? language === 'hi'
                      ? `${pendingData} आइटम सिंक करने के लिए बाकी`
                      : `${pendingData} items pending sync`
                    : language === 'hi'
                    ? 'ऑनलाइन'
                    : 'Online'}
                </p>
                {!isOnline && (
                  <p className="text-base sm:text-lg opacity-90">
                    {language === 'hi'
                      ? 'कनेक्शन बहाल होने पर डेटा स्वचालित रूप से सिंक हो जाएगा'
                      : 'Data will sync automatically when connection is restored'}
                  </p>
                )}
              </div>
            </div>
            {isOnline && pendingData > 0 && !syncing && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSync}
                className="px-6 py-3 bg-white text-[#00A67E] rounded-full text-lg font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                {language === 'hi' ? 'सिंक करें' : 'Sync Now'}
              </motion.button>
            )}
            {syncing && (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span className="text-lg font-bold">
                  {language === 'hi' ? 'सिंक हो रहा है...' : 'Syncing...'}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

