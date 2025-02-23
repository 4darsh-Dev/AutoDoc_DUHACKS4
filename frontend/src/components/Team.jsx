import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Team = () => {
  const team = [
    {
      name: "Aman Singh",
      role: "Web & Blockchain Development",
      image: "https://auto-doc-seven.vercel.app/as-pic.jpg",
      bio: "Expert in web and blockchain technology",
      social: {
        linkedin: "https://www.linkedin.com/in/adarsh-maurya-dev/",
        twitter: "#",
        email: "amanforwork1@gmail.com"
      }
    },
    {
      name: "Adarsh Maurya",
      role: "Web and ML Development",
      image: "https://auto-doc-seven.vercel.app/am-pic.png",
      bio: "Building Real world problem solving solutions leveraging Technology",
      social: {
        linkedin: "https://www.linkedin.com/in/adarsh-maurya-dev/",
        twitter: "#",
        email: "adarshmaurya9415@gmail.com"
      }
    },
    // {
    //   name: "Priya Patel",
    //   role: "Security Architecture Lead",
    //   image: "/api/placeholder/300/300",
    //   bio: "Expert in zero-knowledge proofs and system security",
    //   social: {
    //     linkedin: "#",
    //     twitter: "#",
    //     email: "priya@example.com"
    //   }
    // }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experts driving innovation in document verification
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative group"
            >
              <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-lg 
                            transform transition-all duration-300 
                            group-hover:bg-gray-700/50"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 
                                via-transparent to-transparent opacity-0 
                                group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-300 mb-4">{member.bio}</p>

                <div className="flex space-x-4">
                  <a href={member.social.linkedin} className="text-gray-400 
                    hover:text-blue-400 transition-colors duration-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={member.social.twitter} className="text-gray-400 
                    hover:text-blue-400 transition-colors duration-300">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${member.social.email}`} className="text-gray-400 
                    hover:text-blue-400 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;