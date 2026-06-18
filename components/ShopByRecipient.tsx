"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const recipients = [
  {
    title: "For Her",
    description: "Beautiful gifts that she'll cherish",
    emoji: "👩",
    gradient: "from-pink-100 to-rose-100",
    hoverGradient: "from-pink-200 to-rose-200",
    link: "/shop?recipient=her"
  },
  {
    title: "For Him",
    description: "Thoughtful gifts he'll appreciate",
    emoji: "👨",
    gradient: "from-blue-100 to-indigo-100",
    hoverGradient: "from-blue-200 to-indigo-200",
    link: "/shop?recipient=him"
  },
  {
    title: "For Kids",
    description: "Delightful gifts for little ones",
    emoji: "👶",
    gradient: "from-yellow-100 to-orange-100",
    hoverGradient: "from-yellow-200 to-orange-200",
    link: "/shop?recipient=kids"
  },
  {
    title: "For Friends",
    description: "Perfect gifts for your besties",
    emoji: "👯",
    gradient: "from-purple-100 to-pink-100",
    hoverGradient: "from-purple-200 to-pink-200",
    link: "/shop?recipient=friends"
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

export default function ShopByRecipient() {
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
          Shop by Recipient
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect gift for everyone special in your life
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {recipients.map((recipient, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link
              href={recipient.link}
              className="block group"
            >
              <div className={`card p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${recipient.gradient} hover:${recipient.hoverGradient}`}>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {recipient.emoji}
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                  {recipient.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {recipient.description}
                </p>
                <span className="inline-flex items-center gap-2 text-purple-600 font-medium group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// Made with Bob
