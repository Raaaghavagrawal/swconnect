import React, { useState } from 'react';
import { Package, Search, Plus, Clock, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

const statusConfig = {
  Pending: { icon: Clock, color: 'yellow', bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800' },
  'In Transit': { icon: Truck, color: 'blue', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
  Delivered: { icon: CheckCircle2, color: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800' },
};

export default function MedicineRequestsTab({ requests, patients, onCreateRequest }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    medicines: [],
    pharmacy: '',
  });

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = () => {
    onCreateRequest(formData);
    setShowForm(false);
    setFormData({ patientId: '', medicines: [], pharmacy: '' });
    alert('Medicine request created successfully!');
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Package className="w-6 h-6 text-emerald-600" />
          Medicine Requests
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      {/* New Request Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Create Medicine Request</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Patient</label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select patient...</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {p.village}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Medicines (comma separated)</label>
              <input
                type="text"
                value={formData.medicines.join(', ')}
                onChange={(e) => setFormData({ ...formData, medicines: e.target.value.split(',').map(m => m.trim()) })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Paracetamol, Antibiotic, Cough Syrup"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pharmacy</label>
              <input
                type="text"
                value={formData.pharmacy}
                onChange={(e) => setFormData({ ...formData, pharmacy: e.target.value })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Village Pharmacy A"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Pending', 'In Transit', 'Delivered'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition whitespace-nowrap ${
                statusFilter === s
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-green-200 hover:bg-emerald-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-green-100">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600">No medicine requests found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((request) => {
            const statusInfo = statusConfig[request.status] || statusConfig.Pending;
            const StatusIcon = statusInfo.icon;
            return (
              <div
                key={request.id}
                className={`bg-white rounded-xl border ${statusInfo.border} p-5 hover:shadow-md transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{request.patientName}</h3>
                    <p className="text-sm text-slate-600 mt-1">{request.pharmacy}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bg} ${statusInfo.border} border`}>
                    <StatusIcon className={`w-4 h-4 ${statusInfo.text}`} />
                    <span className={`text-xs font-medium ${statusInfo.text}`}>{request.status}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-medium text-slate-700 mb-2">Medicines:</p>
                  <div className="flex flex-wrap gap-2">
                    {request.medicines.map((med, idx) => (
                      <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs border border-emerald-200">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-green-100">
                  <span>Requested: {request.requestedDate}</span>
                  {request.estimatedDelivery && (
                    <span>Est. Delivery: {request.estimatedDelivery}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

