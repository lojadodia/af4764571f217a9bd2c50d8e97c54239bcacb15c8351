import usePrice from "@utils/use-price";
import isEmpty from "lodash/isEmpty";

export default function VariationPrice({
  selectedVariation,
  minPrice,
  maxPrice,
  totalExtras,
  items,
}: any) {
  const { price, basePrice, discount } = usePrice(
    selectedVariation && {
      amount: +Number(selectedVariation.price) + totalExtras,
      baseAmount: +selectedVariation.sale_price,
    }
  );
  const { price: min_price } = usePrice({
    amount: +minPrice,
  });
  const { price: max_price } = usePrice({
    amount: +maxPrice,
  });
  const { price: variation_price } = usePrice(
    {
      amount: items?.length && +items.reduce((a: any, b: any) => a + b.sync_price, 0)
    }
  )

  console.log(variation_price, items)
  return (
    <span className="flex items-center">
      <ins className="text-2xl md:text-3xl font-semibold text-primary no-underline">
        {!isEmpty(selectedVariation)
          ? `${basePrice ? basePrice : price}`
          : (!!!items.length ? (<><sup className="text-sm"><small>DESDE</small></sup> <span className="">{min_price}</span></>)
          : variation_price
          )}
      </ins>
      {discount && (
        <del className="text-sm md:text-base font-normal text-gray-400 ml-2">
          {price}
        </del>
      )}
    </span>
  );
}
