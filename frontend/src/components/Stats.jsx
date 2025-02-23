import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileCheck, Building, Award } from 'lucide-react';
import CountUp from 'react-countup';

const Stats = () => {
  // Stats data with icons and descriptions
  const statistics = [
    {
      icon: <Users className="w-8 h-8" />,
      value: 100000,
      suffix: "+",
      label: "Active Users",
      description: "Trusted by individuals and organizations"
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      value: 500000,
      suffix: "+",
      label: "Documents Verified",
      description: "Secure verification process"
    },
    {
      icon: <Building className="w-8 h-8" />,
      value: 150,
      suffix: "+",
      label: "Partner Institutions",
      description: "Growing network of trusted partners"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 99.9,
      suffix: "%",
      label: "Success Rate",
      description: "Accuracy in document verification"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900/50" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blue-500/5 transform -skew-y-12" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Transforming document verification across industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative group"
            >
              <div className="p-8 bg-gray-800/50 rounded-xl backdrop-blur-lg 
                            transform transition-all duration-300 
                            group-hover:scale-105 group-hover:bg-gray-700/50"
              >
                <div className="text-blue-400 mb-4 transform transition-transform 
                              group-hover:scale-110 group-hover:text-blue-300"
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
