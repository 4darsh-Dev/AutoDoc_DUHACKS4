import { Shield, FileCheck, Lock} from 'lucide-react';
import { motion } from 'framer-motion';


const Features = () => {
    const features = [
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Blockchain Security",
        description: "Immutable document storage with cutting-edge encryption"
      },
      {
        icon: <FileCheck className="w-8 h-8" />,
        title: "AI-Powered Verification",
        description: "Real-time fraud detection and document authentication"
      },
      {
        icon: <Lock className="w-8 h-8" />,
        title: "Zero-Knowledge Proofs",
        description: "Selective information disclosure while maintaining privacy"
      }
    ];
  
    return (
      <section className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="p-8 bg-gray-700/30 rounded-xl backdrop-blur-lg"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  };

export default Features;