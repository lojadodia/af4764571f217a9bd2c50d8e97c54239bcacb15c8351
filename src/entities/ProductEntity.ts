

export interface IProduct {
  id: number | string;
  sync_id: string;
  sync_date: string;
  title: string;
  price: number | string;
  sale_price: number;
  quantity: number;
  is_disable: boolean;
  sku: string;
  options: [object];
  product_id: number | string;

}