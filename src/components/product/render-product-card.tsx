import dynamic from "next/dynamic";

const Neon = dynamic(() => import("@components/product/product-card/neon")); // grocery-two

export default function renderProductCard(product: any, className = "") {
  return <Neon product={product} className={className} />;

}
