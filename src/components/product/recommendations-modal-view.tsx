import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import renderProductMiniCard from "@components/product/render-product-mini-card";
import { Fragment } from "react";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import axios from "axios"
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { useUI } from "@contexts/ui.context";
import { useSettings } from "@contexts/settings.context";

const RecommendationsModal = () => {
  const settings = useSettings();
  const router = useRouter();
  const [data, setData] = useState();
  const { closeModal } = useUI();

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_REST_API_ENDPOINT+API_ENDPOINTS.RECOMMENDATIONS)
    .then(function (response) {
      setData(response?.data)
    })
  },[]); 
  
  
  function handleCheckout() {
      closeModal();
      router.push(ROUTES.CHECKOUT);
  }


  return (
    <div className="p-5 sm:p-8 bg-white border-gray-200 rounded-lg dark:bg-neutral-800 border dark:border-neutral-700">
    <h1 className="text-heading dark:text-white font-semibold text-lg text-center mb-5 mt-2 sm:mb-6">
      {settings?.site?.recommendations_title ? settings?.site?.recommendations_title : "As nossas Recomendações"}
    </h1>
     <div className="flex" >

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-2">
        {!data ? (
          <div>

          </div>
           
        ) : (
          <>
            {data?.map((product:any, _idx:string) => (
              <Fragment key={_idx}>
                  <motion.div key={product.id}>
                    {renderProductMiniCard(product)}
                  </motion.div>
              </Fragment>
            ))} 
          </>
        )}
      </div> 
   
     </div>
     <div className="w-full pt-5 text-center">
     <div className="lg:hidden block py-10 my-5 h-10"></div>
        <Button className="add-cart-button py-4 px-5 h-14 w-full flex items-center text-white justify-center text-lg lg:text-base font-light md:rounded bg-primary hover:bg-primary-2 transition-colors duration-300 focus:outline-none focus:bg-primary-2 text-special-shadow" size="big" onClick={handleCheckout}>
            Continuar para o Pagamento  →
        </Button>
        </div>
    </div>
  );
};

export default RecommendationsModal;
