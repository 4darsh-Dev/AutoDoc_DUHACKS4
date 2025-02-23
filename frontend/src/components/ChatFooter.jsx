import { motion } from "framer-motion";
import { Home, MessageCircle } from "lucide-react";

const ChatFooter = ({ activeTab, setActiveTab }) => {
  return (
    <motion.div
      className="bg-white p-2 border-t border-gray-200 flex justify-around"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => setActiveTab("home")}
        className={`flex flex-col items-center ${
          activeTab === "home" ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <Home size={24} />
        <span className="text-sm">Home</span>
      </button>
      <button
        onClick={() => setActiveTab("messages")}
        className={`flex flex-col items-center ${
          activeTab === "messages" ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <MessageCircle size={24} />
        <span className="text-sm">Messages</span>
      </button>
    </motion.div>
  );
};

export default ChatFooter;