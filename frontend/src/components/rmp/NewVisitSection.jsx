import React, { useState } from 'react';

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

export default function NewVisitSection({ patient, onSave, onSubmit }) {
  const [formData, setFormData] = useState({
    patientId: patient?.id || '',
    temperature: '',
    bp: '',
    pulse: '',
    symptoms: [],
    customSymptoms: '',
    possibleDiseases: [],
    isSerious: false,
    treatment: [],
    photos: [],
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSymptomToggle = (symptom) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleDiseaseToggle = (disease) => {
    setFormData((prev) => ({
      ...prev,
      possibleDiseases: prev.possibleDiseases.includes(disease)
        ? prev.possibleDiseases.filter((d) => d !== disease)
        : [...prev.possibleDiseases, disease],
    }));
  };

  const handleTreatmentToggle = (medicine) => {
    setFormData((prev) => ({
      ...prev,
      treatment: prev.treatment.includes(medicine)
        ? prev.treatment.filter((m) => m !== medicine)
        : [...prev.treatment, medicine],
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const handleSaveOffline = () => {
    onSave(formData);
    alert('Visit saved offline. Will sync when connected.');
  };

  const handleSubmitToDoctor = () => {
    if (!formData.patientId) {
      alert('Please select a patient first');
      return;
    }
    onSubmit(formData);
    alert('Visit submitted to doctor successfully!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">New Visit / Report Form</h2>

      <form className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
        {/* Patient Info */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Patient Information</h3>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-slate-700">
              <strong>Name:</strong> {patient?.name || 'Select patient from Assigned Patients'}
            </p>
            <p className="text-slate-700">
              <strong>Age:</strong> {patient?.age || '-'} years
            </p>
            <p className="text-slate-700">
              <strong>Village:</strong> {patient?.village || '-'}
            </p>
          </div>
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pulse (bpm)</label>
              <input
                type="number"
                value={formData.pulse}
                onChange={(e) => handleChange('pulse', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="72"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">Enter approximate values if exact measurements are unavailable.</p>
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
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    formData.symptoms.includes(symptom)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
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
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  onClick={() => handleDiseaseToggle(disease)}
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

        {/* Serious Case Checkbox */}
        <section>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isSerious}
              onChange={(e) => handleChange('isSerious', e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="text-slate-700 font-medium">
              Serious Case (Send to Doctor) 🔴
            </span>
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
                onClick={() => handleTreatmentToggle(medicine)}
                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                  formData.treatment.includes(medicine)
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {medicine}
              </button>
            ))}
          </div>
        </section>

        {/* Photo Upload */}
        <section>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Photo Upload</h3>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {formData.photos.length > 0 && (
            <p className="mt-2 text-sm text-slate-600">
              {formData.photos.length} photo(s) selected
            </p>
          )}
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleSaveOffline}
            className="px-6 py-3 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            Save Offline
          </button>
          <button
            type="button"
            onClick={handleSubmitToDoctor}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Submit to Doctor
          </button>
        </div>
      </form>
    </div>
  );
}

