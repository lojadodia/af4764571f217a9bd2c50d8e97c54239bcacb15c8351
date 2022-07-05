import React, { useLayoutEffect, useState } from "react";

import { useUI } from "@contexts/ui.context";
import Confetti from 'react-confetti'
import Image from "next/image";
import { useSettings } from "@contexts/settings.context";

const ProductOffer = () => {
  function nl2br (str: any, is_xhtml : any) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }
  const { closeModal, modalData } = useUI();
  const [dimension, setDimension] = useState<{dw: number, dh: number}>()
  const settings  = useSettings();
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
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Parabéns, ganhou esta oferta 🎉 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </h1>
    <p style={{fontSize: "28px"}} className="font-semibold pb-2 text-center">{modalData?.offer?.code}</p>
    <hr className="dark:border-neutral-500" />
    <p className="text-center text-primary py-3 uppercase items-center justify-center">
    <div className="w-32 sm:w-32 mx-auto h-32 sm:h-32   overflow-hidden mx-auto flex-shrink-0 relative">


  <Image
          src={settings?.env?.THEME == "dark" ? (modalData?.item?.image ?? "/dark/product-placeholder.svg") : (modalData?.item?.image ?? "/product-placeholder.svg")}
          alt={modalData.item?.name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />



    
      </div>
      {modalData.item?.name}
  
    </p>
    <hr className="dark:border-neutral-500" />
    <p className="text-center mt-3 mb-3 text-xs" dangerouslySetInnerHTML={{ __html: nl2br(modalData.offer?.description,true) }}></p>
     <div className="md:flex" >
        <div onClick={() => setData()} role="button" className="px-8 mx-1 col-6 my-2 md:flex-1 pt-4 pb-4 text-center bg-primary text-white display-inline  border rounded dark:border-neutral-700 border-gray-200  cursor-pointer">
         Ok, Obrigado!
        </div>
       
     </div>
    </div>
  );
};

export default ProductOffer;
