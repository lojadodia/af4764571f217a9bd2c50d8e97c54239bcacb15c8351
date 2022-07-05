import { useRouter } from "next/router";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import usePrice from "@utils/use-price";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useSettings } from "@contexts/settings.context";

export default function ButtonBuy ({ className, title, isOpenModal }: any) {
  const { total } = useCart();
  const { closeSidebar, openSidebar, setSidebarView, openModal, setModalView } = useUI();
  const router = useRouter();
  const settings = useSettings();

  function handleCheckout() {
    if (isOpenModal) {
     setSidebarView('CART_VIEW')
     return openSidebar()
    }else {

      // Se as "recomendações" estiverem ativas
      if(settings?.site?.recommendations == "true"){
        closeSidebar();
        setModalView("RECOMMENDATIONS");
        return openModal();
      }

      router.push(ROUTES.CHECKOUT);
      return closeSidebar();

    }
  }

  const { price: totalPrice } = usePrice({
    amount: total,
  });
  return (
    total <= 0 ? null :
    <button
          className={"flex justify-between items-center w-full h-46 shadow md:h-14 p-2 text-lg font-bold bg-primary rounded-full shadow-700 transition-colors focus:outline-none hover:bg-primary-2 focus:bg-primary-2".concat(" ").concat(className)}
          onClick={() => handleCheckout()}
        >
          <span className="flex flex-1 items-center h-full px-5 text-white text-special-shadow">
            {title ? title : 'Pagamento'}
          </span>
          <span className="flex items-center flex-shrink-0 h-12 bg-white text-primary rounded-full px-5">
            {totalPrice}
          </span>
        </button>
  )
}