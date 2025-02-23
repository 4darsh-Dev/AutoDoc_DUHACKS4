import React from 'react';

import Hero from '../components/Hero';
import Features from '../components/Features';
import TechnologyStack from '../components/TechnologyStack';
import Stats from '../components/Stats';
import Team from '../components/Team';
import ParticleBackground from '../components/ParticleBackground';

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <ParticleBackground />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <Features />
      
      {/* Technology Stack */}
      <TechnologyStack />
      
      {/* Statistics */}
      <Stats />
      
      {/* Team Section */}
      <Team />
    </div>
  );
};

export default AboutPage;