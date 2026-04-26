import { Sparkles, ShoppingBag, type LucideIcon } from 'lucide-react';
import type { ProductIcon } from '@/lib/products';

const MAP: Record<ProductIcon, LucideIcon> = {
  sparkles: Sparkles,
  'shopping-bag': ShoppingBag,
};

export function resolveProductIcon(name: ProductIcon): LucideIcon {
  return MAP[name];
}
