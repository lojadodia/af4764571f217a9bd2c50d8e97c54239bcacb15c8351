import Image from "next/image";
import cn from "classnames";
import usePrice from "@utils/use-price";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";

type HeliumProps = {
  product: any;
  className?: string;
};

const Helium: React.FC<HeliumProps> = ({ product, className }) => {
  const { name, image, unit, quantity } = product ?? {};
  const { openModal, setModalView, setModalData } = useUI();
  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.sale_price,
  });

  function handleProductQuickView() {
    setModalData(product.slug);
    setModalView("PRODUCT_DETAILS");
    return openModal();
  }

  return (
    <article
      className={cn(
        "product-card cart-type-helium rounded h-full bg-white overflow-hidden transition-shadow duration-200 hover:shadow-sm",
        className
      )}
    >
      <div
        onClick={handleProductQuickView}
        className="relative flex items-center justify-center w-auto h-48 sm:h-64"
        role="button"
      >
        <span className="sr-only">product image</span>
        <Image
          src={image?.original ?? siteSettings?.product?.placeholderImage}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />
        {discount && (
          <div className="absolute top-3 right-3 md:top-4 md:right-4 rounded-full text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-yellow-500 text-white">
            {discount}
          </div>
        )}
      </div>
      {/* End of product image */}

      <header className="p-3 md:p-6 relative">
        <h3
          onClick={handleProductQuickView}
          role="button"
          className="text-heading dark:text-white font-semibold truncate mb-2"
        >
          {name}
        </h3>
        <p className="text-gray-400 text-xs">{unit}</p>
        {/* End of product info */}

        <div className="flex items-center justify-between min-h-6 mt-7 md:mt-8 relative">
          <div className="relative">
            {discount && (
              <del className="text-xs text-gray-400 text-opacity-75 absolute -top-4 md:-top-5 italic">
                {price}
              </del>
            )}
            <span className="text-primary text-sm md:text-base font-semibold">
              {basePrice ? basePrice : price}
            </span>
          </div>
          {/* End of product price */}

          {quantity > 0 ? (
            <AddToCart data={product} variant="single" />
          ) : (
            <div className="bg-red-500 rounded text-xs text-white px-2 py-1">
           Fora de estoque
            </div>
          )}
          {/* End of add to cart */}
        </div>
      </header>
    </article>
  );
};

export default Helium;
