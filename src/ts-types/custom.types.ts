import { QueryKey } from "react-query";

export type CategoriesQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};

export declare type Type = {
  id: number | string;
  name: string;
  slug: string;
  icon: string;
  // products?: Maybe<ProductPaginator>;
  created_at: Date;
  updated_at: Date;
};
export declare type Coupon = {
  id: number | string;
  code: string;
  description: string;
  // orders: Order[];
  type: string;
  image: string;
  amount: number;
  active_from: Date;
  expire_at: Date;
  created_at: Date;
  updated_at: Date;
};
export declare type Category = {
  id: number | string;
  name: string;
  slug: string;
  parent?: number;
  children: Category[];
  details?: string;
  image?: Attachment;
  icon?: string;
  type: Type;
  products: Product[];
  created_at: Date;
  updated_at: Date;
};

export declare type Visitor = {
  ip?: string;
  address?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  merchant?: string;
};

export declare type Attachment = {
  id?: number | string;
  thumbnail?: string;
  original?: string;
};
export declare type Product = {
  id?: number | string;
  name?: string;
  slug?: string;
  type?: Type;
  categories?: Category[];
  // variations: AttributeValue[]
  // pivot?: OrderProductPivot
  // orders: Order[]
  description?: string;
  in_stock?: boolean;
  is_taxable?: boolean;
  sale_price?: number;
  sku?: string;
  gallery?: Attachment[];
  image?: Attachment;
  // status?: ProductStatus
  height?: string;
  length?: string;
  width?: string;
  price?: number;
  quantity?: number;
  unit?: string;
  created_at?: Date;
  updated_at?: Date;
};

export declare type UserAddress = {
  country?: string;
  city?: string;
  state?: string;
  zip?: string;
  lat?: string;
  lng?: string;
  instructions?: string;
};

export declare type Order = {
  id: number | string;
  tracking_number: string;
  customer_id: number | string;
  customer_nif: number | string;
  // customer?: Maybe<User>;
  // status: OrderStatus;
  amount: number;
  sales_tax: number;
  total: number;
  paid_total: number;
  payment_id?: string;
  payment_gateway?: string;
  coupon?: Coupon;
  discount?: number;
  delivery_fee?: number;
  delivery_time: string;
  delivery_schedule: string;
  delivery_hour: string;
  obs: string;
  products: Product[];
  created_at: Date;
  updated_at: Date;
  billing_address?: UserAddress;
  shipping_address?: UserAddress;
};

export type SettingsType = {
  id: number | string;
  options: SettingsOptions;
};

export type SettingsOptions = {
  siteTitle?: string;
  siteSubtitle?: string;
  currency?: string;
  logo?: Attachment;
  taxClass?: string;
  shippingClass?: string;
};
