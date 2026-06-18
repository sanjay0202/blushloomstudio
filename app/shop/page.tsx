'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ProductFilters as Filters } from '@/types';
import { filterProducts, sortProducts, SortOption, getAllProducts } from '@/lib/products';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import { Search, ArrowUpDown, ArrowLeft } from 'lucide-react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL search params
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category');
    
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
    
    if (urlCategory) {
      setFilters(prev => ({ ...prev, category: urlCategory as any }));
    }
  }, [searchParams]);

  // Get filtered and sorted products
  const products = useMemo(() => {
    const filtered = filterProducts({ ...filters, searchQuery: searchQuery || undefined });
    return sortProducts(filtered, sortBy);
  }, [filters, sortBy, searchQuery]);

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const totalProducts = getAllProducts().length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop All Products
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl">
            Discover our handcrafted collection of flowers, keychains, and accessories
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Sort Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <div className="md:w-64">
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{products.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalProducts}</span> products
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductGrid 
              products={products}
              emptyMessage={searchQuery ? `No products found for "${searchQuery}"` : "No products match your filters"}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
