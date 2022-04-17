import Button from "@components/ui/button";
import { useCheckout } from "@contexts/checkout.context";
import usePrice from "@utils/use-price";
import CheckoutCartItem from "@components/checkout/checkout-cart-item";
import { useRouter } from "next/router";
import { formatOrderedProduct } from "@utils/format-ordered-product";
import EmptyCartIcon from "@components/icons/empty-cart";
import { loggedIn } from "@utils/is-loggedin";
import { useUI } from "@contexts/ui.context";
import { useState } from "react";
import ValidationError from "@components/ui/validation-error";
import { useVerifyCheckoutMutation } from "@data/order/use-checkout-verify.mutation";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useSettings } from "@contexts/settings.context";
import { toast } from 'react-toastify'

const VerifyCheckout = () => {
  const router = useRouter();
  const [errorMessage, setError] = useState("");
  const { delivery_time, billing_address, setCheckoutData, order_type, checkoutData } = useCheckout();
  const { items, total, isEmpty } = useCart();
  const { openModal, setModalView } = useUI();
  const settings = useSettings();
  const { price: subtotal } = usePrice(
    items && {
      amount: total,
    }
  );
   
  const { price: minAmount } = usePrice(
    {
      amount: +settings?.minAmount,
    }
  );
 


  const {
    mutate: verifyCheckout,
    isLoading: loading,
  } = useVerifyCheckoutMutation();
  async function handleVerifyCheckout() {
    if (loggedIn()) {
      if (settings?.minAmount <= total) {

        if (order_type == "takeaway") {

          if ((settings?.scheduleType != "store" && delivery_time) || ((settings?.scheduleType == "store"))) {
            //if (billing_address && shipping_address) {
            verifyCheckout(
              {
                amount: total,
                products: items?.map((item) => formatOrderedProduct(item)),
                billing_address: {
                  'mode': 'takeaway'
                },
                shipping_address: {
                  'mode': 'takeaway'
                },

              },
              {
                onSuccess: (data) => {
                  setCheckoutData(data);
                  router.push("/order");

                },
                onError: (error) => {
                },
              }
            );
          } else {
            if (settings?.scheduleType != "store") {
              setError("Selecione a Data e Hora");
            }

          }

        } else {
          if ((settings?.scheduleType != "store" && billing_address && delivery_time) || ((settings?.scheduleType == "store" && billing_address))) {
            //if (billing_address && shipping_address) {
            verifyCheckout(
              {
                amount: total,
                products: items?.map((item) => formatOrderedProduct(item)),
                billing_address: {
                  ...(billing_address?.address && billing_address.address),
                },
                shipping_address: {
                  ...(billing_address?.address && billing_address.address),
                },

              },
              {
                onSuccess: (data) => {
                  setCheckoutData(data);
                  if (data['shipping_charge'] == 98765) {
                    toast.error("Para entregas nesta morada nos contacte: "+settings?.site?.phone);
                    window.location.hash = "#target-address"
                  } else {
                    router.push("/order");
                  }

                },
                onError: (error) => {
                },
              }
            );
          } else {
            if (settings?.scheduleType != "store") {
              if (!billing_address) {
                toast.error("Clique sobre o seu Endereço para o Selecionar");
                window.location.hash ="#target-address"
              } else if (!delivery_time) {
                toast.error("Selecione a Data e Hora");
                window.location.hash = "#target-schedule"
              }
            } else {
              toast.error("Adicione ou selecione o seu Endereço");
            }

          }
        }





      } else {
        setError("Valor inferior ao valor mínimo de: " + minAmount + ".");
      }

    } else {
      setModalView("LOGIN_VIEW");
      openModal();
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center space-x-4 mb-4">
        <span className="text-base font-bold text-heading dark:text-white">Seu Pedido</span>
      </div>
      <div className="flex flex-col py-3 border-b dark:border-neutral-100 border-rgb">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center mb-4">
            <EmptyCartIcon width={140} height={176} />
            <h4 className="mt-6 text-gray-500 font-semibold dark:text-gray">
              Nenhum produto encontrado
            </h4>
          </div>
        ) : (
          items?.map((item) => <CheckoutCartItem isOffer={item.id.toString().indexOf(".offer") != -1} item={item} key={item.id} />)
        )}
      </div>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-sm text-body dark:text-gray">Sub Total</p>
          <span className="text-sm text-body dark:text-gray">{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-body dark:text-gray">{settings?.aux?.taxName ? settings?.aux?.taxName : "Taxas"}</p>
          <span className="text-sm text-body dark:text-gray">Cálculo no Checkout</span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-body dark:text-gray">Entrega Estimada</p>
          <span className="text-sm text-body dark:text-gray">Cálculo no Checkout</span>
        </div>
      </div>

      {(settings?.order?.type?.takeaway == 'true' || settings?.order?.type?.delivery == 'true') && (
      <Button
        loading={loading}
        className="w-full mt-5 add-cart-button h-16 text-lg text-special-shadow"
        onClick={handleVerifyCheckout}
        disabled={isEmpty}
      >
        Fazer Pagamento Seguro →
      </Button>
      )}
      {errorMessage && (
        <div className="mt-3">
          <ValidationError message={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default VerifyCheckout;
