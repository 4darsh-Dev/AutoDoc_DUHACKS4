import { Star } from 'lucide-react';
import { motion } from 'framer-motion';


const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "By leveraging our industry-leading vector database, their enterprise platform team built an AI assistant that accurately and securely searches through millions of our documents.",
      author: "Sujith Joseph",
      role: "Principal Engineer, Enterprise AI & Search",
      company: "Cisco",
      logo: "/path/to/cisco-logo.svg"
    },
    {
      id: 2,
      quote: "Our choice wasn't just based on technology; it was rooted in their commitment to our success. They listened, understood, and delivered beyond our expectations.",
      author: "Jacob Eckel",
      role: "VP, R&D Division Manager",
      company: "Gong",
      logo: "/path/to/gong-logo.svg"
    }
  ];

  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="p-8 bg-white rounded-xl"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                  <p className="text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
