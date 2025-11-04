import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Users, Calendar } from 'lucide-react';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function AnalyticsTab({ analyticsData, stats }) {
  return (
    <div className="space-y-6 animate-in">
      <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-emerald-600" />
        Analytics
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-green-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Total Visits</span>
            <Calendar className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.totalVisits || 24}</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Completed</span>
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.completedVisits || 18}</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Active Patients</span>
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.activePatients}</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Referred Cases</span>
            <TrendingUp className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.referredCases || 2}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases by Month - Line Chart */}
        <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Cases by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.casesByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cases"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
                name="Cases"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Visits by Type - Pie Chart */}
        <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Visits by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.visitsByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {analyticsData.visitsByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution - Bar Chart */}
        <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.statusDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="status" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

