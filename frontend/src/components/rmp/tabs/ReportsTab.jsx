import React, { useState, useEffect } from 'react';
import { FileText, Save, Send, User, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';

const possibleDiseases = [
  'Fever',
  'Cough',
  'Headache',
  'Stomach Pain',
  'Cold',
  'Diarrhea',
  'Body Ache',
  'Dizziness',
];

const commonMedicines = [
  'Paracetamol',
  'Ibuprofen',
  'Antibiotic',
  'Antacid',
  'Cough Syrup',
  'Pain Relief',
  'Vitamins',
];

export default function ReportsTab({ patient, patients, onSave, onSubmit }) {
  const [selectedPatientId, setSelectedPatientId] = useState(patient?.id || '');
  const [formData, setFormData] = useState({
    temperature: '',
    bp: '',
    pulse: '',
    symptoms: [],
    customSymptoms: '',
    possibleDiseases: [],
    isSerious: false,
    treatment: [],
    notes: '',
  });

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);

  useEffect(() => {
    if (patient) {
      setSelectedPatientId(patient.id);
    }
  }, [patient]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field, item) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const handleSaveOffline = () => {
    onSave({ ...formData, patientId: selectedPatientId });
    alert('Visit saved offline. Will sync when connected.');
  };

  const handleSubmit = () => {
    if (!selectedPatientId) {
      alert('Please select a patient first');
      return;
    }
    onSubmit({ ...formData, patientId: selectedPatientId });
    alert('Report submitted to doctor successfully!');
    // Reset form
    setFormData({
      temperature: '',
      bp: '',
      pulse: '',
      symptoms: [],
      customSymptoms: '',
      possibleDiseases: [],
      isSerious: false,
      treatment: [],
      notes: '',
    });
  };

  return (
    <div className="space-y-6 animate-in">
      <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
        <FileText className="w-6 h-6 text-emerald-600" />
        Medical Report Form
      </h2>

      <form className="bg-white rounded-2xl border border-green-100 p-6 space-y-6 shadow-sm">
        {/* Patient Selection */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            Patient Information
          </h3>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="w-full px-4 py-2.5 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="">Select a patient...</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - {p.village} ({p.age} years)
              </option>
            ))}
          </select>
          {selectedPatient && (
            <div className="mt-4 bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <p className="text-slate-700">
                <strong>Name:</strong> {selectedPatient.name}
              </p>
              <p className="text-slate-700">
                <strong>Age:</strong> {selectedPatient.age} years
              </p>
              <p className="text-slate-700">
                <strong>Village:</strong> {selectedPatient.village}
              </p>
            </div>
          )}
        </section>

        {/* Vitals */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Vitals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Temperature (°F)
              </label>
              <input
                type="number"
                value={formData.temperature}
                onChange={(e) => handleChange('temperature', e.target.value)}
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="98.6"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Blood Pressure
              </label>
              <input
                type="text"
                value={formData.bp}
                onChange={(e) => handleChange('bp', e.target.value)}
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pulse (bpm)</label>
              <input
                type="number"
                value={formData.pulse}
                onChange={(e) => handleChange('pulse', e.target.value)}
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="72"
              />
            </div>
          </div>
        </section>

        {/* Symptoms */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Symptoms</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {['Fever', 'Cough', 'Headache', 'Stomach Pain', 'Cold', 'Diarrhea', 'Body Ache', 'Dizziness'].map(
              (symptom) => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => handleToggle('symptoms', symptom)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    formData.symptoms.includes(symptom)
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-green-200 hover:bg-emerald-50'
                  }`}
                >
                  {symptom}
                </button>
              )
            )}
          </div>
          <textarea
            value={formData.customSymptoms}
            onChange={(e) => handleChange('customSymptoms', e.target.value)}
            placeholder="Additional symptoms (free text)..."
            className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows="3"
          />
        </section>

        {/* AI Suggested Diseases */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">AI-Suggested Possible Diseases</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {possibleDiseases.map((disease) => (
                <button
                  key={disease}
                  type="button"
                  onClick={() => handleToggle('possibleDiseases', disease)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    formData.possibleDiseases.includes(disease)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50'
                  }`}
                >
                  {disease}
                </button>
              ))}
            </div>
            <p className="text-xs text-blue-700 mt-3">These are AI-suggested and for guidance only.</p>
          </div>
        </section>

        {/* Serious Case */}
        <section>
          <label className="flex items-center gap-3 cursor-pointer p-4 bg-red-50 rounded-lg border border-red-200">
            <input
              type="checkbox"
              checked={formData.isSerious}
              onChange={(e) => handleChange('isSerious', e.target.checked)}
              className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
            />
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-slate-700 font-medium">Serious Case (Send to Doctor Immediately)</span>
            </div>
          </label>
        </section>

        {/* Treatment Given */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Treatment Given</h3>
          <div className="flex flex-wrap gap-2">
            {commonMedicines.map((medicine) => (
              <button
                key={medicine}
                type="button"
                onClick={() => handleToggle('treatment', medicine)}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                  formData.treatment.includes(medicine)
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-green-200 hover:bg-emerald-50'
                }`}
              >
                {medicine}
              </button>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Additional Notes</h3>
          <textarea
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Any additional observations or notes..."
            className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            rows="4"
          />
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-green-200">
          <button
            type="button"
            onClick={handleSaveOffline}
            className="px-6 py-3 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Offline
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit to Doctor
          </button>
        </div>
      </form>
    </div>
  );
}

