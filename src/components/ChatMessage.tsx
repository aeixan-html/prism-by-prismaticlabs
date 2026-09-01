import type { Message, ChatAttachment, Product } from '@/data/types';
import { getProductById } from '@/data/products';
import MembershipCard from './MembershipCard';
import { OfferGrid } from './OfferCard';
import PointsDisplay from './PointsDisplay';
import PriceMovement from './PriceMovement';
import { TrendingDown, TrendingUp, Package } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onProductClick?: (product: Product) => void;
}

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="font-semibold text-ptext">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function AttachmentRenderer({ attachment, onProductClick }: { attachment: ChatAttachment; onProductClick?: (product: Product) => void }) {
  switch (attachment.type) {
    case 'product-card': {
      const product = getProductById(attachment.productId);
      if (!product) return null;
      const trend = product.currentPrice < product.previousPrice ? 'down' : product.currentPrice > product.previousPrice ? 'up' : 'stable';
      const TrendIcon = trend === 'down' ? TrendingDown : TrendingUp;
      const trendColor = trend === 'down' ? 'text-accent4' : 'text-accent6';
      const discount = Math.round(((product.mrp - product.currentPrice) / product.mrp) * 100);
      return (
        <button
          onClick={() => onProductClick?.(product)}
          className="mt-2 w-full overflow-hidden border border-border bg-surface-2 p-4 text-left transition-all hover:border-primary/50"
        >
          <div className="flex items-center gap-1.5 font-mono text-xs text-mtext">
            <Package className="h-3.5 w-3.5" aria-hidden="true" />
            {product.category}
          </div>
          <h4 className="mt-1 text-sm font-semibold text-ptext">{product.name}</h4>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-mtext line-through">₹{product.mrp}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-bold text-ptext">₹{product.currentPrice}</span>
                {discount > 0 && <span className="font-mono text-xs font-semibold text-accent4">{discount}% OFF</span>}
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-primary">PURPLE</span>
              <div className="font-mono text-lg font-semibold text-primary">₹{product.memberPrice}</div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <PriceMovement product={product} compact />
            <span className={`flex items-center gap-1 font-mono text-xs ${trendColor}`}>
              <TrendIcon className="h-3 w-3" aria-hidden="true" />
              {trend === 'down' ? 'Decreased' : trend === 'up' ? 'Increased' : 'Stable'}
            </span>
          </div>
        </button>
      );
    }
    case 'membership-card':
      return <div className="mt-2"><MembershipCard /></div>;
    case 'offers':
      return <div className="mt-2"><OfferGrid /></div>;
    case 'points':
      return <div className="mt-2"><PointsDisplay saved={attachment.saved} points={attachment.points} /></div>;
    case 'cheaper-list': {
      const items = attachment.productIds.map((id) => getProductById(id)).filter(Boolean) as Product[];
      return (
        <div className="mt-2 space-y-2">
          {items.map((p) => {
            const discount = Math.round(((p.mrp - p.currentPrice) / p.mrp) * 100);
            return (
              <button
                key={p.id}
                onClick={() => onProductClick?.(p)}
                className="w-full overflow-hidden border border-border bg-surface-2 p-3 text-left transition-all hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-ptext">{p.name}</h4>
                    <div className="mt-0.5 flex items-center gap-1.5 font-mono text-xs text-mtext">
                      <span>₹{p.previousPrice}</span>
                      <span>→</span>
                      <span className="font-semibold text-accent4">₹{p.currentPrice}</span>
                    </div>
                  </div>
                  <span className="bg-accent4/10 px-2 py-0.5 font-mono text-xs font-semibold text-accent4">{discount}% OFF</span>
                </div>
              </button>
            );
          })}
        </div>
      );
    }
    case 'product-list': {
      const items = attachment.productIds.map((id) => getProductById(id)).filter(Boolean) as Product[];
      return (
        <div className="mt-2 space-y-2">
          <div className="font-mono text-xs font-medium uppercase tracking-wider text-mtext">{attachment.title}</div>
          {items.map((p) => {
            const discount = Math.round(((p.mrp - p.currentPrice) / p.mrp) * 100);
            return (
              <button
                key={p.id}
                onClick={() => onProductClick?.(p)}
                className="w-full overflow-hidden border border-border bg-surface-2 p-3 text-left transition-all hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-ptext">{p.name}</h4>
                    <div className="mt-0.5 font-mono text-xs text-mtext">{p.category}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-ptext">₹{p.currentPrice}</span>
                    {discount > 0 && <div className="font-mono text-xs text-accent4">{discount}% OFF</div>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      );
    }
    default:
      return null;
  }
}

export default function ChatMessage({ message, onProductClick }: ChatMessageProps) {
  const isUser = message.role === 'user';

  if (message.isProcessing) {
    return (
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-primary/15">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse-dot" />
        </div>
        <div className="flex items-center gap-1 border border-border bg-surface px-4 py-3">
          <span className="h-2 w-1 rounded-full bg-primary animate-typing-bounce" style={{ animationDelay: '0s' }} />
          <span className="h-2 w-1 rounded-full bg-primary animate-typing-bounce" style={{ animationDelay: '0.15s' }} />
          <span className="h-2 w-1 rounded-full bg-primary animate-typing-bounce" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center font-mono text-xs font-bold ${
          isUser ? 'bg-secondary/15 text-secondary' : 'bg-primary/15 text-primary'
        }`}
      >
        {isUser ? 'YOU' : 'PR'}
      </div>
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-secondary/10 text-ptext'
              : 'border border-border bg-surface text-stext'
          }`}
        >
          {renderFormattedText(message.text)}
        </div>
        {message.attachments?.map((att, i) => (
          <AttachmentRenderer key={i} attachment={att} onProductClick={onProductClick} />
        ))}
      </div>
    </div>
  );
}
