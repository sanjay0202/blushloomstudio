"use client";

import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const instagramPosts = [
  {
    id: 1,
    image: '/assets/Flowers-and-bouquet/2.jpeg',
    alt: 'Handcrafted flower bouquet'
  },
  {
    id: 2,
    image: '/assets/keychain/8.jpeg',
    alt: 'Custom keychain design'
  },
  {
    id: 3,
    image: '/assets/ribbon-and-clips/7.jpeg',
    alt: 'Elegant ribbon and clips'
  },
  {
    id: 4,
    image: '/assets/Flowers-and-bouquet/3.jpeg',
    alt: 'Beautiful floral arrangement'
  },
  {
    id: 5,
    image: '/assets/keychain/9.jpeg',
    alt: 'Personalized keychain'
  },
  {
    id: 6,
    image: '/assets/Flowers-and-bouquet/4.jpeg',
    alt: 'Handmade flower bouquet'
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function InstagramGallery() {
  return (
    <section className="container-custom section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium mb-4">
          <Instagram className="w-4 h-4" />
          <span>Follow Us on Instagram</span>
        </div>
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
          See Our Latest Creations
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get inspired by our handcrafted pieces and join our creative community
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {instagramPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
          >
            <Image
              src={post.image}
              alt={post.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <Instagram className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">View on Instagram</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12"
      >
        <a
          href="https://instagram.com/blushloomstudio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 shadow-lg"
        >
          <Instagram className="w-5 h-5" />
          Follow @blushloomstudio
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
}

// Made with Bob
