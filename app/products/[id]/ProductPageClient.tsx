'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { getRelatedProducts, formatPrice, getCategoryDisplayName } from '@/lib/products';
import { useCartStore } from '@/store/cartStore';
import ProductGrid from '@/components/ProductGrid';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  Minus, 
  Plus,
  ArrowLeft,
  Truck,
  Shield,
  RefreshCw,
  Instagram
} from 'lucide-react';

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [customization, setCustomization] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const relatedProducts = getRelatedProducts(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, customization || undefined);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleInstagramOrder = () => {
    const message = `Hi! I'm interested in ordering:\n\n${product.name}\nPrice: ${formatPrice(product.price)}\nQuantity: ${quantity}${selectedColor ? `\nColor: ${selectedColor}` : ''}${customization ? `\nCustomization: ${customization}` : ''}\n\nProduct Link: ${window.location.href}`;
    
    // Redirect to Instagram DM
    const instagramUrl = 'https://www.instagram.com/direct/t/your_instagram_handle';
    window.open(instagramUrl, '_blank');
    
    // Show alert with order details for user to copy
    alert('Please send us the following details via Instagram DM:\n\n' + message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/shop"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </Link>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.featured && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    Featured
                  </span>
                )}
                {product.customizable && (
                  <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    Customizable
                  </span>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: product.description,
                      url: window.location.href
                    });
                  }
                }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                      selectedImage === index
                        ? 'ring-4 ring-purple-600 scale-105'
                        : 'ring-2 ring-gray-200 hover:ring-purple-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <Link
              href={`/shop?category=${product.category}`}
              className="inline-block text-sm font-medium text-purple-600 hover:text-purple-700 uppercase tracking-wide"
            >
              {getCategoryDisplayName(product.category)}
            </Link>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <p className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
              {product.inStock ? (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <Check className="w-5 h-5" />
                  In Stock
                </span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">
                  Select Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-purple-600 text-white ring-4 ring-purple-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization */}
            {product.customizable && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">
                  Customization (Optional)
                </label>
                <textarea
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                  placeholder="Add your custom message or special requests..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600">
                  Total: <span className="font-bold text-gray-900">{formatPrice(product.price * quantity)}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                  product.inStock
                    ? addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105 active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-6 h-6" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all"
                aria-label="Add to wishlist"
              >
                <Heart className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Instagram Order Button */}
            <button
              onClick={handleInstagramOrder}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <Instagram className="w-6 h-6" />
              Order via Instagram
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Fast Delivery</p>
                  <p className="text-xs text-gray-600">2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Quality Assured</p>
                  <p className="text-xs text-gray-600">Handcrafted with care</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-600">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}

// Made with Bob