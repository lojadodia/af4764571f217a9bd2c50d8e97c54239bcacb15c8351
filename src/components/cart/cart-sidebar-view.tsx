
import { motion, AnimateSharedLayout } from "framer-motion";
import { useUI } from "@contexts/ui.context";
import CartCheckBagIcon from "@components/icons/cart-check-bag";
import EmptyCartIcon from "@components/icons/empty-cart";
import { CloseIcon } from "@components/icons/close-icon";
import CartItem from "@components/cart/cart-item";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useCart } from "@contexts/quick-cart/cart.context";
import { formatString } from "@utils/format-string";
import ButtonBuy from "@components/ui/button-buy";

const CartSidebarView = () => {
  const { items, totalUniqueItems } = useCart();
  const { closeSidebar } = useUI();

  return (
    <section className="flex flex-col h-full relative dark:bg-neutral-800">
      <header className="fixed max-w-md w-full top-0 z-10 bg-white dark:bg-black py-4 px-6 flex items-center justify-between border-b border-gray-200 dark:border-neutral-700 border-opacity-75">
        <div className="flex text-primary font-semibold">
          <CartCheckBagIcon className="flex-shrink-0" width={24} height={22} />
          <span className="flex ml-2">
            {/* {formatString(totalUniqueItems, "Item")} */} CARRINHO
          </span>
        </div>
        <button
          onClick={() => closeSidebar()}
          className="w-7 h-7 ml-3 -mr-2 flex items-center justify-center rounded-full text-gray-400 bg-gray-100 dark:text-white dark:bg-neutral-100 transition-all duration-200 focus:outline-none hover:bg-primary focus:bg-primary hover:text-white focus:text-white"
        >
          <span className="sr-only">close</span>
          <CloseIcon className="w-3 h-3" />
        </button>
      </header>
      {/* End of cart header */}

      <AnimateSharedLayout>
        <motion.div layout className="flex-grow pt-16">
          {items.length > 0 ? (
            items?.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <motion.div
              layout
              initial="from"
              animate="to"
              exit="from"
              variants={fadeInOut(0.25)}
              className="h-full flex flex-col items-center justify-center"
            >
              <EmptyCartIcon width={500} height={176}  />
              <h4 className="mt-6 text-gray-500 font-semibold dark:text-gray">
              Nenhum produto encontrado
              </h4>
            </motion.div>
          )}
        </motion.div>
      </AnimateSharedLayout>
      {/* End of cart items */}

      <footer className="sticky left-0 bottom-0 w-full py-5 px-6 z-10 bg-white dark:bg-black">
        <ButtonBuy />
      </footer>
      {/* End of footer */}
    </section>
  
  );
};

export default CartSidebarView;
