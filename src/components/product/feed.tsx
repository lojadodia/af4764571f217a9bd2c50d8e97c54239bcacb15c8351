import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Button from "@components/ui/button";
import ErrorMessage from "@components/ui/error-message";
import renderProductCard from "@components/product/render-product-card";
import NotFound from "@components/common/not-found";
import {
  useProductsQuery, 
  useProductsTodayMenuQuery,
} from "@data/product/use-products.query";
import { useCategoriesQuery } from "@data/category/use-categories.query";
import { Fragment, useEffect, useState } from "react";
import {
  listCategory,
  useSettingsQuery,
} from "@data/settings/use-settings.query";
import { ProdutosItemsCategory } from "@components/product/product-items";
import { Category } from "@ts-types/custom.types";
const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);

const Feed = () => {
  const { query } = useRouter();
  const { type } = query;
  const { data: allCategories } = useCategoriesQuery({
    type: type as string,
  });
  const {
    data: {
      settings: {
        options: { menuTitle },
      },
    },
  } = useSettingsQuery();

  const {
    isFetching: loading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    isError,
    data,
    error,
  } = useProductsQuery({
    type: query.type as string,
    text: query?.text as string,
    category: query?.category as string,
  });
  const [cacheData, setCacheData] = useState<Category[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const dataAllList = async () => {
      const data = (await listCategory()) as Category[];
      setCacheData(data);
    };
    dataAllList(c=>c=data);
  }, []);

  const {
    isFetching: loading2,
    isFetchingNextPage: loadingMore2,
    fetchNextPage: fetchNextPage2,
    hasNextPage: hasNextPage2,
    isError: isError2,
    data: data2,
    error: error2,
  } = useProductsTodayMenuQuery({
    type: query.type as string,
    text: query?.text as string,
    category: query?.category as string,
  });
  const [cacheData2, setCacheData2] = useState<any>(data2 ?? []);

  useEffect(() => {
    if (data2 && data2.pages[0].data) {
      let products = data2.pages[0].data;

      setCacheData2(products);
    }
  }, [data2]);

  if (isError && error) return <ErrorMessage message={error.message} />;
  function handleLoadMore() {
    fetchNextPage();
  }
  if (!loading && !cacheData) {
    return (
      <div className="bg-gray-100 dark:bg-neutral-900 min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound
          // text="Nenhum produto encontrado :("
          className="w-7/12 mx-auto"
        />
      </div>
    );
  }
  return (
    <div className="bg-gray-100  dark:bg-black min-h-full">
      <div className="dark:bg-neutral-900  pt-6 pb-8 px-2 lg:p-8">
      <div className="relative" style={{ marginTop: "-25px" }}>
        {loading && !data?.pages?.length ? (
          <ProductFeedLoader limit={20} />
        ) : ( 
          <>
            {!!cacheData2?.length && (
              <div className="relative">
                <div className="absolute scroll-behavior" id="hh"></div>
                <h1 className="mb-4 mt-8 text-2xl dark:text-white text-heading font-bold uppercase">
                  {" "}
                  {menuTitle ? menuTitle : "Menus do dia"}
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">
                  <Fragment>
                    {cacheData2?.map((product: any) => (
                      <motion.div key={product.id}>
                        {renderProductCard(product)}
                      </motion.div>
                    ))}
                  </Fragment>
                </div>
              </div>
            )}

            {cacheData?.map((items: Category) => (
              <div key={items.id}>
                  <ProdutosItemsCategory
                    key={items.id}
                    name={items.name}
                    slug={items.slug}
                    products={items.products}
                  />
              </div>
            ))}
          </>
        )}
      </div>
      
      {hasNextPage && (
        <div className="flex justify-center mt-8 lg:mt-12">
          <Button
            loading={loadingMore}
            onClick={handleLoadMore}
            className="text-sm md:text-base font-semibold h-11"
          >
            Carregar mais
          </Button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Feed;
