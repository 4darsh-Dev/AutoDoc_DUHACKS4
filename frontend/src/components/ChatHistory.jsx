import { motion } from "framer-motion";

const ChatHistory = ({ chatHistory }) => {
  return (
    <motion.div
      className="flex-1 p-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`mb-4 ${chat.sender === "user" ? "text-right" : "text-left"}`}
        >
          <div
            className={`inline-block p-3 rounded-lg ${
              chat.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {chat.message}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default ChatHistory;