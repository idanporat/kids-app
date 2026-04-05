/**
 * תשואה משוערת לפי אחוז שנתי על היתרה הנוכחית (ריבית דריבית פשוטה).
 */
export function estimatedEarningsFromAnnualPercent(
  balance: number,
  annualPercent: number
) {
  const r = annualPercent / 100;
  return {
    /** ממוצע יומי */
    day: (balance * r) / 365,
    /** ממוצע חודשי */
    month: (balance * r) / 12,
    /** שנתי */
    year: balance * r,
  };
}
