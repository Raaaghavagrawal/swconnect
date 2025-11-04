// Comprehensive mock data for RMP Dashboard

export const mockPatients = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    age: 45,
    village: 'Village A',
    status: 'Pending',
    phone: '+91 98765 43210',
    lastVisit: '2024-01-10',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    age: 32,
    village: 'Village B',
    status: 'Completed',
    phone: '+91 98765 43211',
    lastVisit: '2024-01-15',
  },
  {
    id: '3',
    name: 'Amit Patel',
    age: 28,
    village: 'Village A',
    status: 'Referred',
    phone: '+91 98765 43212',
    lastVisit: '2024-01-12',
  },
  {
    id: '4',
    name: 'Sunita Devi',
    age: 55,
    village: 'Village C',
    status: 'Pending',
    phone: '+91 98765 43213',
    lastVisit: '2024-01-14',
  },
  {
    id: '5',
    name: 'Mohan Singh',
    age: 40,
    village: 'Village B',
    status: 'Completed',
    phone: '+91 98765 43214',
    lastVisit: '2024-01-16',
  },
  {
    id: '6',
    name: 'Geeta Reddy',
    age: 35,
    village: 'Village D',
    status: 'Pending',
    phone: '+91 98765 43215',
    lastVisit: '2024-01-17',
  },
];

export const mockReports = [
  {
    id: '1',
    patientName: 'Rajesh Kumar',
    village: 'Village A',
    date: '2024-01-15',
    doctorFeedback: 'Patient needs follow-up. Continue medication for 5 more days.',
    isNew: true,
  },
  {
    id: '2',
    patientName: 'Priya Sharma',
    village: 'Village B',
    date: '2024-01-14',
    doctorFeedback: 'Patient is recovering well. Prescription provided.',
    isNew: false,
  },
  {
    id: '3',
    patientName: 'Amit Patel',
    village: 'Village A',
    date: '2024-01-13',
    doctorFeedback: 'Referred to specialist. Please schedule appointment.',
    isNew: true,
  },
  {
    id: '4',
    patientName: 'Sunita Devi',
    village: 'Village C',
    date: '2024-01-12',
    doctorFeedback: 'Regular check-up required.',
    isNew: false,
  },
];

export const mockStats = {
  activePatients: 6,
  pendingVisits: 3,
  reportsToSend: 2,
  lastSync: '2 hours ago',
  totalVisits: 24,
  completedVisits: 18,
  referredCases: 2,
};

export const mockProfile = {
  name: 'Rakesh',
  area: 'Rural Health Center - Block 3',
  language: 'English',
  phone: '+91 98765 43210',
  email: 'rakesh@rmp.swasthya',
};

// Pharmacies (for PharmaConnect)
export const mockPharmacies = [
  {
    id: '1',
    name: 'Village Pharmacy A',
    location: 'Village A',
    distance: '2.5 km',
    phone: '+91 98765 11111',
    status: 'Available',
  },
  {
    id: '2',
    name: 'Village Pharmacy B',
    location: 'Village B',
    distance: '3.2 km',
    phone: '+91 98765 22222',
    status: 'Available',
  },
  {
    id: '3',
    name: 'Village Pharmacy C',
    location: 'Village C',
    distance: '4.1 km',
    phone: '+91 98765 33333',
    status: 'Available',
  },
  {
    id: '4',
    name: 'Village Pharmacy D',
    location: 'Village D',
    distance: '5.0 km',
    phone: '+91 98765 44444',
    status: 'Available',
  },
];

// Messages
export const mockMessages = [
  {
    id: '1',
    from: 'Dr. Anjali Mehta',
    type: 'doctor',
    message: 'Please review the prescription for Rajesh Kumar. Patient needs follow-up.',
    timestamp: '2024-01-15 14:30',
    isRead: false,
    priority: 'high',
  },
  {
    id: '2',
    from: 'Dr. Anjali Mehta',
    type: 'doctor',
    message: 'Great work on the reports. Keep up the good work!',
    timestamp: '2024-01-14 10:15',
    isRead: true,
    priority: 'normal',
  },
  {
    id: '3',
    from: 'System',
    type: 'system',
    message: 'Medicine request for Priya Sharma has been dispatched.',
    timestamp: '2024-01-14 09:00',
    isRead: true,
    priority: 'normal',
  },
  {
    id: '4',
    from: 'Dr. Anjali Mehta',
    type: 'doctor',
    message: 'New patient referral case. Please check urgent cases section.',
    timestamp: '2024-01-13 16:45',
    isRead: false,
    priority: 'urgent',
  },
];

// Schedule/Calendar
export const mockSchedule = [
  {
    id: '1',
    patientName: 'Rajesh Kumar',
    date: '2024-01-18',
    time: '10:00 AM',
    village: 'Village A',
    type: 'Follow-up',
    status: 'Scheduled',
  },
  {
    id: '2',
    patientName: 'Sunita Devi',
    date: '2024-01-18',
    time: '2:00 PM',
    village: 'Village C',
    type: 'Routine Check',
    status: 'Scheduled',
  },
  {
    id: '3',
    patientName: 'Geeta Reddy',
    date: '2024-01-19',
    time: '11:00 AM',
    village: 'Village D',
    type: 'Initial Visit',
    status: 'Scheduled',
  },
  {
    id: '4',
    patientName: 'Mohan Singh',
    date: '2024-01-20',
    time: '9:00 AM',
    village: 'Village B',
    type: 'Follow-up',
    status: 'Scheduled',
  },
];

// Analytics Data
export const mockAnalyticsData = {
  casesByMonth: [
    { month: 'Oct', cases: 12 },
    { month: 'Nov', cases: 18 },
    { month: 'Dec', cases: 15 },
    { month: 'Jan', cases: 24 },
  ],
  visitsByType: [
    { type: 'Routine', count: 15 },
    { type: 'Follow-up', count: 8 },
    { type: 'Emergency', count: 1 },
  ],
  statusDistribution: [
    { status: 'Completed', count: 18 },
    { status: 'Pending', count: 5 },
    { status: 'Referred', count: 1 },
  ],
};

// Map locations (for mini map)
export const mockMapLocations = [
  { id: '1', name: 'Village A', lat: 28.6139, lng: 77.2090, patients: 3 },
  { id: '2', name: 'Village B', lat: 28.6140, lng: 77.2091, patients: 2 },
  { id: '3', name: 'Village C', lat: 28.6141, lng: 77.2092, patients: 1 },
  { id: '4', name: 'Village D', lat: 28.6142, lng: 77.2093, patients: 1 },
];

// User Dashboard Data
export const mockUserPrescriptions = [
  {
    id: '1',
    medicineName: 'Paracetamol 500mg',
    dosage: '1 tablet, 2 times daily',
    duration: '5 days',
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    status: 'Active',
    prescribedBy: 'Dr. Anjali Mehta',
    remainingDays: 3,
  },
  {
    id: '2',
    medicineName: 'Amoxicillin 250mg',
    dosage: '1 capsule, 3 times daily',
    duration: '7 days',
    startDate: '2024-01-14',
    endDate: '2024-01-21',
    status: 'Active',
    prescribedBy: 'Dr. Anjali Mehta',
    remainingDays: 4,
  },
  {
    id: '3',
    medicineName: 'Cough Syrup',
    dosage: '10ml, 2 times daily',
    duration: '5 days',
    startDate: '2024-01-10',
    endDate: '2024-01-15',
    status: 'Completed',
    prescribedBy: 'RMP Rakesh',
    remainingDays: 0,
  },
];

export const mockUserAppointments = [
  {
    id: '1',
    date: '2024-01-20',
    time: '10:00 AM',
    doctor: 'Dr. Anjali Mehta',
    type: 'Follow-up',
    status: 'Scheduled',
    location: 'Rural Health Center',
  },
  {
    id: '2',
    date: '2024-01-18',
    time: '2:00 PM',
    doctor: 'RMP Rakesh',
    type: 'Routine Check',
    status: 'Scheduled',
    location: 'Home Visit',
  },
  {
    id: '3',
    date: '2024-01-15',
    time: '11:00 AM',
    doctor: 'Dr. Anjali Mehta',
    type: 'Consultation',
    status: 'Completed',
    location: 'Rural Health Center',
  },
];

export const mockUserReports = [
  {
    id: '1',
    title: 'Blood Test Results',
    date: '2024-01-15',
    doctor: 'Dr. Anjali Mehta',
    status: 'Normal',
    type: 'Lab Report',
    summary: 'All parameters within normal range',
  },
  {
    id: '2',
    title: 'X-Ray Report',
    date: '2024-01-12',
    doctor: 'Dr. Anjali Mehta',
    status: 'Normal',
    type: 'Diagnostic',
    summary: 'No abnormalities detected',
  },
  {
    id: '3',
    title: 'General Health Check',
    date: '2024-01-10',
    doctor: 'RMP Rakesh',
    status: 'Review Needed',
    type: 'Health Check',
    summary: 'Minor issues noted, follow-up recommended',
  },
];

export const mockUserMessages = [
  {
    id: '1',
    from: 'Dr. Anjali Mehta',
    type: 'doctor',
    message: 'Your test results are normal. Continue the medication as prescribed.',
    timestamp: '2024-01-15 14:30',
    isRead: false,
  },
  {
    id: '2',
    from: 'RMP Rakesh',
    type: 'rmp',
    message: 'Reminder: Your next appointment is scheduled for Jan 20, 10:00 AM',
    timestamp: '2024-01-16 09:00',
    isRead: false,
  },
  {
    id: '3',
    from: 'System',
    type: 'system',
    message: 'Your prescription refill is available at Village Pharmacy A',
    timestamp: '2024-01-14 16:45',
    isRead: true,
  },
];

export const mockUserProfile = {
  name: 'Rajesh Kumar',
  age: 45,
  phone: '+91 98765 43210',
  email: 'rajesh@example.com',
  village: 'Village A',
  bloodGroup: 'O+',
  emergencyContact: '+91 98765 43211',
  address: 'House No. 123, Village A',
};

export const mockUserStats = {
  activePrescriptions: 2,
  upcomingAppointments: 2,
  unreadMessages: 2,
  lastVisit: '2024-01-15',
};
