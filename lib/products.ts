import { Product, ProductFilters, ProductCategory } from '@/types';
import productsData from '@/data/products.json';

/**
 * Get the base path for the application
 * This is set at build time for static export
 */
const BASE_PATH = typeof window !== 'undefined'
  ? (window.location.pathname.includes('/blushloomstudio') ? '/blushloomstudio' : '')
  : (process.env.NEXT_PUBLIC_BASE_PATH || '/blushloomstudio');

/**
 * Get image path with basePath prefix
 */
export function getImagePath(path: string): string {
  // If path already includes basePath or is external, return as is
  if (path.startsWith('http') || path.includes('/blushloomstudio/')) {
    return path;
  }
  
  // For absolute paths, prepend basePath
  if (path.startsWith('/') && BASE_PATH) {
    return `${BASE_PATH}${path}`;
  }
  
  return path;
}

/**
 * Get all products with corrected image paths
 */
export function getAllProducts(): Product[] {
  const products = productsData as Product[];
  
  // Transform image paths to include basePath
  return products.map(product => ({
    ...product,
    images: product.images.map(img => getImagePath(img))
  }));
}

/**
 * Get a single product by ID
 */
export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(product => product.id === id);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: ProductCategory): Product[] {
  return getAllProducts().filter(product => product.category === category);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(limit?: number): Product[] {
  const featured = getAllProducts().filter(product => product.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Search products by query
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) {
    return getAllProducts();
  }
  
  return getAllProducts().filter(product => {
    // Search in name
    if (product.name.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // Search in description
    if (product.description.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    // Search in tags
    if (product.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      return true;
    }
    
    // Search in category
    if (product.category.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    
    return false;
  });
}

/**
 * Filter products based on multiple criteria
 */
export function filterProducts(filters: ProductFilters): Product[] {
  let products = getAllProducts();
  
  // Filter by category
  if (filters.category) {
    products = products.filter(p => p.category === filters.category);
  }
  
  // Filter by price range
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    products = products.filter(p => p.price >= min && p.price <= max);
  }
  
  // Filter by colors
  if (filters.colors && filters.colors.length > 0) {
    products = products.filter(p => 
      p.colors?.some(color => filters.colors?.includes(color))
    );
  }
  
  // Filter by stock status
  if (filters.inStock !== undefined) {
    products = products.filter(p => p.inStock === filters.inStock);
  }
  
  // Filter by featured status
  if (filters.featured !== undefined) {
    products = products.filter(p => p.featured === filters.featured);
  }
  
  // Filter by search query
  if (filters.searchQuery) {
    products = searchProducts(filters.searchQuery).filter(p =>
      products.some(fp => fp.id === p.id)
    );
  }
  
  return products;
}

/**
 * Get related products (same category, excluding current product)
 */
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  
  if (!product) {
    return [];
  }
  
  return getAllProducts()
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}

/**
 * Get price range for all products or a specific category
 */
export function getPriceRange(category?: ProductCategory): { min: number; max: number } {
  const products = category ? getProductsByCategory(category) : getAllProducts();
  
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }
  
  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

/**
 * Get all unique colors from products
 */
export function getAllColors(category?: ProductCategory): string[] {
  const products = category ? getProductsByCategory(category) : getAllProducts();
  const colorsSet = new Set<string>();
  
  products.forEach(product => {
    product.colors?.forEach(color => colorsSet.add(color));
  });
  
  return Array.from(colorsSet).sort();
}

/**
 * Get all unique tags from products
 */
export function getAllTags(category?: ProductCategory): string[] {
  const products = category ? getProductsByCategory(category) : getAllProducts();
  const tagsSet = new Set<string>();
  
  products.forEach(product => {
    product.tags?.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}

/**
 * Sort products by various criteria
 */
export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'featured';

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    
    default:
      return sorted;
  }
}

/**
 * Format price in Indian Rupees
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(category: ProductCategory): string {
  const names: Record<ProductCategory, string> = {
    'flowers-and-bouquet': 'Flowers & Bouquet',
    'keychain': 'Keychains',
    'ribbon-and-clips': 'Ribbons & Clips'
  };
  
  return names[category] || category;
}

/**
 * Get product statistics
 */
export function getProductStats() {
  const products = getAllProducts();
  
  return {
    total: products.length,
    byCategory: {
      'flowers-and-bouquet': getProductsByCategory('flowers-and-bouquet').length,
      'keychain': getProductsByCategory('keychain').length,
      'ribbon-and-clips': getProductsByCategory('ribbon-and-clips').length
    },
    featured: getFeaturedProducts().length,
    inStock: products.filter(p => p.inStock).length,
    priceRange: getPriceRange()
  };
}

// Made with Bob
