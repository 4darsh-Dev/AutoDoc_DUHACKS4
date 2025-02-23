import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesHero = () => {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Blockchain solutions for every kind of document
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Secure, transparent, and efficient document verification powered by cutting-edge blockchain technology
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Start a Free Trial
              </button>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Get a Demo
              </button>
            </div>
          </motion.div>

          {/* Right content - Decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl">
                {/* Add decorative elements here */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
