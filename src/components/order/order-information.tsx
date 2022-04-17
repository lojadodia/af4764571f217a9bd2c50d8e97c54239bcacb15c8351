import CheckoutCartItem from "@components/checkout/checkout-cart-item";
import Coupon from "@components/checkout/coupon";
import { useCheckout } from "@contexts/checkout.context";
import usePrice from "@utils/use-price";
import EmptyCartIcon from "@components/icons/empty-cart";
import { CloseIcon } from "@components/icons/close-icon";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useSettings } from "@contexts/settings.context";
import {
  calculatePaidTotal,
  calculateTotal,
} from "@contexts/quick-cart/cart.utils";
interface Props {
  className?: string;
}

const OrderInformation = (props: Props) => {
  const { items, isEmpty } = useCart();
  const settings = useSettings();
  const { checkoutData, discount, removeCoupon, coupon } = useCheckout();
  
  const available_items = items?.filter(
    (item: any) => !checkoutData?.unavailable_products?.includes(item.id)
  );
  const { price: tax } = usePrice(
    checkoutData && {
      amount: checkoutData.total_tax ?? 0,
    }
  );
  const { price: shipping } = usePrice(
    checkoutData && {
      amount: checkoutData.shipping_charge ?? 0,
    }
  );
  const base_amount = calculateTotal(available_items);
  const { price: sub_total } = usePrice(
    checkoutData && {
      amount: base_amount,
    }
  );
  const { price: discountPrice } = usePrice(
    discount && {
      amount: discount,
    }
  );
  const { price: total } = usePrice(
    checkoutData && {
      amount: calculatePaidTotal(
        {
          totalAmount: base_amount,
          tax: checkoutData?.total_tax,
          shipping_charge: checkoutData?.shipping_charge,
          coupon: coupon
        },
        Number(discount)
      ),
    }
  );
  
  return (
    <div className={props.className}>
      <div className="flex flex-col border-b pb-2 border-rgb dark:border-neutral-700">
        {!isEmpty ? (
          items?.map((item: any) => {
            const notAvailable = checkoutData?.unavailable_products?.find(
              (d: any) => d === item.id
            );
            return (
              <CheckoutCartItem
                item={item}
                key={item.id}
                notAvailable={!!notAvailable}
                isOffer={item.id.toString().indexOf(".offer") != -1}
              />
            );
          })
        ) : (
          <EmptyCartIcon />
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body dark:text-neutral">Sub Total</p>
          <span className="text-sm text-body dark:text-neutral">{sub_total}</span>
        </div>
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body dark:text-neutral">{settings?.aux?.taxName ? settings?.aux?.taxName : "Taxas"}</p>
          <span className="text-sm text-body dark:text-neutral">{tax}</span>
        </div>
        <div className="flex justify-between mb-3">
          <p className="text-sm text-body dark:text-neutral">Entrega</p>
          <span className="text-sm text-body dark:text-neutral">{shipping}</span>
        </div>
        {discount ? (
          <div className="flex justify-between mb-4">
            <p className="text-sm text-body dark:text-neutral mr-4">Desconto</p>
            <span className="text-xs font-semibold text-red-500 flex items-center mr-auto">
              ({coupon.code})
              <button onClick={removeCoupon}>
                <CloseIcon className="w-3 h-3 ml-2" />
              </button>
            </span>
            <span className="text-sm text-body dark:text-neutral">{discountPrice}</span>
          </div>
        ) : (
          <div className="flex justify-between mt-5 mb-4">
            <Coupon />
          </div>
        )}
        <div className="flex justify-between border-t-4 border-double border-rgb dark:border-neutral-700 pt-4">
          <p className="text-base font-semibold text-heading dark:text-white">Total</p>
          <span className="text-base font-semibold text-heading dark:text-white">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
