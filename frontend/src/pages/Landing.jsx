import React, { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';
import RoleLoginModal from '../components/landing/RoleLoginModal';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookConsultation = () => {
    navigate('/signup', { state: { role: 'User', mode: 'signup' } });
  };

  const handleLearnMore = () => {
    const featuresSection = document.querySelector('#services');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar onLoginClick={handleLoginClick} />
      <HeroSection 
        onBookConsultation={handleBookConsultation}
        onLearnMore={handleLearnMore}
      />
      <Features />
      <Testimonials />
      <Footer />
      <RoleLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
}
