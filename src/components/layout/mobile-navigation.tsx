import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useUI } from "@contexts/ui.context";
import { NavbarIcon } from "@components/icons/navbar-icon";
import { SearchIcon } from "@components/icons/search-icon";
import { HomeIcon } from "@components/icons/home-icon";
import { ShoppingBagIcon } from "@components/icons/shopping-bag-icon";
import { UserIcon } from "@components/icons/user-icon";
import { useCart } from "@contexts/quick-cart/cart.context";

type MobileNavigationProps = {
  search?: boolean;
};

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  search = true,
}) => {
  const router = useRouter();
  const {
    openSidebar,
    setSidebarView,
    openModal,
    setModalView,
    toggleMobileSearch,
    isAuthorize,
  } = useUI();
  const { totalUniqueItems } = useCart();
  function handleSidebar(view: string) {
    setSidebarView(view);
    return openSidebar();
  }
  function handleAuthModal() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }

  return (
    <div className="visible lg:hidden h-16 md:h-14 dark:bg-neutral-900">
      <nav className="h-16 md:h-14 w-full py-1.5 px-2 flex justify-between fixed left-0 bottom-0 z-10 bg-white dark:bg-black shadow-400" style={{zIndex:80}}>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => handleSidebar("MAIN_MENU_VIEW")}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-primary"
        >
          <span className="sr-only">Burger Menu</span>
          <NavbarIcon />
        </motion.button>

        {search === true && (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={toggleMobileSearch}
            className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-primary"
          >
            <span className="sr-only">Procurar</span>
            <SearchIcon width="17.05" height="18" />
          </motion.button>
        )}

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => router.push("/")}
          className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-primary"
        >
          <span className="sr-only">Página Inicio</span>
          <HomeIcon />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => handleSidebar("CART_VIEW")}
          className="flex p-2 product-cart h-full text-lg relative items-center justify-center focus:outline-none focus:text-primary"
        >
          <span className="sr-only">Carrinho</span>
          <ShoppingBagIcon />
          {totalUniqueItems > 0 && (
            <span className="bg-primary py-1 px-1.5 text-10px leading-none font-semibold text-white rounded-full absolute top-0 right-0 mt-0.5 -mr-0.5">
              {totalUniqueItems}
            </span>
          )}
        </motion.button>

        {isAuthorize ? (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => handleSidebar("AUTH_MENU_VIEW")}
            className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-primary"
          >
            <span className="sr-only">Usuário</span>
            <UserIcon />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleAuthModal}
            className="flex p-2 h-full items-center justify-center focus:outline-none focus:text-primary"
          >
            <span className="sr-only">Usuário</span>
            <UserIcon />
          </motion.button>
        )}
      </nav>
    </div>
  );
};

export default MobileNavigation;
