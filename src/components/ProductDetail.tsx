import { useEffect } from 'react';
import { X, Award, Sparkles, TrendingDown, Package } from 'lucide-react';
import type { Product } from '@/data/types';
import { getDiscountPercent, getMemberSavings, getTotalSavings, getPriceTrend } from '@/data/products';
import PriceMovement from './PriceMovement';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const discount = getDiscountPercent(product);
  const memberSave = getMemberSavings(product);
  const totalSave = getTotalSavings(product);
  const trend = getPriceTrend(product);
  const stockLabel = product.stock === 'in-stock' ? 'In Stock' : product.stock === 'low-stock' ? 'Low Stock' : 'Out of Stock';
  const stockColor = product.stock === 'in-stock' ? 'text-accent4' : product.stock === 'low-stock' ? 'text-accent5' : 'text-accent6';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" />
      <div
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-surface p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-mtext transition-colors hover:bg-surface-3 hover:text-ptext"
          aria-label="Close"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="mb-1 flex items-center gap-2">
          <Package className="h-4 w-4 text-mtext" aria-hidden="true" />
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-mtext">{product.category}</span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-ptext">{product.name}</h3>
        <p className="mb-5 text-sm text-stext leading-relaxed">{product.description}</p>

        <div className="space-y-3 border border-border bg-surface-2 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-mtext">MRP</span>
            <span className="text-sm text-mtext line-through">₹{product.mrp}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-mtext">Previous Price</span>
            <span className="text-sm text-mtext">₹{product.previousPrice}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="text-sm font-medium text-ptext">Current Price</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xl font-bold text-ptext">₹{product.currentPrice}</span>
              {discount > 0 && (
                <span className="inline-flex items-center gap-1 bg-accent4/10 px-2 py-0.5 font-mono text-xs font-semibold text-accent4">
                  <TrendingDown className="h-3 w-3" aria-hidden="true" />
                  {discount}%
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <Award className="h-4 w-4" aria-hidden="true" />
              PURPLE Member Price
            </span>
            <span className="font-mono text-xl font-bold text-primary">₹{product.memberPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-accent4">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Current Saving
            </span>
            <span className="font-mono text-sm text-accent4">₹{product.mrp - product.currentPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-accent4">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Additional Member Saving
            </span>
            <span className="font-mono text-sm text-accent4">₹{memberSave}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2">
            <span className="text-sm font-medium text-ptext">Total Saving with Membership</span>
            <span className="font-mono text-base font-bold text-accent4">₹{totalSave}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-mtext">Stock Status</span>
          <span className={`text-sm font-medium ${stockColor}`}>{stockLabel}</span>
        </div>

        <div className="mt-4">
          <PriceMovement product={product} />
        </div>

        {product.onSale && (
          <div className="mt-4 border border-primary/30 bg-primary/10 p-3">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">Demo Offer</div>
            <div className="mt-1 text-sm text-stext">This product is part of the 20% demo sale on selected items.</div>
          </div>
        )}

        <div className="mt-4 border border-border bg-surface-2 p-3">
          <div className="font-mono text-xs font-medium uppercase tracking-wider text-mtext">PRISM Points</div>
          <div className="mt-1 text-sm text-stext">
            Buying this with your membership earns <span className="font-semibold text-primary">+{totalSave} PRISM Points</span> (₹{totalSave} saved = {totalSave} points)
          </div>
        </div>

        {trend === 'down' && (
          <div className="mt-3 font-mono text-xs text-accent4">↓ Price decreased from ₹{product.previousPrice} to ₹{product.currentPrice}</div>
        )}
        {trend === 'up' && (
          <div className="mt-3 font-mono text-xs text-accent6">↑ Price increased from ₹{product.previousPrice} to ₹{product.currentPrice}</div>
        )}
      </div>
    </div>
  );
}
