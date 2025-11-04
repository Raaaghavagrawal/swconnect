import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RuralUserHeader from '../components/user/rural/RuralUserHeader';
import MainMenuGrid from '../components/user/rural/MainMenuGrid';
import HealthSummaryCard from '../components/user/rural/HealthSummaryCard';
import MedicineTracker from '../components/user/rural/MedicineTracker';
import HelpForm from '../components/user/rural/HelpForm';
import VisitTimeline from '../components/user/rural/VisitTimeline';
import HealthTips from '../components/user/rural/HealthTips';
import FamilyHealthSection from '../components/user/rural/FamilyHealthSection';
import AIHealthInsights from '../components/user/rural/AIHealthInsights';
import SOSButton from '../components/user/rural/SOSButton';
import OfflineSyncBanner from '../components/user/rural/OfflineSyncBanner';
import MedicineReminder from '../components/user/rural/MedicineReminder';
import HealthJourneyTracker from '../components/user/rural/HealthJourneyTracker';
import LocalHealthAlerts from '../components/user/rural/LocalHealthAlerts';
import VoiceAssistant from '../components/user/rural/VoiceAssistant';
import { useTranslation } from '../hooks/useTranslation';
import { useToast } from '../contexts/ToastContext';
import {
  mockUserPrescriptions,
  mockUserAppointments,
} from '../data/mockData';

export default function RuralUserDash() {
  const { language } = useTranslation();
  const { show } = useToast();
  const [activeSection, setActiveSection] = useState('health');
  const [showHelpForm, setShowHelpForm] = useState(false);
  const [prescriptions] = useState(mockUserPrescriptions);
  const [appointments] = useState(mockUserAppointments);

  const stats = {
    activeMedicines: prescriptions.filter((p) => p.status === 'Active').length,
    nextVisit: appointments.find((a) => a.status === 'Scheduled')?.date || null,
  };

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'help') {
      setShowHelpForm(true);
    }
  };

  const handleHelpSubmit = (data) => {
    console.log('Help request:', data);
    show(
      language === 'hi'
        ? 'आपकी मदद का अनुरोध भेजा गया है! एक स्वास्थ्य सेवा प्रदाता जल्द ही आपसे संपर्क करेगा।'
        : 'Your help request has been sent! A healthcare provider will contact you soon.',
      { type: 'success' }
    );
  };

  const handleSync = () => {
    console.log('Syncing data...');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'health':
        return (
          <div className="space-y-6">
            <HealthSummaryCard stats={stats} />
            <FamilyHealthSection />
            <AIHealthInsights />
            <MedicineTracker medicines={prescriptions} />
            <HealthJourneyTracker />
            <LocalHealthAlerts />
            <VisitTimeline visits={appointments} />
            <HealthTips />
          </div>
        );
      case 'medicine':
        return (
          <div className="space-y-6">
            <MedicineTracker medicines={prescriptions} />
            <HealthSummaryCard stats={stats} />
            <HealthJourneyTracker />
          </div>
        );
      case 'help':
        return null; // Help form is shown as modal
      case 'visits':
        return (
          <div className="space-y-6">
            <VisitTimeline visits={appointments} />
            <HealthSummaryCard stats={stats} />
            <FamilyHealthSection />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <HealthSummaryCard stats={stats} />
            <FamilyHealthSection />
            <AIHealthInsights />
            <MedicineTracker medicines={prescriptions} />
            <HealthJourneyTracker />
            <LocalHealthAlerts />
            <VisitTimeline visits={appointments} />
            <HealthTips />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5E9] to-[#F1F8E9]">
      {/* Offline Sync Banner */}
      <OfflineSyncBanner onSync={handleSync} />
      
      <RuralUserHeader />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Menu Grid */}
        <MainMenuGrid
          onMenuClick={handleMenuClick}
          activeSection={activeSection}
        />

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed SOS Button */}
      <SOSButton />

      {/* Voice Assistant */}
      <VoiceAssistant content={language === 'hi' ? 'स्वास्थ्य डैशबोर्ड में आपका स्वागत है' : 'Welcome to your health dashboard'} />

      {/* Medicine Reminder */}
      <MedicineReminder medicines={prescriptions} />

      {/* Help Form Modal */}
      <AnimatePresence>
        {showHelpForm && (
          <HelpForm
            onClose={() => {
              setShowHelpForm(false);
              setActiveSection('health');
            }}
            onSubmit={handleHelpSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

