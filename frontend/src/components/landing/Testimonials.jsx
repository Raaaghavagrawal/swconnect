import { motion } from 'framer-motion';
import { MapPin, Quote, Star, TrendingUp, Users } from 'lucide-react';
import React from 'react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Farmer, Bihar',
    image: '👨‍🌾',
    text: 'SwasthyaConnect has made healthcare accessible in our village. I can now consult with doctors without traveling for hours.',
    rating: 5,
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'General Physician',
    image: '👩‍⚕️',
    text: 'The platform makes it easy to reach patients in remote areas. The health record system is comprehensive and user-friendly.',
    rating: 5,
  },
  {
    name: 'Anita Devi',
    role: 'Homemaker, Rajasthan',
    image: '👩',
    text: 'Getting medicines delivered to our doorstep is a blessing. The pharmacy integration saves us so much time and effort.',
    rating: 5,
  },
];

const impactStats = [
  { number: '50K+', label: 'Consultations Completed', icon: Users },
  { number: '500+', label: 'Verified Doctors', icon: MapPin },
  { number: '10K+', label: 'Active Users', icon: TrendingUp },
];

export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Improving Healthcare Access Across{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              India
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Join thousands of patients and doctors who trust SwasthyaConnect
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-emerald-100"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-emerald-200">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

