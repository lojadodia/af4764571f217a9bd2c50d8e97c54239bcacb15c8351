import dynamic from "next/dynamic";

const Mini = dynamic(() => import("@components/product/product-card/mini")); // grocery-two

export default function renderProductMiniCard(product: any, className = "") {
  return <Mini product={product} className={className} />;

}
