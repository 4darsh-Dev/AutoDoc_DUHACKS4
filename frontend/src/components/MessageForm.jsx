import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare } from "lucide-react";

const MessageForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form Data:", formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
      </div>
      <div className="mt-6 relative">
        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mt-6 relative">
        <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <div className="mt-6">
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          rows="5"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Send Message
      </button>
    </motion.form>
  );
};

export default MessageForm;