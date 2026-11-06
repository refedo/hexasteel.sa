import type {MarketplaceItem} from "@/content/marketplace";

export const marketplaceVatRate = 15;
export const maxSlipBytes = 5 * 1024 * 1024;
export type CheckoutLine = {slug:string; quantity:number};

export function checkoutTotals(lines: CheckoutLine[], items: MarketplaceItem[]) {
  if (!lines.length || lines.length > 20 || new Set(lines.map(line=>line.slug)).size !== lines.length) return null;
  const priced = [];
  for (const {slug,quantity} of lines) {
    const item = items.find(product=>product.slug===slug);
    const units = Math.round(quantity*1000);
    if (!item?.priceHalalas || !Number.isFinite(quantity) || units/1000!==quantity || units<1 || units>10_000_000) return null;
    priced.push({item,quantity,amount:Number((BigInt(item.priceHalalas)*BigInt(units)+BigInt(500))/BigInt(1000))});
  }
  const subtotal = priced.reduce((total,line)=>total+line.amount,0);
  const vat = Math.round(subtotal*marketplaceVatRate/100);
  return {lines:priced,subtotal,vat,total:subtotal+vat};
}
