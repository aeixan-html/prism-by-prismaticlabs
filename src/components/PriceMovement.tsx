import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import type { Product } from '@/data/types';
import { getPriceTrend } from '@/data/products';

interface PriceMovementProps {
  product: Product;
  compact?: boolean;
}

export default function PriceMovement({ product, compact = false }: PriceMovementProps) {
  const trend = getPriceTrend(product);
  const TrendIcon = trend === 'down' ? ArrowDown : trend === 'up' ? ArrowUp : Minus;
  const trendColor = trend === 'down' ? 'text-accent4' : trend === 'up' ? 'text-accent6' : 'text-mtext';
  const trendLabel = trend === 'down' ? 'Price decreased' : trend === 'up' ? 'Price increased' : 'Price stable';

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 bg-surface px-2 py-1 font-mono text-xs">
        <span className="text-mtext">₹{product.previousPrice}</span>
        <span className="text-mtext">→</span>
        <span className={`font-semibold ${trendColor}`}>₹{product.currentPrice}</span>
        <TrendIcon className={`h-3 w-3 ${trendColor}`} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="border border-border bg-surface-2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-mtext">Price History</span>
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 font-mono text-xs font-medium ${trendColor}`}>
          <TrendIcon className="h-3 w-3" aria-hidden="true" />
          {trendLabel}
        </span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {product.priceHistory.map((price, i) => {
          const isLast = i === product.priceHistory.length - 1;
          const prevPrice = i > 0 ? product.priceHistory[i - 1] : price;
          const itemTrend = price < prevPrice ? 'down' : price > prevPrice ? 'up' : 'stable';
          const itemColor = itemTrend === 'down' ? 'text-accent4' : itemTrend === 'up' ? 'text-accent6' : 'text-stext';
          return (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-mtext">→</span>}
              <span className={`font-mono text-sm font-semibold ${isLast ? itemColor : 'text-stext'} ${isLast ? 'text-base' : ''}`}>
                ₹{price}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 font-mono text-xs text-mtext">Simulated demo price data</div>
    </div>
  );
}
