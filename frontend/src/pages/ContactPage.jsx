import { motion } from "framer-motion";
import ParticleBackground from "../components/ParticleBackground";
import MessageForm from "../components/MessageForm";
import FAQSection from "../components/FAQSection";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ParticleBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-blue-600 mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 mb-12">
              Have questions? Reach out to us and we'll get back to you shortly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <MessageForm />
            <FAQSection />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;