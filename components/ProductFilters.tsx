'use client';

import { ProductCategory, ProductFilters as Filters } from '@/types';
import { getCategoryDisplayName, getAllColors, getPriceRange } from '@/lib/products';
import { X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
  category?: ProductCategory;
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onClearFilters,
  category
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const priceRange = getPriceRange(category);
  const availableColors = getAllColors(category);

  const categories: ProductCategory[] = ['flowers-and-bouquet', 'keychain', 'ribbon-and-clips'];

  const handleCategoryChange = (cat: ProductCategory | undefined) => {
    onFilterChange({ ...filters, category: cat });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: { min, max } });
  };

  const handleColorToggle = (color: string) => {
    const currentColors = filters.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    
    onFilterChange({ ...filters, colors: newColors.length > 0 ? newColors : undefined });
  };

  const handleStockChange = (inStock: boolean | undefined) => {
    onFilterChange({ ...filters, inStock });
  };

  const handleFeaturedChange = (featured: boolean | undefined) => {
    onFilterChange({ ...filters, featured });
  };

  const hasActiveFilters = 
    filters.category || 
    filters.priceRange || 
    (filters.colors && filters.colors.length > 0) ||
    filters.inStock !== undefined ||
    filters.featured !== undefined;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full justify-center"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`
        lg:block bg-white rounded-xl border border-gray-200 p-6 sticky top-24
        ${isOpen ? 'block' : 'hidden'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </h2>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Category Filter */}
        {!category && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={!filters.category}
                  onChange={() => handleCategoryChange(undefined)}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                  All Categories
                </span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === cat}
                    onChange={() => handleCategoryChange(cat)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                    {getCategoryDisplayName(cat)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price Range Filter */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange?.min || priceRange.min}
                onChange={(e) => handlePriceChange(
                  Number(e.target.value),
                  filters.priceRange?.max || priceRange.max
                )}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange?.max || priceRange.max}
                onChange={(e) => handlePriceChange(
                  filters.priceRange?.min || priceRange.min,
                  Number(e.target.value)
                )}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="text-sm text-gray-600">
              Range: ₹{priceRange.min} - ₹{priceRange.max}
            </div>
          </div>
        </div>

        {/* Color Filter */}
        {availableColors.length > 0 && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filters.colors?.includes(color)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stock Status Filter */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="stock"
                checked={filters.inStock === undefined}
                onChange={() => handleStockChange(undefined)}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                All Products
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="stock"
                checked={filters.inStock === true}
                onChange={() => handleStockChange(true)}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                In Stock Only
              </span>
            </label>
          </div>
        </div>

        {/* Featured Filter */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.featured || false}
              onChange={(e) => handleFeaturedChange(e.target.checked || undefined)}
              className="w-4 h-4 text-purple-600 focus:ring-purple-500 rounded"
            />
            <span className="text-gray-700 group-hover:text-purple-600 transition-colors font-medium">
              Featured Products Only
            </span>
          </label>
        </div>
      </div>
    </>
  );
}

// Made with Bob
