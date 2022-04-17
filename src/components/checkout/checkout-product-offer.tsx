import React, { useLayoutEffect, useState } from "react";

import { useUI } from "@contexts/ui.context";
import Confetti from 'react-confetti'


const ProductOffer = () => {

  const { closeModal, modalData } = useUI();
  const [dimension, setDimension] = useState<{dw: number, dh: number}>()
  const setData = () => {
    closeModal()
  }
  useLayoutEffect(() => {
    setDimension(
      {
        dw: window.innerWidth,
        dh: window.innerHeight
      }
    )
  }, [])
  return (
    <div className="p-5 sm:p-8 max-w-md bg-white border-gray-200 rounded-lg dark:bg-neutral-800 border dark:border-neutral-700">
      <div style={{overflow: "hidden"}}>
        <Confetti
        width={dimension?.dw}
        height= {dimension?.dh}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
        }}
        />

      </div>
    <h1 className="text-heading dark:text-white font-semibold text-lg text-center mb-2 mt-2 sm:mb-6">
     Parabéns, ganhou esta oferta 🎉
    </h1>
    <p style={{fontSize: "35px"}} className="font-semibold text-center">{modalData?.offer?.code}</p>
    <hr className="dark:border-neutral-500" />
    <p className="text-center text-primary py-3 uppercase">
      {modalData.item?.name}
    </p>
    <hr className="dark:border-neutral-500" />
    <p className="text-center mt-3 mb-3 text-xs">{modalData.offer?.description}</p>
     <div className="md:flex" >
        <div onClick={() => setData()} role="button" className="px-8 mx-1 col-6 my-2 md:flex-1 pt-4 pb-4 text-center bg-primary text-white display-inline  border rounded dark:border-neutral-700 border-gray-200  cursor-pointer">
         Ok, Obrigado!
        </div>
       
     </div>
    </div>
  );
};

export default ProductOffer;
