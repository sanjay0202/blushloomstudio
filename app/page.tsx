"use client";

import { getFeaturedProducts } from '@/lib/products';
import HeroSection from '@/components/HeroSection';
import ShopByRecipient from '@/components/ShopByRecipient';
import ShopByOccasion from '@/components/ShopByOccasion';
import FeaturedProductsCarousel from '@/components/FeaturedProductsCarousel';
import CustomOrderCTA from '@/components/CustomOrderCTA';
import InstagramGallery from '@/components/InstagramGallery';
import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';

export default function Home() {
  const featuredProducts = getFeaturedProducts(12);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Animations */}
      <HeroSection />

      {/* Shop by Recipient Section */}
      <ShopByRecipient />

      {/* Shop by Occasion Section */}
      <ShopByOccasion />

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <FeaturedProductsCarousel products={featuredProducts} />
      )}

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Instagram Gallery */}
      <InstagramGallery />

      {/* Custom Order CTA */}
      <CustomOrderCTA />
    </main>
  );
}

// Made with Bob
