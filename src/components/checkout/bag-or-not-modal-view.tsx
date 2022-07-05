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
import VerifyCheckout from "@components/checkout/verify-checkout";



const BagOrNot = () => {
  const settings = useSettings();
  const router = useRouter();
  const [data, setData] = useState();
  const { closeModal } = useUI();
  

  function handleCheckout() {
      closeModal();
      router.push(ROUTES.CHECKOUT);
  }


  return (
    <div className="p-5 sm:p-8 bg-white border-gray-200 rounded-lg dark:bg-neutral-800 border dark:border-neutral-700">
    <h1 className="text-heading dark:text-white font-semibold text-lg text-center mb-5 mt-2 sm:mb-6">
      Deseja Saco?
    </h1>


      <div className="w-full">
        <VerifyCheckout type="simple"/>
      </div> 
   
    

    </div>
  );
};

export default BagOrNot;
