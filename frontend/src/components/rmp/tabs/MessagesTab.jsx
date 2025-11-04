import React, { useState } from 'react';
import { MessageSquare, Send, Bell, BellOff, User, AlertTriangle, Info } from 'lucide-react';

const priorityColors = {
  urgent: 'bg-red-100 text-red-800 border-red-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  normal: 'bg-blue-100 text-blue-800 border-blue-300',
};

export default function MessagesTab({ messages, onSendMessage }) {
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'Unread') return !msg.isRead;
    if (filter === 'Urgent') return msg.priority === 'urgent';
    return true;
  });

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const getIcon = (type, priority) => {
    if (type === 'system') return Info;
    if (priority === 'urgent') return AlertTriangle;
    return User;
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-emerald-600" />
          Messages
        </h2>
        <div className="flex items-center gap-2">
          {['All', 'Unread', 'Urgent'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                filter === f
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-green-200 hover:bg-emerald-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="space-y-3">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-green-100">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">No messages found</p>
          </div>
        ) : (
          filteredMessages.map((message) => {
            const Icon = getIcon(message.type, message.priority);
            const priorityInfo = priorityColors[message.priority] || priorityColors.normal;
            return (
              <div
                key={message.id}
                className={`bg-white rounded-xl border border-green-100 p-5 hover:shadow-md transition-all ${
                  !message.isRead ? 'bg-emerald-50/50 border-emerald-200' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'doctor' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                          {message.from}
                          {!message.isRead && (
                            <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          )}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{message.timestamp}</p>
                      </div>
                      {message.priority && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border flex-shrink-0 ${priorityInfo}`}>
                          {message.priority}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Send Message */}
      <div className="bg-white rounded-xl border border-green-100 p-4 shadow-sm sticky bottom-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

