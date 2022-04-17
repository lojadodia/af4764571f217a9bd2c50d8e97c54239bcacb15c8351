import isEmpty from "lodash/isEmpty";
interface AttributeExtra {
  id: string | number;
  sync_id: string | number;
  name: string;
}
interface Extra {
  id: string | number;
  attribute: AttributeExtra;
  sync_id: string;
  sync_price: string;
  sync_tax_rate: string;
  value: string;
}
interface Item {
  id?: string | number;
  name: string;
  slug: string;
  unit: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  quantity?: number;
  extras: Extra[];
  obs: string | null;
  //[key: string]: unknown;
}
interface Variation {
  id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}
export function generateCartItem(item: Item, variation: Variation) {
  const { id, name, slug, image, price, sale_price, quantity, unit, extras, obs = '' } = item;
  let totalExtras = 0
  let extra: Extra[] = [];
 for (let prop in extras) {
   
   extra.push({
    id: extras[prop]?.id,
    sync_id: extras[prop]?.sync_id,
    sync_price: extras[prop]?.sync_price,
    sync_tax_rate: extras[prop]?.sync_tax_rate,
    value: extras[prop]?.value,
    attribute: {
      id: extras[prop].attribute?.id,
      name: extras[prop].attribute?.name,
      sync_id: extras[prop].attribute?.sync_id
    }
   })

   totalExtras += (Number(extras[prop].sync_price))
  }
  let buildId = ""
  let extrasKeys = extra.length > 0 ? Object.keys(extras).join('.') : null
  if (extrasKeys) {
    buildId = '-'.concat(extrasKeys) ?? ''
  }
  if (!isEmpty(variation)) {

    return {
      id: `${id}.${variation.id}${buildId}`,
      productId: id,
      name: `${name} - ${variation.title}`,
      slug,
      extras: extra,
      obs,
      unit,
      stock: variation.quantity,
      price: Number(variation.sale_price ? variation.sale_price : variation.price) + totalExtras,
      price_total: Number(variation.sale_price ? variation.sale_price : variation.price),
      image: image?.thumbnail,
      variationId: variation.id,
    };
  }

  return {
    id: `${id}`,
    productId: id,
    name,
    slug,
    unit,
    extras: extra,
    obs,
    image: image?.thumbnail,
    stock: quantity,
    price: Number(sale_price ? sale_price : price) + totalExtras,
    price_total: Number(sale_price ? sale_price : price)
  };
}
