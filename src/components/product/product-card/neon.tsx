import Image from "next/image";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import { useUI } from "@contexts/ui.context";
import { useSettings } from "@contexts/settings.context";
import { useProductQuery } from "@data/product/use-product.query";
import { useEffect } from "react";

type NeonProps = {
  product: any;
  className?: string;
};
 
const Neon: React.FC<NeonProps> = ({ product, className }) => {
  const { name, image, quantity, product_type } = product ?? {};

  const {
    options,
  } = product ?? {};
 

  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.sale_price,
  });
  const { price: min_price } = usePrice({
    amount: +product.min_price,
  });
  const { openModal, setModalView, setModalData } = useUI();

  function handleProductQuickView() {
    const url: URL = new URL(window.location)
    url.pathname = `/a/${product.slug}`
    window.history.pushState({}, product.slug, url)
    setModalData(product.slug);
    setModalView("PRODUCT_DETAILS");
    return openModal();
  }
  const settings  = useSettings();
  
  return (
    <article
      className={cn(
        "product-card cart-type-neon rounded h-full bg-white dark:bg-black border dark:border-neutral-700 overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5",
        className
      )}
    >
      <div
        className="relative flex items-center justify-center cursor-pointer w-auto h-48 sm:h-64"
        onClick={handleProductQuickView}
      >
        <Image
          src={settings?.env?.THEME == "dark" ? (image?.original ?? "/dark/product-placeholder.svg") : (image?.original ?? siteSettings?.product?.placeholderImage)}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4 rounded text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-primary text-white">
            {discount}
          </div>
        )}
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6">
        <h3
          className=" md:text-sm text-heading font-semibold dark:text-white  truncate mb-0 cursor-pointer absolute-capitalize"
          onClick={handleProductQuickView}
        >
          {name}
        </h3>
        <div className="flex items-center mb-2">
          
          <span className=" md:text-base text-heading dark:text-white ">
          { product?.price == 0 ? "" : product_type == "simple" ? ( basePrice ? basePrice : price ) : (<>{min_price} <sup className="text-body" style={{fontSize:'9px'}}>DESDE</sup></>)}
          </span>
          {discount && (
            <del className="text-xs md:text-sm text-gray-400 dark:text-neutral  ml-2">{price}</del>
          )}
        </div>
        {/* End of product price */}

       
        {/* End of product title */}
        { product?.price == 0 ? (
          <div className="bg-primary rounded text-xs text-center text-white px-2 py-1.5 sm:py-2.5" onClick={handleProductQuickView}>
            Saber mais
          </div>  
        )
      : (
        quantity > 0 ? (
          <div>
            <AddToCart variant="neon" data={product} isOpen={product_type !== "simple" || options } handlerModal={handleProductQuickView} />          

          </div> 
        ) : (
          <div className="bg-red-500 rounded text-xs text-center text-white px-2 py-1.5 sm:py-2.5">
            Fora de estoque
          </div>
        )
          
      )}
        {/* End of add to cart */}
      </header>
    </article>
  );
};

export default Neon;
