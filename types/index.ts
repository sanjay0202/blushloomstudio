/**
 * Product Types
 */

export type ProductCategory = "flowers-and-bouquet" | "keychain" | "ribbon-and-clips";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  colors?: string[];
  customizable: boolean;
  inStock: boolean;
  featured?: boolean;
  tags?: string[];
}

/**
 * Cart Types
 */

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customization?: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

/**
 * Custom Order Types
 */

export interface CustomOrder {
  customerInfo: {
    name: string;
    phone: string;
    email?: string;
  };
  orderDetails: {
    type: string;
    description: string;
    budget?: number;
    deadline?: string;
  };
  referenceImages?: string[];
}

/**
 * Filter Types
 */

export interface ProductFilters {
  category?: ProductCategory;
  priceRange?: {
    min: number;
    max: number;
  };
  colors?: string[];
  inStock?: boolean;
  featured?: boolean;
  searchQuery?: string;
}

/**
 * UI State Types
 */

export interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  activeModal?: string;
}

// Made with Bob
