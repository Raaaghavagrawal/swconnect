import { motion } from 'framer-motion';
import { Activity, ArrowRight, Calendar, Heart, PlayCircle, Users } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useImageSearch } from '../../hooks/useImageSearch';

export default function HeroSection({ onBookConsultation, onLearnMore }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const queries = useMemo(() => [
    'rural healthcare india',
    'village doctor',
    'telemedicine india',
    'health worker rural',
  ], []);

  const { images } = useImageSearch({ queries, perPage: 6 });
  const heroImage = images?.[0];
  const [bgLoaded, setBgLoaded] = useState(false);
  const [heroSrc, setHeroSrc] = useState('/images/rural-doctor.jpg');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background image with gradient overlay and blur-up */}
      <div className="absolute inset-0 -z-10">
        {/* Fallback soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50" />
        <>
          <img
            src={heroSrc}
            alt={heroImage?.alt || 'Rural healthcare'}
            loading="eager"
            onLoad={() => setBgLoaded(true)}
            onError={() => {
              if (heroImage?.url) setHeroSrc(heroImage.url);
            }}
            className={`absolute inset-0 w-full h-full object-cover transform transition-all duration-700 ${bgLoaded ? 'scale-100 blur-0 opacity-100' : 'scale-105 blur-md opacity-0'}`}
          />
          {/* Soft green overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-emerald-600/20 to-teal-600/10" />
        </>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
            >
              Connecting Rural{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Healthcare Seamlessly
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              Telemedicine, AI diagnosis, and health record management — anytime, anywhere.
              <br />
              <span className="text-gray-500">
                Empowering rural communities with accessible, affordable healthcare solutions.
              </span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBookConsultation}
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book a Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLearnMore}
                className="px-8 py-4 bg-white border-2 border-emerald-200 text-emerald-700 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5" />
                Learn More
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">10K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">500+ Verified Doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-sm text-gray-600">50K+ Consultations</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />

                {/* Illustration Content */}
                <div className="relative z-10 space-y-6">
                  {/* Main Doctor-Patient Icon */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="flex justify-center"
                  >
                    <div className="w-48 h-48 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl">
                      <Users className="w-24 h-24 text-white" />
                    </div>
                  </motion.div>

                  {/* Feature Icons Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-emerald-100 flex flex-col items-center gap-2"
                    >
                      <Heart className="w-8 h-8 text-red-500" />
                      <span className="text-xs font-semibold text-gray-700">Health Care</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-teal-100 flex flex-col items-center gap-2"
                    >
                      <Activity className="w-8 h-8 text-teal-500" />
                      <span className="text-xs font-semibold text-gray-700">Telemedicine</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-emerald-100 flex flex-col items-center gap-2"
                    >
                      <Users className="w-8 h-8 text-emerald-600" />
                      <span className="text-xs font-semibold text-gray-700">Connect</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-400/30 backdrop-blur-sm rounded-2xl border border-emerald-200/50 shadow-lg"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-teal-400/30 backdrop-blur-sm rounded-2xl border border-teal-200/50 shadow-lg"
              />
            </div>
          </motion.div>

          {/* Mobile Illustration */}
          <motion.div
            variants={itemVariants}
            className="relative lg:hidden mt-8"
          >
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
              <div className="relative z-10 flex justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl"
                >
                  <Users className="w-16 h-16 text-white" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

