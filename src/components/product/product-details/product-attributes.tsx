import RadioGroup from "@components/ui/radio-group";
import ExtraGroup from "@components/ui/extra-group";
import { getColor } from "@utils/get-color";
import React, { useState, useEffect, useRef } from "react";
import { stringify } from "querystring";

interface Props {
  product: any;
  variations: any;
  attributes: any;
  extras: any;
  selectedExtras: any;
  activeExtra: boolean;
  baseLimitExtra?: number;
  setAttributes: (key: any) => void;
  toggleExtra: (key: any) => void;
}


const ProductAttributes = ({
  product,
  variations,
  attributes,
  extras,
  selectedExtras,
  activeExtra,
  baseLimitExtra = 10,
  setAttributes,
  toggleExtra,
}: Props) => {
  const [limitExtra, setLimitExtra] = useState(baseLimitExtra)
  if (!variations) return null;

  const refExtras = useRef(null)
  const refBgAttr = useRef(null)
  const [cardapioId, setCardapioId ] = useState(0)
  for (let name of Object.keys(variations)) {

    const regEx = /Não, Obrigado/i
    let items = variations[name]
    //if (items[0].attribute?.name.includes("Bebida")) {
      const index = items.findIndex((item: { value: string }) => regEx.test(item.value))
      if (index > -1) {
        let deleteElement = variations[name].splice(index, 1)
        variations[name].unshift(deleteElement[0])
        //break; 
      }
    //}
  }
  const toggleAttr = (attribute:any,variationName:string,index:number) => {
    setAttributes((prev: any) => ({
      ...prev,
      [variationName]: attribute.value,
    }))


    window.location.hash ="#"+product+"-attr-"+Number(index+2);
    if(Object.keys(variations).length - 1 === index){
      setTimeout(() => {
        window.location.hash ="#"+product+"-extras"
      }, 5);
    }


    
  };
  useEffect(() => {
    setTimeout(() => {
      window.location.hash ="#"+product+"-attr-1"
    }, 500);
  }, []);


  // useEffect(() => {
      // if (!refExtras.current) return
      // if (!activeExtra) {
      //   window.location.hash ="#extras"
      // }
  // }, [activeExtra, refExtras.current])


  

  return (
    <>

      {Object.keys(variations).map((variationName, index) => (

      (variations[variationName].length !== 1) && <div 
      onClick={() => setCardapioId(prev => index + 1)}
      style={{
        opacity: index <= cardapioId  ? 1 : 0.2
      }}
          className="pb-5 flex flex-col relative items-start px-3 border-b border-gray-300 dark:border-neutral-700 border-opacity-70 first:pt-0"
          key={index}
          
        >
         
          <div id={`${product}-attr-${index + 1}`} ref={refBgAttr}
          className="absolute"
          style={{marginTop:"-200px",background:"transparent",width:"1px",height:"1px"}}></div>
          {index === cardapioId && 
            <div className="absolute bg-attr top-0 left-0" style={{width:"100%",height:"100%",zIndex:"-10",background:"yellow",opacity:0.6}}></div>
          }
         
          <span className="text-md  pt-5 text-heading  dark:text-gray leading-none uppercase font-bold mb-3 mr-4 min-w-[60px] inline-block">
           {index + 1}. {variations[variationName][0].attribute?.name}
            &nbsp;<span><sup className="text-body dark:text-neutral"></sup></span>
          </span>

          <div className="w-full flex flex-wrap justify-start" >
            {variations[variationName].map((attribute: any) => (
              
              <RadioGroup
              className={variationName.concat(' ').concat(`${ !!parseInt(attribute.available) ? '': 'invisible pointer-events-none max-w-0 max-h-0 absolute'}`)}
                color={getColor(
                  attribute.meta ? attribute.meta : attribute?.value
                )}
                key={attribute.id}
                label={attribute.value}
                active={attributes[variationName] === attribute.value}
                onClick={() =>
                  toggleAttr(attribute,variationName,index)
                }

              />
            ))}
          </div>
        </div>

      ))}


      {!activeExtra && Object.keys(extras).map((ExtraName, index) => (
        <div
          className="pt-5 pb-2 px-2 flex flex-col relative items-start border-b border-gray-200 dark:border-neutral-700  border-opacity-70 first:pt-0"
          key={index} 
        >


      <div ref={refExtras} id={`${product}-extras`} className="absolute" style={{marginTop:"-200px",background:"red",width:"1px",height:"1px"}}></div>

          {!activeExtra && 
            <div className="absolute bg-attr top-0 left-0" style={{width:"100%",height:"100%",zIndex:"-10",background:"yellow",opacity:0.6}}></div>
          }
          <span className="text-heading dark:text-gray leading-none uppercase font-bold mb-4 mr-4 min-w-[60px] inline-block">
            ADICIONAR {extras[ExtraName][0].attribute?.name} 
          </span>
          <div className="w-full flex flex-wrap justify-start">
            {extras[ExtraName].map((attribute: any, index: number) => {
              if (index < limitExtra) {
                return <ExtraGroup
                  className={ExtraName.concat(' ').concat(`${ !!parseInt(attribute.available) ? '': 'invisible pointer-events-none max-w-0 max-h-0 absolute'}`)}
                  key={attribute.id}
                  label={attribute.value}
                  price={attribute.sync_price}
                  active={selectedExtras[attribute.id]?.value === attribute.value}
                  onClick={() => toggleExtra(attribute)}
                />
              }
            }
            )}
            {(extras[ExtraName].length > baseLimitExtra) && <ExtraGroup
              className={ExtraName}
              active={!(limitExtra < extras[ExtraName].length)}
              label={limitExtra < extras[ExtraName].length ? 'Ver todos' : 'Ver menos'}
              onClick={() =>
                setLimitExtra(limitExtra == extras[ExtraName].length ? baseLimitExtra : extras[ExtraName].length)
              }
            />}
          </div>
        </div>

      ))}


    </>
  );
};

export default ProductAttributes;
