import { motion } from 'framer-motion';
import { BarChart3, Pill, Video, WifiOff } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useImageSearch } from '../../hooks/useImageSearch';

const features = [
  {
    icon: Video,
    title: 'Teleconsultation Made Simple',
    description: 'Connect with doctors instantly through secure video consultations. Get medical advice from the comfort of your home, anytime, anywhere.',
    gradient: 'from-emerald-500 to-emerald-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Pill,
    title: 'Smart Pharmacy Connection',
    description: 'Order medicines directly from integrated pharmacies. Get prescriptions delivered to your doorstep with real-time tracking and reminders.',
    gradient: 'from-teal-500 to-teal-600',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    icon: BarChart3,
    title: 'Health Data & Analytics',
    description: 'Track your health metrics with AI-powered insights. Monitor vital signs, medication adherence, and get personalized health recommendations.',
    gradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-gradient-to-br from-emerald-100 to-teal-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: WifiOff,
    title: 'Works Offline in Rural Areas',
    description: 'Access your health records and schedule consultations even without internet. Sync data automatically when connection is available.',
    gradient: 'from-purple-500 to-pink-600',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
];

export default function Features() {
  const queries = useMemo(() => [
    'rural healthcare india',
    'village doctor',
    'telemedicine india',
    'health worker rural',
  ], []);
  const { images } = useImageSearch({ queries, perPage: 8 });
  const localImages = [
    '/images/village-clinic.jpg',
    '/images/telemedicine-india.jpg',
    '/images/rural-doctor.jpg',
    '/images/health-worker.jpg',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Better Healthcare
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed for rural communities across India
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const img = images?.[index];
            const [loaded, setLoaded] = useState(false);
            const [src, setSrc] = useState(localImages[index % localImages.length]);
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Optional top image */}
                  {(
                    <div className="-mx-6 -mt-6 mb-4 relative h-40">
                      <img
                        src={src}
                        alt={img?.alt || feature.title}
                        loading="lazy"
                        onLoad={() => setLoaded(true)}
                        onError={() => {
                          if (img?.url) setSrc(img.url);
                        }}
                        className={`w-full h-full object-cover transition-all duration-700 ${loaded ? 'blur-0 scale-100 opacity-100' : 'blur-md scale-105 opacity-0'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                    </div>
                  )}
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

