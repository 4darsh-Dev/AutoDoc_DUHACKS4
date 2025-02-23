import { motion } from "framer-motion";
import { MessageCircle, Home } from "lucide-react";
import autoDocLogo from "../assets/img/autodoc-logo.png";

const ChatHeader = ({ activeTab, setActiveTab }) => {
  return (
    <motion.div
      className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-lg flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <img src={autoDocLogo} alt="AutoDoc" className="h-8" />
        <h1 className="text-white text-xl font-bold">Support</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
          <div className="w-6 h-6 bg-pink-400 rounded-full"></div>
          <div className="w-6 h-6 bg-green-400 rounded-full"></div>
          <div className="w-6 h-6 bg-green-400 rounded-full"></div>
        </div>
        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;