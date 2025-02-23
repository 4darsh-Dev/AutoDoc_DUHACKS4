// import { useState } from "react";
// import { motion } from "framer-motion";
// import {Client }  from "@gradio/client"
// import ChatHeader from "./ChatHeader";
// import ChatHistory from "./ChatHistory";
// import ChatInput from "./ChatInput";
// import ChatFooter from "./ChatFooter";


// const Chatbot = () => {
//   const [activeTab, setActiveTab] = useState("home");
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleSendMessage = async (message) => {
//     // Add user message to chat history
//     setChatHistory([...chatHistory, { sender: "user", message }]);

//        // AI activity endpoint
//        const client = await Client.connect("AiActivity/AI-Assistant");
//        const rolePrompt = "You role is chatbot assistant with good conversational skills, Keep the output short (30 to 40) words maximum and You're working on AutoDoc : Decentralized Document Verification using Avalance Blockchain and AI. Built by Team Solve-Ease  "
 
//        const finalPrompt = `Role: ${rolePrompt}    
//        User : ${message}
//        `
       
//        const result = await client.predict("/chat", { message: { text: finalPrompt, files: [] } });
//        console.log(result)
//        const botResponse = result.data[0]
//     // const data = await response.json();
//     setChatHistory([...chatHistory, { sender: "user", message }, { sender: "bot", message: botResponse }]);
//   };

//   return (
//     <motion.div
//       className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-lg flex flex-col"
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       <ChatHeader activeTab={activeTab} setActiveTab={setActiveTab} />
//       <ChatHistory chatHistory={chatHistory} />
//       <ChatInput onSendMessage={handleSendMessage} />
//       <ChatFooter activeTab={activeTab} setActiveTab={setActiveTab} />
//     </motion.div>
//   );
// };

// export default Chatbot;

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Client } from "@gradio/client";
import ChatHeader from "./ChatHeader";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import ChatFooter from "./ChatFooter";

const Chatbot = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat dialog visibility

  const handleSendMessage = async (message) => {
    // Add user message to chat history
    setChatHistory((prev) => [...prev, { sender: "user", message }]);

    try {
      // AI activity endpoint
      const client = await Client.connect("AiActivity/AI-Assistant");
      const rolePrompt =
        "You role is chatbot assistant with good conversational skills, Keep the output short (30 to 40) words maximum and You're working on AutoDoc : Decentralized Document Verification using Avalance Blockchain and AI. Built by Team Solve-Ease";

      const finalPrompt = `Role: ${rolePrompt}    
      User : ${message}
      `;

      const result = await client.predict("/chat", { message: { text: finalPrompt, files: [] } });
      console.log(result);
      const botResponse = result.data[0];

      // Add bot's response to chat history
      setChatHistory((prev) => [...prev, { sender: "bot", message: botResponse }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      // Add an error message to chat history
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: "Sorry, I'm unable to respond at the moment. Please try again later." },
      ]);
    }
  };

  return (
    <>
      {/* Chat Icon */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Dialog Box */}
      {isChatOpen && (
        <motion.div
          className="fixed bottom-24 right-6 w-96 h-[82vh] bg-white rounded-lg shadow-lg flex flex-col"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ChatHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          <ChatHistory chatHistory={chatHistory} />
          <ChatInput onSendMessage={handleSendMessage} />
          <ChatFooter activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;