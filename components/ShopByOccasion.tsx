"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const occasions = [
  {
    title: "Birthday",
    description: "Make their special day memorable",
    emoji: "🎂",
    color: "bg-pink-500",
    link: "/shop?occasion=birthday"
  },
  {
    title: "Anniversary",
    description: "Celebrate love and togetherness",
    emoji: "💝",
    color: "bg-red-500",
    link: "/shop?occasion=anniversary"
  },
  {
    title: "Wedding",
    description: "Perfect gifts for the big day",
    emoji: "💒",
    color: "bg-purple-500",
    link: "/shop?occasion=wedding"
  },
  {
    title: "Graduation",
    description: "Congratulate their achievement",
    emoji: "🎓",
    color: "bg-blue-500",
    link: "/shop?occasion=graduation"
  },
  {
    title: "Thank You",
    description: "Show your appreciation",
    emoji: "🙏",
    color: "bg-green-500",
    link: "/shop?occasion=thankyou"
  },
  {
    title: "Just Because",
    description: "Surprise someone special",
    emoji: "✨",
    color: "bg-yellow-500",
    link: "/shop?occasion=justbecause"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function ShopByOccasion() {
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
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Shop by Occasion
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect gift for every special moment
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {occasions.map((occasion, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={occasion.link}
                className="block group"
              >
                <div className="card p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 mx-auto mb-4 ${occasion.color} rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                    {occasion.emoji}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    {occasion.title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-3">
                    {occasion.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-purple-600 font-medium text-sm group-hover:gap-2 transition-all">
                    Shop <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Made with Bob
