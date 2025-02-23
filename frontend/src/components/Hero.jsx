import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Revolutionizing Document Verification
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Secure, efficient, and transparent document verification powered by blockchain 
            and artificial intelligence.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16"
        >
          <div className="relative w-full h-64 md:h-96">
            <div className="absolute inset-0 bg-blue-500/10 rounded-lg backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
