import React from "react";
import { useCheckout } from "@contexts/checkout.context";
import { useUI } from "@contexts/ui.context";
import { OrderDeliveryIcon } from "../icons/order-delivery";
import { OrderTakeawayIcon } from "../icons/order-takeaway";


const OrderType = () => {
  const { setOrderType } = useCheckout();
  const { closeModal, modalData } = useUI();
  const setData = (data:any) => {
    setOrderType(data)
    closeModal()
    
  }
  return (
    <div className="p-5 sm:p-8 bg-white border-gray-200 rounded-lg dark:bg-neutral-800 border dark:border-neutral-700">
    <h1 className="text-heading dark:text-white font-semibold text-lg text-center mb-2 mt-2 sm:mb-6">
     Como pretende receber a sua Encomenda?
    </h1>
     <div className="flex" >
     <div role="button" onClick={() => setData("delivery")} className="lg:px-8 mx-1 col-6 my-2 md:flex-1 pt-6 pb-5 text-center  hover:bg-primary hover:text-white display-inline  border rounded  dark:border-neutral-500 border-gray-200 dark:bg-black cursor-pointer">
        <OrderDeliveryIcon color={modalData} className="block mx-auto" style={{width:'100%'}}  /> 
        <p className="text-lg my-1 pb-2 uppercase font-semibold" >
          
          Entrega  <span className="hidden lg:block"> Domiciliar </span>
        </p>

        </div>
        <div onClick={() => setData("takeaway")} role="button" className="lg:px-8 mx-1 col-6 my-2 md:flex-1 pt-6 pb-5 text-center hover:bg-primary hover:text-white display-inline  border rounded dark:border-neutral-500 border-gray-200 dark:bg-black cursor-pointer">
          <OrderTakeawayIcon color={modalData} className="block mx-auto" style={{width:'100%'}}  /> 
          <p className="text-lg my-1 pb-2 uppercase font-semibold" >
          Takeaway
           <span className="hidden lg:block">  (Recolha na Loja) </span>
          </p>
        </div>
       
     </div>
    </div>
  );
};

export default OrderType;
