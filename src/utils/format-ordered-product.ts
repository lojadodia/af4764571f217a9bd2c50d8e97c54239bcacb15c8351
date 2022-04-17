export function formatOrderedProduct(product: any) {

  return {
    product_id: product?.productId ? product.productId : product.id,
    ...(product?.variationId
      ? { variation_option_id: product.variationId }
      : {}),
    extras: product.extras,
    obs: product.obs,
    order_quantity: product.quantity,
    unit_price: product.price,
    subtotal: product.itemTotal,
    price_total: product.item_price_total
  };
}
