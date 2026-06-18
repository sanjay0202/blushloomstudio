"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Happy Customer",
    content: "The custom bouquet I ordered was absolutely stunning! The attention to detail and quality of craftsmanship exceeded my expectations. Highly recommend!",
    rating: 5,
    image: "👩"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Repeat Customer",
    content: "I've ordered multiple keychains as gifts, and each one has been unique and beautifully made. The personalization options are fantastic!",
    rating: 5,
    image: "👨"
  },
  {
    id: 3,
    name: "Ananya Patel",
    role: "Wedding Client",
    content: "Blushloom Studio created the most beautiful accessories for my wedding. Everything was perfect, from the ribbons to the floral arrangements!",
    rating: 5,
    image: "👰"
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Corporate Client",
    content: "Ordered custom keychains for our team. The quality and delivery were excellent. Will definitely order again for future events!",
    rating: 5,
    image: "👔"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-white to-purple-50 py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-purple-300" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">1000+</div>
              <div className="text-sm text-gray-600">Orders Completed</div>
            </div>
            <div className="h-12 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Made with Bob
