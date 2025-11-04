import React, { useState } from 'react';
import { Pill, Search, Plus, User, Calendar, CheckCircle2, XCircle, Clock, Package, Truck, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig = {
  Assigned: { icon: CheckCircle2, color: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', label: 'Assigned to Pharmacy' },
  Packing: { icon: Package, color: 'yellow', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', label: 'Packing' },
  Dispatched: { icon: Truck, color: 'orange', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', label: 'Dispatched' },
  'In Transit': { icon: Truck, color: 'purple', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', label: 'In Transit' },
  Delivered: { icon: CheckCircle2, color: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', label: 'Delivered' },
  Cancelled: { icon: XCircle, color: 'red', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', label: 'Cancelled' },
};

const statusOrder = ['Assigned', 'Packing', 'Dispatched', 'In Transit', 'Delivered'];

const commonMedicines = [
  'Paracetamol 500mg',
  'Ibuprofen 400mg',
  'Amoxicillin 250mg',
  'Antacid (Calcium Carbonate)',
  'Cough Syrup (Dextromethorphan)',
  'Pain Relief (Diclofenac)',
  'Multivitamins',
  'Antibiotic (Azithromycin)',
  'Iron Supplements',
  'Calcium Tablets',
];

const mockPharmacies = [
  { id: '1', name: 'Village Pharmacy A', location: 'Village A', distance: '2.5 km', phone: '+91 98765 11111' },
  { id: '2', name: 'Village Pharmacy B', location: 'Village B', distance: '3.2 km', phone: '+91 98765 22222' },
  { id: '3', name: 'Village Pharmacy C', location: 'Village C', distance: '4.1 km', phone: '+91 98765 33333' },
  { id: '4', name: 'Village Pharmacy D', location: 'Village D', distance: '5.0 km', phone: '+91 98765 44444' },
];

export default function PharmaConnectTab({ assignments, patients, onAssignMedication }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    medicines: [],
    dosage: '',
    duration: '',
    instructions: '',
    pharmacyId: '',
  });

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedPatient = patients.find((p) => p.id === formData.patientId);
  const selectedPharmacy = mockPharmacies.find((p) => p.id === formData.pharmacyId);

  // Find nearest pharmacy based on patient's village
  const getNearestPharmacy = (patientVillage) => {
    // Simple matching - in real app, this would use GPS coordinates
    const villagePharmacy = mockPharmacies.find((p) => p.location === patientVillage);
    return villagePharmacy || mockPharmacies[0]; // Default to first if no match
  };

  const handleMedicineToggle = (medicine) => {
    setFormData((prev) => ({
      ...prev,
      medicines: prev.medicines.includes(medicine)
        ? prev.medicines.filter((m) => m !== medicine)
        : [...prev.medicines, medicine],
    }));
  };

  const handlePatientChange = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    const nearestPharmacy = patient ? getNearestPharmacy(patient.village) : null;
    setFormData((prev) => ({
      ...prev,
      patientId,
      pharmacyId: nearestPharmacy?.id || '',
    }));
  };

  const handleSubmit = () => {
    if (!formData.patientId || formData.medicines.length === 0) {
      alert('Please select a patient and at least one medicine');
      return;
    }
    if (!formData.pharmacyId) {
      alert('Please select a pharmacy');
      return;
    }
    
    const pharmacy = mockPharmacies.find((p) => p.id === formData.pharmacyId);
    onAssignMedication({
      ...formData,
      patientName: selectedPatient?.name || 'Unknown',
      patientVillage: selectedPatient?.village || 'Unknown',
      pharmacyName: pharmacy?.name || 'Unknown',
      pharmacyLocation: pharmacy?.location || 'Unknown',
      pharmacyDistance: pharmacy?.distance || 'Unknown',
      pharmacyPhone: pharmacy?.phone || 'Unknown',
      assignedDate: new Date().toISOString().split('T')[0],
      assignedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'Assigned',
      trackingHistory: [
        {
          status: 'Assigned',
          timestamp: new Date().toLocaleString(),
          description: `Medication assigned to ${pharmacy?.name}`,
        },
      ],
    });
    setShowForm(false);
    setFormData({
      patientId: '',
      medicines: [],
      dosage: '',
      duration: '',
      instructions: '',
      pharmacyId: '',
    });
    alert('Medication assigned successfully! Pharmacy will process the order.');
  };

  const getStatusProgress = (status) => {
    const index = statusOrder.indexOf(status);
    return index >= 0 ? ((index + 1) / statusOrder.length) * 100 : 0;
  };

  const getTrackingSteps = (assignment) => {
    const currentIndex = statusOrder.indexOf(assignment.status);
    return statusOrder.map((status, idx) => {
      const statusInfo = statusConfig[status];
      const isCompleted = idx <= currentIndex;
      const isCurrent = idx === currentIndex;
      return {
        status,
        ...statusInfo,
        isCompleted,
        isCurrent,
      };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-emerald-600 flex items-center justify-center shadow-lg">
            <Pill className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">PharmaConnect</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Assign medications & track delivery</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Assign Medication
        </motion.button>
      </motion.div>

      {/* Assign Medication Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-6 overflow-hidden"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-[var(--color-primary)]" />
              Assign Medication to Patient
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Patient</label>
                <select
                  value={formData.patientId}
                  onChange={(e) => handlePatientChange(e.target.value)}
                  className="w-full px-3 py-2.5 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100 bg-white/70 dark:bg-slate-800/70"
                >
                  <option value="">Select patient...</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} - {p.village} ({p.age} years)
                    </option>
                  ))}
                </select>
                {selectedPatient && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800"
                  >
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong>Patient:</strong> {selectedPatient.name} | <strong>Age:</strong> {selectedPatient.age} years | <strong>Village:</strong> {selectedPatient.village}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Nearest Pharmacy Selection */}
              {selectedPatient && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    Nearest Pharmacy (Auto-selected)
                  </label>
                  <select
                    value={formData.pharmacyId}
                    onChange={(e) => setFormData({ ...formData, pharmacyId: e.target.value })}
                    className="w-full px-3 py-2.5 border border-blue-200 dark:border-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="">Select pharmacy...</option>
                    {mockPharmacies.map((pharmacy) => (
                      <option key={pharmacy.id} value={pharmacy.id}>
                        {pharmacy.name} - {pharmacy.location} ({pharmacy.distance})
                      </option>
                    ))}
                  </select>
                  {selectedPharmacy && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                      <Phone className="w-3 h-3" />
                      <span className="dark:text-blue-300">{selectedPharmacy.phone}</span>
                    </div>
                  )}
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Medicines</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 glass-card">
                  {commonMedicines.map((medicine) => (
                    <motion.button
                      key={medicine}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => handleMedicineToggle(medicine)}
                        className={`px-3 py-2 rounded-lg text-sm border transition-all text-left ${
                        formData.medicines.includes(medicine)
                          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                      }`}
                    >
                      {medicine}
                    </motion.button>
                  ))}
                </div>
                {formData.medicines.length > 0 && (
                  <p className="mt-2 text-xs text-emerald-600">
                    {formData.medicines.length} medicine(s) selected
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Dosage</label>
                <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    className="w-full px-3 py-2 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="e.g., 1 tablet, 2 times daily"
                  />
                </div>
                <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Duration</label>
                <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="e.g., 5 days, 1 week"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Additional Instructions</label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3 py-2 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  rows="3"
                  placeholder="Any special instructions for the patient..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg"
                >
                  Assign to Pharmacy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 glass-card text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors border border-emerald-100 dark:border-emerald-900/30"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Assigned', 'Packing', 'Dispatched', 'In Transit', 'Delivered'].map((s) => (
            <motion.button
              key={s}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition whitespace-nowrap ${
                statusFilter === s
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                  : 'glass-card text-slate-700 dark:text-slate-300 border-emerald-100 dark:border-emerald-900/30 hover:border-[var(--color-primary)] hover:shadow-sm'
              }`}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Assignments List with Tracking */}
      <AnimatePresence mode="wait">
        {filteredAssignments.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-16 glass-card"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Pill className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            </motion.div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">No medication assignments found</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Click "Assign Medication" to create a new assignment</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredAssignments.map((assignment, idx) => {
              const statusInfo = statusConfig[assignment.status] || statusConfig.Assigned;
              const StatusIcon = statusInfo.icon;
              const trackingSteps = getTrackingSteps(assignment);
              const progress = getStatusProgress(assignment.status);

              return (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="glass-card p-5 hover:shadow-lg transition-all"
                >
                  {/* Patient & Pharmacy Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 flex items-center justify-center text-white font-semibold shadow-md">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">{assignment.patientName}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {assignment.patientVillage}
                          </span>
                          <span className="flex items-center gap-1">
                            <Pill className="w-3.5 h-3.5" />
                            {assignment.pharmacyName}
                          </span>
                          <span className="text-xs">{assignment.pharmacyDistance}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.bg} ${statusInfo.border} border shadow-sm`}>
                      <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                      <span className={`text-xs font-medium ${statusInfo.text}`}>{assignment.status}</span>
                    </div>
                  </div>

                  {/* Delivery Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Delivery Progress</span>
                      <span className="text-xs text-slate-500 dark:text-slate-500">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="h-full bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-3">Tracking Timeline</p>
                    <div className="relative">
                      {trackingSteps.map((step, stepIdx) => (
                        <div key={step.status} className="relative flex items-start gap-3 pb-3 last:pb-0">
                          {/* Vertical Line */}
                          {stepIdx < trackingSteps.length - 1 && (
                            <div className={`absolute left-[11px] top-6 w-0.5 h-8 ${
                              step.isCompleted ? 'bg-[var(--color-primary)]' : 'bg-slate-200'
                            }`} />
                          )}
                          {/* Status Icon */}
                          <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                            step.isCompleted
                              ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md'
                              : step.isCurrent
                              ? 'bg-white border-[var(--color-primary)] text-[var(--color-primary)] shadow-sm'
                              : 'bg-white border-slate-300 text-slate-400'
                          }`}>
                            <step.icon className={`w-3.5 h-3.5 ${step.isCompleted ? 'text-white' : step.isCurrent ? 'text-[var(--color-primary)]' : 'text-slate-400'}`} />
                          </div>
                          {/* Status Info */}
                          <div className="flex-1 pt-0.5">
                            <p className={`text-xs font-medium ${step.isCompleted || step.isCurrent ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-500'}`}>
                              {step.label}
                            </p>
                            {step.isCurrent && assignment.trackingHistory && assignment.trackingHistory.find((h) => h.status === step.status) && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {assignment.trackingHistory.find((h) => h.status === step.status)?.timestamp}
                              </p>
                            )}
                            {step.isCompleted && assignment.trackingHistory && assignment.trackingHistory.find((h) => h.status === step.status) && (
                              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                                ✓ {assignment.trackingHistory.find((h) => h.status === step.status)?.timestamp}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medicines List */}
                  <div className="mb-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Medications:</p>
                    <div className="flex flex-wrap gap-2">
                      {assignment.medicines.map((med, medIdx) => (
                        <span key={medIdx} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs border border-emerald-200 dark:border-emerald-800 font-medium">
                          {med}
                        </span>
                      ))}
                    </div>
                    {assignment.dosage && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                        <strong>Dosage:</strong> {assignment.dosage}
                      </p>
                    )}
                    {assignment.duration && (
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        <strong>Duration:</strong> {assignment.duration}
                      </p>
                    )}
                  </div>

                  {/* Assignment Details */}
                  <div className="pt-3 border-t border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Assigned: {assignment.assignedDate} {assignment.assignedTime}</span>
                    {assignment.pharmacyPhone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {assignment.pharmacyPhone}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
