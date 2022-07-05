import React, { Fragment, memo } from "react";
import { Category, Product } from "@ts-types/custom.types";
import { motion } from "framer-motion";
import renderProductCard from "@components/product/render-product-card";
import usePrice from "@utils/use-price";
import { useProductQuery } from "@data/product/use-product.query";
import { getVariations } from "@utils/get-variations";
import Truncate from "@components/ui/truncate-scroll";

type PropsData = {
  products: any;

};

export function Products({ products }: PropsData) {
  
  return(
  <div className="">
    <Fragment>
                  {products?.map((product: any) => {
                     if(product?.product_type == "variable"){
                      const { data, isLoading: loading } = useProductQuery(product?.slug);
        
                        return (
                          <li className="uppercase w-full relative h-5">
                            <div className="overflow-hidden float-left">
                              <span className="price-left bg-gray-100 pb-2  text-xs tracking-tight font-semibold" style={{lineHeight:"-30px !important"}}> 
                                {product?.name}
                              </span>
                            </div>
                            <div className="text-right float-right"  dangerouslySetInnerHTML={{__html: data?.first_variations}} />
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
  </div>
  )
}


export const DayProducts = memo(Products)