import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="p-4 border-t border-gray-200 flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        placeholder="Ask a question"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="ml-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        <Send size={20} />
      </button>
    </motion.form>
  );
};

export default ChatInput;