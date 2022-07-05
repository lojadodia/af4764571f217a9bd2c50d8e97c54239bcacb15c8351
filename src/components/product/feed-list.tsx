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
import { ProductCategoryList } from "@components/product/product-items/product-list";
import { DayProducts } from "@components/product/product-items/day-products-list";
import { Category } from "@ts-types/custom.types";
import { useProductQuery } from "@data/product/use-product.query";
import { getVariations } from "@utils/get-variations";
import { setTimeout } from "timers/promises";
const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);

const FeedList = () => {
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


  useEffect(() => {
    if(query?.tv == "true"){
      setInterval(() => {
        if(location.hash == "" || location.hash == "#"){
          window.location.hash = "#bottom" 
        }else{
          window.location.hash = "#" 
        }
      }, 10000);
    }
  }, []);




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
    <div className="bg-gray-100  dark:bg-black min-h-full p-5" style={{zoom: query?.tv == "true" ? "0.8" : "0.8"}}>
      <div className="dark:bg-neutral-900  pt-6 pb-8 ">
      <div className="masonry sm:masonry-sm lg:masonry-lg md:masonry-md" style={{ marginTop: "-25px" }}>
        {loading && !data?.pages?.length ? (
         <></>
        ) : ( 
          <>
            {!!cacheData2?.length && (
              <div className="break-inside ">
                <div className="absolute scroll-behavior" id="hh"></div>
                <h1 className="mt-0 p-2 text-md mb-2 rounded text-white uppercase tracking-tight bg-black font-semibold absolute-capitalize">
                  {" "}
                  {menuTitle ? menuTitle : "Menus do dia"}
                </h1>
                <div className="px-2">
                <ul className="leaders" >
                  <DayProducts products={cacheData2}/>
                  </ul>
                </div>
              </div>
            
            )}

            {cacheData?.map((items: Category) => (
              <div key={items.id}>
                  <ProductCategoryList
                    key={items.id}
                    name={items.name}
                    slug={items.slug}
                    products={items.products}
                  />
              </div>
            ))}
          </>
        )}
        <div id="bottom"></div>
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

export default FeedList;
