import React, { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/rmp/Header';
import Sidebar from '../components/rmp/Sidebar';
import DashboardTab from '../components/rmp/tabs/DashboardTab';
import PatientsTab from '../components/rmp/tabs/PatientsTab';
import ReportsTab from '../components/rmp/tabs/ReportsTab';
import PharmaConnectTab from '../components/rmp/tabs/PharmaConnectTab';
import MessagesTab from '../components/common/MessagesTab';
import ScheduleTab from '../components/rmp/tabs/ScheduleTab';
import AnalyticsTab from '../components/rmp/tabs/AnalyticsTab';
import SettingsTab from '../components/rmp/tabs/SettingsTab';
import {
  mockPatients,
  mockReports,
  mockStats,
  mockProfile,
  mockMessages,
  mockSchedule,
  mockAnalyticsData,
} from '../data/mockData';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, limit } from 'firebase/firestore';

export default function OfficialDash() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [patients, setPatients] = useState(mockPatients);
  const [reports, setReports] = useState(mockReports);
  const [stats, setStats] = useState(mockStats);
  const [profile, setProfile] = useState(mockProfile);
  const [medicationAssignments, setMedicationAssignments] = useState([]);
  const [messages, setMessages] = useState(mockMessages);
  const [schedule, setSchedule] = useState(mockSchedule);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { show } = useToast();

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update stats when patients change
  useEffect(() => {
    setStats((prevStats) => ({
      activePatients: patients.length,
      pendingVisits: patients.filter((p) => p.status === 'Pending').length,
      reportsToSend: reports.filter((r) => r.isNew).length,
      totalVisits: prevStats.totalVisits || 24,
      completedVisits: patients.filter((p) => p.status === 'Completed').length,
      referredCases: patients.filter((p) => p.status === 'Referred').length,
      lastSync: prevStats.lastSync,
    }));
  }, [patients, reports]);

  // Realtime Messages
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(100));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }, (err) => {
      console.error('Messages listener error:', err);
      if (err.code === 'permission-denied') {
        // Fallback to mock data if permissions not set up yet
        setMessages(mockMessages);
        show('Using offline mode. Deploy Firestore rules to enable real-time messages.', { type: 'warning', duration: 5000 });
      }
    });
    return () => unsub();
  }, []);

  // Navigation handlers
  const handleNavigate = (section) => {
    setActiveSection(section);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleVisitClick = (patient) => {
    setSelectedPatient(patient);
    setActiveSection('reports');
  };

  const handleViewReport = (patient) => {
    setActiveSection('reports');
  };

  const handleSaveVisit = (visitData) => {
    console.log('Visit saved offline:', visitData);
    setPatients((prev) =>
      prev.map((p) =>
        p.id === visitData.patientId ? { ...p, status: 'Pending' } : p
      )
    );
  };

  const handleSubmitVisit = (visitData) => {
    console.log('Visit submitted to doctor:', visitData);
    setPatients((prev) =>
      prev.map((p) =>
        p.id === visitData.patientId ? { ...p, status: 'Completed' } : p
      )
    );
    const newReport = {
      id: Date.now().toString(),
      patientName: patients.find((p) => p.id === visitData.patientId)?.name || 'Unknown',
      village: patients.find((p) => p.id === visitData.patientId)?.village || 'Unknown',
      date: new Date().toISOString().split('T')[0],
      doctorFeedback: visitData.isSerious
        ? 'Serious case - requires immediate attention'
        : 'Under review',
      isNew: true,
    };
    setReports((prev) => [newReport, ...prev]);
    setActiveSection('reports');
  };

  const handleAssignMedication = (assignmentData) => {
    const newAssignment = {
      id: Date.now().toString(),
      ...assignmentData,
      // Simulate automatic status progression (in real app, this would be updated by pharmacy)
      autoProgress: true,
    };
    setMedicationAssignments((prev) => [newAssignment, ...prev]);
    
    // Simulate automatic status updates (in real app, this would come from pharmacy system)
    setTimeout(() => {
      setMedicationAssignments((prev) =>
        prev.map((a) =>
          a.id === newAssignment.id && a.status === 'Assigned'
            ? {
                ...a,
                status: 'Packing',
                trackingHistory: [
                  ...(a.trackingHistory || []),
                  {
                    status: 'Packing',
                    timestamp: new Date().toLocaleString(),
                    description: 'Pharmacy is preparing the medication',
                  },
                ],
              }
            : a
        )
      );
    }, 2000);

    setTimeout(() => {
      setMedicationAssignments((prev) =>
        prev.map((a) =>
          a.id === newAssignment.id && a.status === 'Packing'
            ? {
                ...a,
                status: 'Dispatched',
                trackingHistory: [
                  ...(a.trackingHistory || []),
                  {
                    status: 'Dispatched',
                    timestamp: new Date().toLocaleString(),
                    description: 'Medication dispatched from pharmacy',
                  },
                ],
              }
            : a
        )
      );
    }, 5000);

    setTimeout(() => {
      setMedicationAssignments((prev) =>
        prev.map((a) =>
          a.id === newAssignment.id && a.status === 'Dispatched'
            ? {
                ...a,
                status: 'In Transit',
                trackingHistory: [
                  ...(a.trackingHistory || []),
                  {
                    status: 'In Transit',
                    timestamp: new Date().toLocaleString(),
                    description: 'Medication is on the way',
                  },
                ],
              }
            : a
        )
      );
    }, 8000);
  };

  const handleSendMessage = async (messageText) => {
    try {
      await addDoc(collection(db, 'messages'), {
        from: profile.name,
        fromUid: auth.currentUser?.uid || null,
        role: 'rmp',
        message: messageText,
        createdAt: serverTimestamp(),
        isRead: false,
        priority: 'normal',
      });
    } catch (err) {
      console.error('Send message error:', err);
      if (err.code === 'permission-denied') {
        show('Permission denied. Please check Firestore security rules.', { type: 'error' });
      } else {
        show('Failed to send message. Please try again.', { type: 'error' });
      }
    }
  };

  const handleSync = () => {
    show('Syncing data…', { type: 'info', duration: 1500 });
    setTimeout(() => {
      setStats((prev) => ({ ...prev, lastSync: 'Just now' }));
      show('Data synced successfully!', { type: 'success' });
    }, 1000);
  };

  const handleUpdateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  const renderContent = () => {
    const transitionClass = 'animate-in fade-in duration-300';
    
    switch (activeSection) {
      case 'dashboard':
        return (
          <DashboardTab
            stats={stats}
            onNavigate={handleNavigate}
          />
        );
      case 'patients':
        return (
          <PatientsTab
            patients={patients}
            onVisitClick={handleVisitClick}
            onViewReport={handleViewReport}
            onSync={handleSync}
          />
        );
      case 'reports':
        return (
          <ReportsTab
            patient={selectedPatient}
            patients={patients}
            onSave={handleSaveVisit}
            onSubmit={handleSubmitVisit}
          />
        );
      case 'pharmaconnect':
        return (
          <PharmaConnectTab
            assignments={medicationAssignments}
            patients={patients}
            onAssignMedication={handleAssignMedication}
          />
        );
      case 'messages':
        return (
          <MessagesTab
            messages={messages}
            onSendMessage={handleSendMessage}
            currentRole="rmp"
          />
        );
      case 'schedule':
        return (
          <ScheduleTab
            schedule={schedule}
            onCreateVisit={() => handleNavigate('reports')}
          />
        );
      case 'analytics':
        return (
          <AnalyticsTab
            analyticsData={mockAnalyticsData}
            stats={stats}
          />
        );
      case 'settings':
        return (
          <SettingsTab
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onSync={handleSync}
          />
        );
      default:
        return (
          <DashboardTab
            stats={stats}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Header userName={profile.name} onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop only, mobile uses bottom nav */}
        {!isMobile && (
          <aside className="hidden md:block">
            <Sidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              isMobile={false}
            />
          </aside>
        )}

        {/* Mobile Sidebar */}
        {isMobile && (
          <Sidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            isMobile={true}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--color-bg)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderContent()}
            </motion.div>
          </div>
          {/* Bottom padding for mobile bottom nav */}
          {isMobile && <div className="h-16" />}
        </main>
      </div>
    </div>
  );
}
