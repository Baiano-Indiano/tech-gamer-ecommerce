import type { Coupon } from '../types';

// Mock de cupons disponíveis (em um app real, isso viria de uma API)
export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'TECH10',
    type: 'percentage',
    discount: 10,
    minPurchase: 100
  },
  {
    code: 'FREESHIP',
    type: 'shipping',
    discount: 0,
    minPurchase: 150
  },
  {
    code: 'WELCOME15',
    type: 'percentage',
    discount: 15,
    minPurchase: 0,
    validUntil: '2023-12-31'
  }
];
