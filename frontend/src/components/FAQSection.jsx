import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does document verification work?",
      answer: "Documents are issued and verified using blockchain technology, ensuring tamper-proof authenticity.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, your data is stored securely on the blockchain and IPFS, with zero-knowledge proofs for privacy.",
    },
    {
      question: "Can I verify documents across different blockchains?",
      answer: "Yes, our platform supports cross-chain compatibility using Avalanche's Interchain Messaging.",
    },
    {
      question: "What types of documents can be verified?",
      answer: "You can verify academic transcripts, birth certificates, experience certificates, and more.",
    },
    {
      question: "How do I get started?",
      answer: "Simply sign up, upload your documents, and start verifying them with ease.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-12">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <ChevronDown
              className={`transform transition-transform ${activeIndex === index ? "rotate-180" : ""}`}
            />
          </div>
          {activeIndex === index && (
            <p className="mt-4 text-gray-600">{faq.answer}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FAQSection;