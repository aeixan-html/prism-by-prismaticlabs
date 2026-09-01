import type { MembershipProfile, MembershipTier, Offer } from './types';

export const membershipTiers: MembershipTier[] = [
  { name: 'WHITE', color: '#E2E8F0', textColor: '#F8FAFC', glow: 'rgba(226, 232, 240, 0.3)' },
  { name: 'BLUE', color: '#3B82F6', textColor: '#93C5FD', glow: 'rgba(59, 130, 246, 0.3)' },
  { name: 'BRONZE', color: '#B45309', textColor: '#FCD34D', glow: 'rgba(180, 83, 9, 0.3)' },
  { name: 'SILVER', color: '#64748B', textColor: '#E2E8F0', glow: 'rgba(100, 116, 139, 0.3)' },
  { name: 'PURPLE', color: '#8B5CF6', textColor: '#C4B5FD', glow: 'rgba(139, 92, 246, 0.35)' },
  { name: 'RED', color: '#EF4444', textColor: '#FCA5A5', glow: 'rgba(239, 68, 68, 0.3)' },
  { name: 'GOLD', color: '#F59E0B', textColor: '#FDE68A', glow: 'rgba(245, 158, 11, 0.35)' },
];

export const demoMembership: MembershipProfile = {
  tier: 'PURPLE',
  points: 2450,
  saved: 2450,
  discount: 15,
  specialOffer: '20% off selected products',
  nextTier: 'RED',
  pointsNeeded: 550,
  pointsToNextTier: 3000,
  tierRange: 2450,
};

export const offers: Offer[] = [
  {
    id: 'offer-20',
    label: '20% OFF',
    description: 'Selected products across the store.',
    type: 'discount',
    accent: '#8B5CF6',
  },
  {
    id: 'offer-member-15',
    label: '15% OFF',
    description: 'PURPLE member discount on eligible items.',
    type: 'member',
    accent: '#3B82F6',
  },
  {
    id: 'offer-personalized',
    label: 'MEMBER ONLY',
    description: 'Personalized retail offers based on your membership.',
    type: 'personalized',
    accent: '#06B6D4',
  },
];

export const PRISM_POINTS_RULE = '₹1 saved = 1 PRISM Point';
