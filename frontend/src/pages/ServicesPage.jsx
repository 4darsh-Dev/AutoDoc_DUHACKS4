import React from 'react';

import ServicesHero from '../components/ServicesHero';
import UserTypes from '../components/UserTypes';
import ServicesTiles from '../components/ServicesTiles';
import Testimonials from '../components/Testimonials';
import ParticleBackground from '../components/ParticleBackground';

const ServicesPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-10">
      <ParticleBackground />
      <ServicesHero />
      <UserTypes />
      <ServicesTiles />
      <Testimonials />
    </div>
  );
};

export default ServicesPage;
