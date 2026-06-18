"use client";

import { motion } from 'framer-motion';
import { Heart, Truck, Sparkles, Shield, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: "Handcrafted with Love",
    description: "Each item is carefully crafted by hand with attention to detail and passion",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Sparkles,
    title: "Unique Designs",
    description: "One-of-a-kind pieces that you won't find anywhere else",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep across India",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Premium materials and craftsmanship in every product",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Clock,
    title: "Custom Orders",
    description: "Personalize your items to make them uniquely yours",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: Award,
    title: "Customer Satisfaction",
    description: "500+ happy customers with 4.9 average rating",
    color: "from-yellow-500 to-orange-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function WhyChooseUs() {
  return (
    <section className="container-custom section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          Why Choose Blushloom Studio?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're committed to delivering exceptional handcrafted products and outstanding service
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="card p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Additional Trust Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Join Our Growing Community
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Be part of a community that values handcrafted quality, unique designs, and personalized service. Every purchase supports local artisans and sustainable craftsmanship.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>Eco-Friendly Materials</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>Supporting Local Artisans</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span>Sustainable Practices</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Made with Bob
