export interface Product {
  id: string;
  name: string;
  category: string;
  mrp: number;
  previousPrice: number;
  currentPrice: number;
  memberPrice: number;
  stock: 'in-stock' | 'low-stock' | 'out-of-stock';
  description: string;
  priceHistory: number[];
  onSale?: boolean;
}

export interface MembershipTier {
  name: string;
  color: string;
  textColor: string;
  glow: string;
}

export interface MembershipProfile {
  tier: string;
  points: number;
  saved: number;
  discount: number;
  specialOffer: string;
  nextTier: string;
  pointsNeeded: number;
  pointsToNextTier: number;
  tierRange: number;
}

export interface Offer {
  id: string;
  label: string;
  description: string;
  type: 'discount' | 'member' | 'personalized';
  accent: string;
}

export interface PricePoint {
  value: number;
  label: string;
}

export interface ChatProductCard {
  type: 'product-card';
  productId: string;
}

export interface ChatMembershipCard {
  type: 'membership-card';
}

export interface ChatOffersCard {
  type: 'offers';
}

export interface ChatPointsCard {
  type: 'points';
  saved: number;
  points: number;
}

export interface ChatCheaperCard {
  type: 'cheaper-list';
  productIds: string[];
}

export interface ChatProductListCard {
  type: 'product-list';
  productIds: string[];
  title: string;
}

export type ChatAttachment =
  | ChatProductCard
  | ChatMembershipCard
  | ChatOffersCard
  | ChatPointsCard
  | ChatCheaperCard
  | ChatProductListCard;

export interface ChatResponse {
  text: string;
  attachments?: ChatAttachment[];
}

export interface Message {
  id: string;
  role: 'user' | 'prism';
  text: string;
  attachments?: ChatAttachment[];
  isProcessing?: boolean;
}
