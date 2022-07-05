import React, { Fragment, memo } from "react";
import { Category, Product } from "@ts-types/custom.types";
import { motion } from "framer-motion";
import renderProductCard from "@components/product/render-product-card";
import usePrice from "@utils/use-price";
import { useProductQuery } from "@data/product/use-product.query";
import { getVariations } from "@utils/get-variations";
import Truncate from "@components/ui/truncate-scroll";
type PropsData = {
  products: Product[];
  slug:string;
  name:string

};

export function Produts({ products, name, slug }: PropsData) {
  
  return(
  <div className="break-inside">
    <div className="absolute scroll-behavior" id={slug}></div>
    <h1 className="mt-0 p-2 text-md mb-2 rounded text-white uppercase tracking-tight bg-black font-semibold absolute-capitalize">
      {name}
    </h1>
    <div className="grid grid-cols-1 px-2">
    <ul className="leaders ">



      <Fragment>
        {products?.map((product: any) => {
            if(product?.product_type == "variable"){
              const { data, isLoading: loading } = useProductQuery(product?.slug);

                return (
                  <li className="uppercase w-full relative h-5 flex">
                    <div className="overflow-hidden w-1/2">
                      <span className="price-left bg-gray-100 pb-2  text-xs tracking-tight font-semibold" style={{lineHeight:"-30px !important"}}> 
                        {product?.name}
                      </span>
                    </div>
                    <div className="text-right w-1/2"  dangerouslySetInnerHTML={{__html: data?.first_variations}} />
                  </li>
                )
            }else{
                return ( <li className="uppercase flex h-5">
                  <div className="w-full pb-2 " style={{lineHeight:"-30px !important"}}><span className="price-left  text-xs tracking-tight font-semibold">   

                  {product?.name}
             </span></div>
                  <div className="price-right tracking-tight  text-right"><b className="bg-gray-100 text-right font-normal">{product?.price?.toFixed(2).replace('.',',')+"€"}</b></div>
                </li>)
            }
          }
        )}
      </Fragment>
      </ul>
    </div>
  </div>
  )
}


export const ProductCategoryList = memo(Produts)