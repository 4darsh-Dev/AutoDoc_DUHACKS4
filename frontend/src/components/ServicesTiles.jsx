import { motion } from "framer-motion";

const ServicesTiles = () => {
    const services = [
      {
        title: "Document Issuance",
        description: "Issue blockchain-verified documents with digital signatures",
        icon: "📄"
      },
      {
        title: "Instant Verification",
        description: "Verify document authenticity in seconds",
        icon: "✓"
      },
      {
        title: "Secure Storage",
        description: "Store documents with military-grade encryption",
        icon: "🔒"
      },
      {
        title: "Access Control",
        description: "Manage document sharing permissions",
        icon: "🔑"
      },
      {
        title: "Audit Trail",
        description: "Track document history and verification attempts",
        icon: "📊"
      },
      {
        title: "API Integration",
        description: "Seamless integration with existing systems",
        icon: "⚡"
      }
    ];
  
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive document management solutions powered by blockchain
            </p>
          </motion.div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group p-8 bg-white rounded-xl hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default ServicesTiles;
