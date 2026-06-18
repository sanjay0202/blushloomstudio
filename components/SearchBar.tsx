'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { searchProducts, formatPrice } from '@/lib/products';
import { Product } from '@/types';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Search products when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const searchResults = searchProducts(query);
      setResults(searchResults.slice(0, 5)); // Show top 5 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search products..."
          className={`w-full pl-10 pr-10 py-2.5 border rounded-lg transition-all ${
            isFocused
              ? 'border-purple-500 ring-2 ring-purple-200'
              : 'border-gray-300 hover:border-gray-400'
          } focus:outline-none`}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {/* Results Header */}
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Found <span className="font-semibold text-gray-900">{results.length}</span> result{results.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Results List */}
          <div className="divide-y divide-gray-100">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="flex items-center gap-4 p-4 hover:bg-purple-50 transition-colors"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600 truncate">
                    {product.description}
                  </p>
                  <p className="text-sm font-semibold text-purple-600 mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Category Badge */}
                <div className="flex-shrink-0">
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {product.category.replace(/-/g, ' ')}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Results */}
          <Link
            href={`/shop?search=${encodeURIComponent(query)}`}
            onClick={() => {
              setIsOpen(false);
              setQuery('');
            }}
            className="block px-4 py-3 text-center text-purple-600 hover:bg-purple-50 font-medium border-t border-gray-200 transition-colors"
          >
            View all results for "{query}"
          </Link>
        </div>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50">
          <div className="text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">No products found for "{query}"</p>
            <p className="text-sm text-gray-500">Try different keywords or browse our shop</p>
            <Link
              href="/shop"
              onClick={() => {
                setIsOpen(false);
                setQuery('');
              }}
              className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
