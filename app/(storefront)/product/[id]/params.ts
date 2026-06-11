import { mockProducts } from '@/lib/mock-data';

export function generateStaticParams() {
  return mockProducts.map((p) => ({ id: p.id }));
}
