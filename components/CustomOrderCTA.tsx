"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Palette, Instagram } from 'lucide-react';

export default function CustomOrderCTA() {
  return (
    <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white py-20 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Personalized Just for You</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Ready to Create Something Special?
            </h2>
            
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Let us bring your vision to life with our custom order service. Every piece is handcrafted with love and attention to detail.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Palette className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Custom Design</h3>
                <p className="text-sm text-purple-100">
                  Choose colors, styles, and personalization options
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Instagram className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Direct Communication</h3>
                <p className="text-sm text-purple-100">
                  Work directly with us via Instagram
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <Sparkles className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Handcrafted Quality</h3>
                <p className="text-sm text-purple-100">
                  Each piece made with care and precision
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/custom-order"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all hover:scale-105 shadow-xl"
              >
                Start Custom Order
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Made with Bob
