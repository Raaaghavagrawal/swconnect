import React, { useState } from 'react';
import { MessageSquare, Send, Search, User, Clock, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const priorityColors = {
  urgent: 'bg-red-100 text-red-800 border-red-300',
  high: 'bg-orange-100 text-orange-800 border-orange-300',
  normal: 'bg-blue-100 text-blue-800 border-blue-300',
};

const roleColors = {
  patient: 'bg-emerald-100 text-emerald-600',
  doctor: 'bg-blue-100 text-blue-600',
  rmp: 'bg-purple-100 text-purple-600',
};

export default function MessagesTab({ messages, onSendMessage, currentRole = 'patient' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredMessages = (messages || []).filter((msg) => {
    const matchesSearch = 
      msg.from?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      msg.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.role?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'Unread') return matchesSearch && !msg.isRead;
    if (filter === 'Urgent') return matchesSearch && msg.priority === 'urgent';
    return matchesSearch;
  });

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTimestamp = (ts) => {
    if (!ts) return 'Just now';
    if (typeof ts === 'string') return ts;
    if (ts.toDate) return ts.toDate().toLocaleString();
    if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleString();
    return new Date(ts).toLocaleString();
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
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Messages</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Communicate with healthcare providers</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {['All', 'Unread', 'Urgent'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition whitespace-nowrap ${
                filter === f
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                  : 'glass-card text-slate-700 dark:text-slate-300 border-emerald-100 dark:border-emerald-900/30 hover:border-[var(--color-primary)] hover:shadow-sm'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search messages by sender, content, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </motion.div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages */}
        <div className="lg:col-span-2 space-y-4 max-h-[600px] overflow-y-auto">
          <AnimatePresence mode="wait">
            {filteredMessages.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16 glass-card"
              >
                <MessageSquare className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400 font-medium">No messages found</p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Try adjusting your search or filters</p>
              </motion.div>
            ) : (
              filteredMessages.map((message, idx) => (
                <motion.div
                  key={message.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className={`glass-card p-4 hover:shadow-lg transition-all ${
                    !message.isRead ? 'border-l-4 border-[var(--color-primary)]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 ${
                      roleColors[message.role] || roleColors.patient
                    }`}>
                      {message.from?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100">{message.from || 'Unknown'}</h4>
                          {message.role && (
                            <span className={`px-2 py-0.5 text-xs rounded-full ${roleColors[message.role] || roleColors.patient} font-medium`}>
                              {message.role}
                            </span>
                          )}
                          {!message.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
                          )}
                        </div>
                        {message.priority && (
                          <span className={`px-2 py-0.5 text-xs rounded-full border ${priorityColors[message.priority] || priorityColors.normal}`}>
                            {message.priority}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(message.timestamp || message.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{message.message}</p>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Send Message */}
        <div className="lg:col-span-1">
          <div className="glass-card p-4 sticky top-20">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Send Message</h3>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              className="w-full px-3 py-2 border border-emerald-100 dark:border-emerald-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] glass-card text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 mb-3 resize-none"
              rows="6"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSend}
              className="w-full px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

