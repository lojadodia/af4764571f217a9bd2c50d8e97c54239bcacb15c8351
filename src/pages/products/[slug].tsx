import { GetStaticProps } from "next";
import ProductDetails from "@components/product/product-details";
import Layout from "@components/layout/layout";
import { useRouter } from "next/router";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchProduct } from "@data/product/use-product.query";
import { Product } from "@ts-types/custom.types";
import dynamic from "next/dynamic";
import RelatedProducts from "@components/product/product-details/related-products";
const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

// This function gets called at build time
export async function getStaticPaths() {
  const products = await fetchProducts({
    queryKey: ["products", { type: "home" }],
  });
  const paths = products?.data?.map((product: Product) => ({
    params: { slug: product.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {

  const slug = params?.slug as string;
  try {
    const product = await fetchProduct(slug);
    return {
      props: {
        product,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function ProductSinglePage({ product = null }: any) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <Spinner />;
  }
  if (product === null) return <></>
  return (
    <>
      <div className="bg-white min-h-screen">
        <ProductDetails product={product} />

        {product?.related_products?.length > 1 && (
          <div className="p-5 lg:p-14 xl:p-16">
            <RelatedProducts
              products={product?.related_products}
              currentProductId={product?.id}
              gridClassName="lg:grid-cols-4 2xl:grid-cols-5 !gap-3"
            />
          </div>
        )}
      </div>

      <CartCounterButton />
    </>
  );
}
ProductSinglePage.Layout = Layout;
