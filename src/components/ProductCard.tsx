import { TrendingDown, Award, Sparkles } from 'lucide-react';
import type { Product } from '@/data/types';
import { getDiscountPercent, getMemberSavings, getTotalSavings, getPriceTrend } from '@/data/products';
import PriceMovement from './PriceMovement';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  compact?: boolean;
}

export default function ProductCard({ product, onClick, compact = false }: ProductCardProps) {
  const discount = getDiscountPercent(product);
  const memberSave = getMemberSavings(product);
  const totalSave = getTotalSavings(product);
  const trend = getPriceTrend(product);
  const stockLabel = product.stock === 'in-stock' ? 'In Stock' : product.stock === 'low-stock' ? 'Low Stock' : 'Out of Stock';
  const stockColor = product.stock === 'in-stock' ? 'text-accent4' : product.stock === 'low-stock' ? 'text-accent5' : 'text-accent6';

  return (
    <button
      onClick={() => onClick?.(product)}
      className="group relative w-full overflow-hidden bg-bg p-4 text-left transition-all duration-200 hover:bg-surface"
    >
      {product.onSale && (
        <div className="absolute right-0 top-0 bg-primary/20 px-2.5 py-1 font-mono text-[10px] font-semibold text-primary" aria-label="On sale">
          SALE
        </div>
      )}
      <div className="mb-1 flex items-center gap-2">
        <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-mtext">{product.category}</span>
      </div>
      <h3 className="mb-3 text-sm font-semibold text-ptext group-hover:text-primary transition-colors">{product.name}</h3>

      {!compact && <p className="mb-3 text-xs text-stext leading-relaxed">{product.description}</p>}

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-mtext">MRP</span>
          <span className="text-mtext line-through">₹{product.mrp}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-mtext">Previous</span>
          <span className="text-mtext">₹{product.previousPrice}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-mtext">Current</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-bold text-ptext">₹{product.currentPrice}</span>
            {discount > 0 && (
              <span className="inline-flex items-center gap-1 bg-accent4/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent4">
                <TrendingDown className="h-3 w-3" aria-hidden="true" />
                {discount}%
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-1.5">
          <span className="flex items-center gap-1.5 text-xs text-primary">
            <Award className="h-3 w-3" aria-hidden="true" />
            PURPLE
          </span>
          <span className="font-mono text-sm font-semibold text-primary">₹{product.memberPrice}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-accent4">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            You save
          </span>
          <span className="font-mono text-accent4">₹{totalSave} <span className="text-mtext">(₹{memberSave} extra)</span></span>
        </div>
      </div>

      {!compact && (
        <div className="mt-3">
          <PriceMovement product={product} compact />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <span className={`text-[10px] font-medium ${stockColor}`}>{stockLabel}</span>
        {trend === 'down' && <span className="font-mono text-[10px] text-accent4">↓ dropped</span>}
        {trend === 'up' && <span className="font-mono text-[10px] text-accent6">↑ rose</span>}
      </div>
    </button>
  );
}
