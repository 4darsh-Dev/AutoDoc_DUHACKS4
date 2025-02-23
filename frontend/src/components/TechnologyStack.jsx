import { Brain, HardDrive, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const TechnologyStack = () => {
    const technologies = [
      { name: "Blockchain", icon: <Database className="w-8 h-8" /> },
      { name: "AI/ML", icon: <Brain className="w-8 h-8" /> },
      { name: "IPFS", icon: <HardDrive className="w-8 h-8" /> }
    ];
  
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Technology Stack</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="flex flex-col items-center p-8 bg-gray-700/30 rounded-xl"
              >
                <div className="text-blue-400 mb-4">{tech.icon}</div>
                <h3 className="text-xl font-semibold text-white">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default TechnologyStack;
