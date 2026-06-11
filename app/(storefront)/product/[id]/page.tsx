import { mockProducts, getRelatedProducts } from '@/lib/mock-data';
import ProductDetails from './ProductDetails';

export function generateStaticParams() {
  return mockProducts.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = mockProducts.find(p => p.id === id) || null;
  const relatedProducts = getRelatedProducts(id, 4);
  
  return <ProductDetails id={id} product={product} relatedProducts={relatedProducts} />;
}
