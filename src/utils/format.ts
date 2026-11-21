import type { CityRate, PaymentMethodType, TcsServiceTier } from '../types/store';

export function formatPKR(amount: number): string {
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
}

export function computeDeliveryFee(
  city: CityRate | undefined,
  subtotal: number,
  tier: TcsServiceTier,
  freeThreshold: number
): number {
  if (!city) return 0;
  const isFreeStandard = freeThreshold > 0 && subtotal >= freeThreshold;
  const standardPart = isFreeStandard ? 0 : city.standardFee;
  const priorityPart = tier === 'overnight' ? city.overnightExtra : 0;
  return standardPart + priorityPart;
}

export function formatPaymentLabel(method: PaymentMethodType): string {
  if (method === 'easypaisa') return 'EasyPaisa Mobile Account';
  if (method === 'jazzcash') return 'JazzCash Mobile Account';
  return 'Cash on Delivery (TCS COD)';
}
