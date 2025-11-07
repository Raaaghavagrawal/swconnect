import React, { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/doctor/Header';
import Sidebar from '../components/doctor/Sidebar';
import DashboardTab from '../components/doctor/tabs/DashboardTab';
import PatientsTab from '../components/doctor/tabs/PatientsTab';
import ReportsTab from '../components/doctor/tabs/ReportsTab';
import AppointmentsTab from '../components/doctor/tabs/AppointmentsTab';
import PrescriptionsTab from '../components/doctor/tabs/PrescriptionsTab';
import MessagesTab from '../components/common/MessagesTab';
import AnalyticsTab from '../components/doctor/tabs/AnalyticsTab';
import SettingsTab from '../components/rmp/tabs/SettingsTab';
import {
  mockPatients,
  mockReports,
  mockProfile,
  mockMessages,
  mockAnalyticsData,
} from '../data/mockData';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, limit } from 'firebase/firestore';

export default function DoctorDash() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [patients, setPatients] = useState(mockPatients);
  const [reports, setReports] = useState(mockReports);
  const [profile, setProfile] = useState(mockProfile);
  const [messages, setMessages] = useState(mockMessages);
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'Scheduled',
      reason: 'Follow-up consultation',
      location: 'Clinic',
    },
    {
      id: '2',
      patientName: 'Priya Sharma',
      date: '2024-01-21',
      time: '11:00 AM',
      status: 'Scheduled',
      reason: 'Regular check-up',
      location: 'Clinic',
    },
    {
      id: '3',
      patientName: 'Amit Patel',
      date: '2024-01-18',
      time: '2:00 PM',
      status: 'Completed',
      reason: 'Initial consultation',
      location: 'Clinic',
    },
  ]);
  const [prescriptions, setPrescriptions] = useState([
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      date: '2024-01-15',
      status: 'Active',
      medicines: [
        { name: 'Paracetamol', dosage: '500mg twice daily' },
        { name: 'Antibiotic', dosage: '250mg once daily' },
      ],
    },
    {
      id: '2',
      patientName: 'Priya Sharma',
      date: '2024-01-16',
      status: 'Active',
      medicines: [
        { name: 'Ibuprofen', dosage: '400mg three times daily' },
      ],
    },
  ]);
  const [stats, setStats] = useState({
    totalPatients: patients.length,
    pendingCases: reports.filter((r) => r.isNew).length,
    reportsToReview: reports.filter((r) => r.isNew).length,
    lastSync: 'Just now',
    completedCases: patients.filter((p) => p.status === 'Completed').length,
    appointments: appointments.length,
    prescriptions: prescriptions.length,
  });
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

  // Update stats when data changes
  useEffect(() => {
    setStats({
      totalPatients: patients.length,
      pendingCases: reports.filter((r) => r.isNew).length,
      reportsToReview: reports.filter((r) => r.isNew).length,
      lastSync: stats.lastSync || 'Just now',
      completedCases: patients.filter((p) => p.status === 'Completed').length,
      appointments: appointments.length,
      prescriptions: prescriptions.length,
    });
  }, [patients, reports, appointments, prescriptions]);

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

  const handleViewPatient = (patient) => {
    setActiveSection('reports');
  };

  const handleReviewReport = (report) => {
    // Mark report as reviewed
    setReports((prev) =>
      prev.map((r) => (r.id === report.id ? { ...r, isNew: false } : r))
    );
  };

  const handleSendMessage = async (messageText) => {
    try {
      await addDoc(collection(db, 'messages'), {
        from: profile.name,
        fromUid: auth.currentUser?.uid || null,
        role: 'doctor',
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

  const handleCreateAppointment = () => {
    setActiveSection('appointments');
    show('Appointment booking coming soon.', { type: 'info' });
  };

  const handleCreatePrescription = () => {
    setActiveSection('prescriptions');
    show('Prescription creation coming soon.', { type: 'info' });
  };

  const renderContent = () => {
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
            onViewPatient={handleViewPatient}
            onSync={handleSync}
          />
        );
      case 'reports':
        return (
          <ReportsTab
            reports={reports}
            onReviewReport={handleReviewReport}
          />
        );
      case 'appointments':
        return (
          <AppointmentsTab
            appointments={appointments}
            onCreateAppointment={(apt) => {
              setAppointments((prev) => [
                ...prev,
                {
                  id: Date.now().toString(),
                  patientName: apt.patientName,
                  date: apt.date,
                  time: apt.time,
                  location: apt.location,
                  status: 'Scheduled',
                  reason: apt.reason,
                },
              ]);
              setActiveSection('appointments');
              show('Appointment booked!', { type: 'success' });
            }}
          />
        );
      case 'prescriptions':
        return (
          <PrescriptionsTab
            prescriptions={prescriptions}
            onCreatePrescription={(p) => {
              setPrescriptions((prev) => [
                ...prev,
                {
                  id: Date.now().toString(),
                  patientName: p.patientName,
                  date: p.date,
                  status: 'Active',
                  medicines: p.medicines,
                },
              ]);
              setActiveSection('prescriptions');
              show('Prescription created!', { type: 'success' });
            }}
          />
        );
      case 'messages':
        return (
          <MessagesTab
            messages={messages}
            onSendMessage={handleSendMessage}
            currentRole="doctor"
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
          {/* Bottom padding for mobile bottom nav */}
          {isMobile && <div className="h-16" />}
        </main>
      </div>
    </div>
  );
}