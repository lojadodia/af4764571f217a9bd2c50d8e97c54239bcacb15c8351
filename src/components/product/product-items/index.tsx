import React, { Fragment, memo } from "react";
import { Category, Product } from "@ts-types/custom.types";
import { motion } from "framer-motion";
import renderProductCard from "@components/product/render-product-card";
type PropsData = {
  products: Product[];
  slug:string;
  name:string

};

export function Produts({ products, name, slug }: PropsData) {
  
  return(
  <div className="relative">
    <div className="absolute scroll-behavior" id={slug}></div>
    <h1 className="mb-4 mt-5 text-2xl dark:text-white uppercase text-heading font-bold absolute-capitalize">
      {name}
    </h1>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-2">
      <Fragment>
        {products?.map((product: any) => (
          <motion.div key={product.id}>{renderProductCard(product)}</motion.div>
        ))}
      </Fragment>
    </div>
  </div>
  )
}


export const ProdutosItemsCategory = memo(Produts)