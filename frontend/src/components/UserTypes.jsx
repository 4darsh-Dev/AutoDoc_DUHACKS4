import { Users, Building, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';


const UserTypes = () => {
  const userTypes = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Individual Users",
      description: "Access and share your verified documents securely. View your complete document history and control who can access your credentials.",
      features: [
        "Secure document storage",
        "Selective sharing controls",
        "Real-time verification status"
      ]
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: "Issuing Authorities",
      description: "Issue tamper-proof digital documents with blockchain security. Perfect for educational institutions, government bodies, and organizations.",
      features: [
        "Batch document issuance",
        "Digital signature integration",
        "Automated verification process"
      ]
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Verifying Authorities",
      description: "Instantly verify document authenticity with our blockchain-powered verification system. Ideal for employers and regulatory bodies.",
      features: [
        "Quick verification process",
        "Fraud detection system",
        "Verification history tracking"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Built for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform serves different user types with specialized features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="text-blue-600 mb-6">{type.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {type.title}
              </h3>
              <p className="text-gray-600 mb-6">{type.description}</p>
              <ul className="space-y-3">
                {type.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <ArrowRight className="w-4 h-4 text-blue-600 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTypes;