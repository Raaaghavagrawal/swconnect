import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScheduleTab({ schedule, onCreateVisit }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getVisitsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return schedule.filter((visit) => visit.date === dateStr);
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const isToday = (date) => date && date.toDateString() === today.toDateString();

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-emerald-600" />
          Schedule
        </h2>
        <button
          onClick={() => onCreateVisit()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          New Visit
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-emerald-600" />
          </button>
          <h3 className="text-xl font-semibold text-slate-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-emerald-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((date, idx) => {
            const visits = getVisitsForDate(date);
            const hasVisits = visits.length > 0;
            return (
              <div
                key={idx}
                onClick={() => date && setSelectedDate(date)}
                className={`min-h-[80px] p-2 rounded-lg border transition-all cursor-pointer ${
                  date
                    ? isToday(date)
                      ? 'bg-emerald-50 border-emerald-300'
                      : hasVisits
                      ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                      : 'border-green-100 hover:bg-slate-50'
                    : 'border-transparent'
                }`}
              >
                {date && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(date) ? 'text-emerald-700' : 'text-slate-700'
                    }`}>
                      {date.getDate()}
                    </div>
                    {hasVisits && (
                      <div className="space-y-1">
                        {visits.slice(0, 2).map((visit) => (
                          <div
                            key={visit.id}
                            className="text-xs bg-emerald-600 text-white px-1 py-0.5 rounded truncate"
                          >
                            {visit.time}
                          </div>
                        ))}
                        {visits.length > 2 && (
                          <div className="text-xs text-slate-600">+{visits.length - 2}</div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Visits */}
      {selectedDate && (
        <div className="bg-white rounded-xl border border-green-100 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Visits on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>
          {getVisitsForDate(selectedDate).length === 0 ? (
            <p className="text-slate-600">No visits scheduled for this date</p>
          ) : (
            <div className="space-y-3">
              {getVisitsForDate(selectedDate).map((visit) => (
                <div
                  key={visit.id}
                  className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                        <User className="w-4 h-4 text-emerald-600" />
                        {visit.patientName}
                      </h4>
                      <div className="mt-2 space-y-1 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {visit.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {visit.village}
                        </div>
                        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs border border-emerald-200">
                          {visit.type}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-600 text-white">
                      {visit.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

