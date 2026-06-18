import { getAllProducts, getProductById } from '@/lib/products';
import ProductPageClient from './ProductPageClient';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: { id: string };
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}

// Made with Bob
