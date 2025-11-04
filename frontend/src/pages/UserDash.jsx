import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserHeader from '../components/user/UserHeader';
import UserSidebar from '../components/user/UserSidebar';
import UserDashboardTab from '../components/user/tabs/DashboardTab';
import PrescriptionsTab from '../components/user/tabs/PrescriptionsTab';
import AppointmentsTab from '../components/user/tabs/AppointmentsTab';
import ReportsTab from '../components/user/tabs/ReportsTab';
import MessagesTab from '../components/user/tabs/MessagesTab';
import ProfileTab from '../components/user/tabs/ProfileTab';
import SettingsTab from '../components/rmp/tabs/SettingsTab';
import {
  mockUserPrescriptions,
  mockUserAppointments,
  mockUserReports,
  mockUserMessages,
  mockUserProfile,
  mockUserStats,
  mockProfile,
} from '../data/mockData';

export default function UserDash() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [prescriptions, setPrescriptions] = useState(mockUserPrescriptions);
  const [appointments, setAppointments] = useState(mockUserAppointments);
  const [reports, setReports] = useState(mockUserReports);
  const [messages, setMessages] = useState(mockUserMessages);
  const [profile, setProfile] = useState(mockUserProfile);
  const [stats, setStats] = useState(mockUserStats);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update stats
  useEffect(() => {
    setStats({
      activePrescriptions: prescriptions.filter((p) => p.status === 'Active').length,
      upcomingAppointments: appointments.filter((a) => a.status === 'Scheduled').length,
      unreadMessages: messages.filter((m) => !m.isRead).length,
      lastVisit: appointments.find((a) => a.status === 'Completed')?.date || 'N/A',
    });
  }, [prescriptions, appointments, messages]);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) setSidebarOpen(false);
  };

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now().toString(),
      from: profile.name,
      type: 'patient',
      message: messageText,
      timestamp: new Date().toLocaleString(),
      isRead: true,
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setProfile((prev) => ({ ...prev, ...updatedProfile }));
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <UserDashboardTab
            stats={stats}
            prescriptions={prescriptions}
            appointments={appointments}
            messages={messages}
            onNavigate={handleNavigate}
          />
        );
      case 'prescriptions':
        return <PrescriptionsTab prescriptions={prescriptions} onNavigate={handleNavigate} />;
      case 'appointments':
        return (
          <AppointmentsTab
            appointments={appointments}
            onCreateAppointment={() => alert('Appointment booking feature coming soon!')}
          />
        );
      case 'reports':
        return <ReportsTab reports={reports} />;
      case 'messages':
        return <MessagesTab messages={messages} onSendMessage={handleSendMessage} />;
      case 'profile':
        return <ProfileTab profile={profile} />;
      case 'settings':
        return (
          <SettingsTab
            profile={mockProfile}
            onUpdateProfile={handleUpdateProfile}
            onSync={() => alert('Data synced successfully!')}
          />
        );
      default:
        return (
          <UserDashboardTab
            stats={stats}
            prescriptions={prescriptions}
            appointments={appointments}
            messages={messages}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <UserHeader
        userName={profile.name}
        onMenuClick={() => setSidebarOpen(true)}
        unreadCount={unreadCount}
      />
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <aside className="hidden md:block">
            <UserSidebar
              activeSection={activeSection}
              onSectionChange={handleNavigate}
              isMobile={false}
            />
          </aside>
        )}
        {isMobile && (
          <UserSidebar
            activeSection={activeSection}
            onSectionChange={handleNavigate}
            isMobile={true}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}
        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--color-bg)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
          {isMobile && <div className="h-16" />}
        </main>
      </div>
    </div>
  );
}
