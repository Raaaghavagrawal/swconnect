import React, { useState } from 'react';
import { MessageSquare, Send, User, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[var(--color-primary)]" />
          Messages
        </h2>
        <div className="flex items-center gap-2">
          {['All', 'Unread', 'Urgent'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                filter === f
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                  : 'glass-card text-slate-700 dark:text-slate-300 border-emerald-100 dark:border-emerald-900/30 hover:border-[var(--color-primary)] hover:shadow-sm'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-16 glass-card">
            <MessageSquare className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400 font-medium">No messages found</p>
          </div>
        ) : (
          filteredMessages.map((msg, idx) => {
            const Icon = getIcon(msg.type, msg.priority);
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`glass-card p-4 hover:shadow-lg transition-shadow ${
                  !msg.isRead ? 'border-l-4 border-[var(--color-primary)]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    msg.priority === 'urgent' ? 'bg-red-100' :
                    msg.priority === 'high' ? 'bg-orange-100' :
                    'bg-blue-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      msg.priority === 'urgent' ? 'text-red-600' :
                      msg.priority === 'high' ? 'text-orange-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{msg.from}</span>
                      <div className="flex items-center gap-2">
                        {msg.priority && (
                          <span className={`px-2 py-0.5 text-xs rounded-full border ${priorityColors[msg.priority] || priorityColors.normal}`}>
                            {msg.priority}
                          </span>
                        )}
                        <span className="text-xs text-slate-500 dark:text-slate-400">{msg.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{msg.message}</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Send Message */}
      <div className="glass-card p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
