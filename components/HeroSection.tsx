"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Heart, Sparkles, Star } from 'lucide-react';

const floatingProducts = [
  {
    name: 'Flower Bouquet',
    image: '/assets/Flowers-and-bouquet/3.jpeg',
    label: 'Best Seller',
    icon: Heart,
    className: 'top-16 left-[6%] rotate-[-10deg]',
    accent: 'from-pink-300/80 via-rose-300/70 to-fuchsia-300/80',
    animation: {
      y: [0, -18, 0],
      x: [0, 10, 0],
      rotate: [-10, -6, -10],
    },
    duration: 8,
  },
  {
    name: 'Cute Keychain',
    image: '/assets/keychain/11.jpeg',
    label: 'Cute Pick',
    icon: Star,
    className: 'top-24 right-[8%] rotate-[12deg]',
    accent: 'from-yellow-300/80 via-orange-300/70 to-pink-300/80',
    animation: {
      y: [0, 16, 0],
      x: [0, -12, 0],
      rotate: [12, 6, 12],
    },
    duration: 9,
  },
  {
    name: 'Ribbon Clip',
    image: '/assets/ribbon-and-clips/19.jpeg',
    label: 'New Style',
    icon: Gift,
    className: 'bottom-28 left-[10%] rotate-[8deg]',
    accent: 'from-cyan-300/80 via-sky-300/70 to-violet-300/80',
    animation: {
      y: [0, -14, 0],
      x: [0, 14, 0],
      rotate: [8, 14, 8],
    },
    duration: 10,
  },
];

const sparkleDots = [
  'top-[18%] left-[22%]',
  'top-[28%] right-[24%]',
  'bottom-[30%] left-[28%]',
  'bottom-[22%] right-[18%]',
  'top-[42%] left-[12%]',
  'top-[58%] right-[34%]',
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),_transparent_30%),linear-gradient(135deg,_#7c3aed_0%,_#ec4899_35%,_#f97316_68%,_#22c55e_100%)] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_35%,rgba(255,255,255,0.12)_65%,transparent)]"></div>
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Animated background glow */}
      <motion.div
        className="absolute top-12 left-8 h-72 w-72 rounded-full bg-pink-200/25 blur-3xl"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-8 h-96 w-96 rounded-full bg-violet-200/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-200/20 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.35, 0.18],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating product cards */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {floatingProducts.map((product, index) => {
          const Icon = product.icon;

          return (
            <motion.div
              key={product.name}
              className={`absolute ${product.className} w-44 xl:w-52`}
              animate={product.animation}
              transition={{
                duration: product.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.4,
              }}
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/25 bg-white/14 p-3 shadow-2xl backdrop-blur-xl">
                <div className={`absolute inset-x-3 top-3 h-16 rounded-2xl bg-gradient-to-r ${product.accent} blur-2xl`} />
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={320}
                    className="h-40 w-full rounded-[1.5rem] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
                </div>
                <div className="relative mt-3 flex items-center justify-between rounded-2xl bg-white/18 px-3 py-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
                      {product.label}
                    </p>
                    <p className="text-sm font-semibold text-white">{product.name}</p>
                  </div>
                  <div className="rounded-full bg-white/20 p-2">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sparkles */}
      <div className="pointer-events-none absolute inset-0">
        {sparkleDots.map((position, index) => (
          <motion.div
            key={position}
            className={`absolute ${position} flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm`}
            animate={{
              scale: [0.9, 1.2, 0.9],
              opacity: [0.35, 0.9, 0.35],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3 + index * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          >
            <Sparkles className="h-4 w-4 text-yellow-100" />
          </motion.div>
        ))}
      </div>
      
      <div className="container-custom section-padding relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-8 py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Handcrafted with Love</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-serif font-bold leading-tight md:text-7xl"
          >
            Blushloom Studio
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto max-w-2xl text-xl text-pink-50 md:text-2xl"
          >
            Discover unique handcrafted flowers, keychains, and accessories designed to delight
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link 
              href="/shop"
              className="btn-primary flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-[0_20px_60px_rgba(255,255,255,0.25)] transition-all hover:scale-105 hover:bg-purple-50"
            >
              Explore Collections
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/custom-order"
              className="btn-outline rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-purple-600"
            >
              Custom Orders
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

// Made with Bob
