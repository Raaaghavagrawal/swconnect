import React from 'react';
import { User, Phone, Mail, MapPin, Droplet, Heart, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfileTab({ profile }) {
  const profileFields = [
    { label: 'Name', value: profile?.name, icon: User },
    { label: 'Age', value: `${profile?.age} years`, icon: Calendar },
    { label: 'Phone', value: profile?.phone, icon: Phone },
    { label: 'Email', value: profile?.email, icon: Mail },
    { label: 'Village', value: profile?.village, icon: MapPin },
    { label: 'Blood Group', value: profile?.bloodGroup, icon: Droplet },
    { label: 'Emergency Contact', value: profile?.emergencyContact, icon: Heart },
    { label: 'Address', value: profile?.address, icon: MapPin },
  ];

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
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-emerald-600 flex items-center justify-center shadow-lg">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">My Profile</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Personal information and details</p>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-emerald-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
          >
            {profile?.name?.charAt(0) || 'U'}
          </motion.div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{profile?.name}</h3>
            <p className="text-slate-600 dark:text-slate-400">{profile?.village}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profileFields.map((field, idx) => {
            const Icon = field.icon;
            return (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx + 0.2 }}
                className="p-4 glass-card rounded-lg border border-emerald-100 dark:border-emerald-900/30"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{field.label}</span>
                </div>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{field.value || 'Not provided'}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

