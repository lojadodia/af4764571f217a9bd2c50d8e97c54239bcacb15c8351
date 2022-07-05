
export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  stock?: number;
  extras: any;
  obs: any;
  //[key: string]: any;
}

export enum CouponType {
	/** Fixed coupon */
	FixedCoupon = "fixed",
	/** Percentage coupon */
	PercentageCoupon = "percentage",
	/** Free shipping coupon */
	FreeShippingCoupon = "free_shipping",
	/** Offer product */
	OfferProductCoupon = "offer_product"
}

export enum CouponTypeDescription {
	/** Fixed coupon */
	FixedCoupon = "Cupom de Desconto Fixo",
	/** Percentage coupon */
	PercentageCoupon = "Cupom de Desconto Percentual",
	/** Free shipping coupon */
	FreeShippingCoupon = "Cupom de Taxa de Entrega Gratuita",
	/** Offer product */
	OfferProductCoupon = "Oferta de um Produto"
}

export interface UpdateItemInput extends Partial<Omit<Item, "id">> {}
export function addItemWithQuantity(
  items: Item[],
  item: Item,
  quantity: number
) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");

  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem.id.localeCompare(item.id)! === 0
  );
  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity! += quantity;
    return newItems;
  }
  
  return [...items, { ...item, quantity }];
}

export function removeItemOrQuantity(
  items: Item[],
  id: Item["id"],
  quantity: number
) {
  return items.reduce((acc: Item[], item) => {
    if (item.id === id) {
      const newQuantity = item.quantity! - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}
// Simple CRUD for Item
export function addItem(items: Item[], item: Item) {
  return [...items, item];
}

export function getItem(items: Item[], id: Item["id"]) {
  return  items.find((item) => item.id.localeCompare(id) === 0)
}

export function updateItem(
  items: Item[],
  id: Item["id"],
  item: UpdateItemInput
) {
  return items.map((existingItem) =>
    existingItem.id === id ? { ...existingItem, ...item } : existingItem
  );
}

export function removeItem(items: Item[], id: Item["id"]) {
  return items.filter((existingItem) => existingItem.id !== id);
}
export function inStock(items: Item[], id: Item["id"]) {
  const item = getItem(items, id);
  if (item) return item["quantity"]! < item["stock"]!;
  return false;
}
export const calculateItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity!,
    item_price_total: item.price_total * item.quantity! 
  }));

export const calculateTotal = (items: Item[]) =>
  items.reduce((total, item) => total + item.quantity! * item.price, 0);
  export const calculateTotalPrice = (items: Item[]) => {
    return items.reduce((total, item) => total + item.quantity! * item.item_price_total, 0);
  }

export const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + item.quantity!, 0);

export const calculateUniqueItems = (items: Item[]) => items.length;

interface PriceValues {
  totalAmount: number;
  tax: number;
  shipping_charge: number;
  coupon: {
    type: string
  }
}
export const calculatePaidTotal = (
  { totalAmount, tax, shipping_charge, coupon }: PriceValues,
  discount?: number
) => {
  let paidTotal = totalAmount + tax + shipping_charge;
  if (coupon?.type === CouponType.PercentageCoupon) {
    if (discount) {
      paidTotal = paidTotal * (1-discount);

    }
  }
  else {
    if (discount) {
      paidTotal = paidTotal - discount;
    }
  }
  return paidTotal;
};
