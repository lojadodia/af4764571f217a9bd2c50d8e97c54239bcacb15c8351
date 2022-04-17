import { PlusIcon } from "@components/icons/plus-icon";
import { MinusIcon } from "@components/icons/minus-icon";
import CartIcon from "@components/icons/cart";
import cn from "classnames";

type Props = {
  variant?: "helium" | "neon" | "argon" | "oganesson" | "single" | "big";
  onClick(event: React.MouseEvent<HTMLButtonElement | MouseEvent>): void;
  disabled?: boolean;
};
const buttonStyle = {
  bottom: '48px',
  zIndex: 50
}
const AddToCartBtn: React.FC<Props> = ({ variant, onClick, disabled }) => {
  switch (variant) {
    case "neon":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="group w-full h-10 md:h-9 flex items-center justify-between border py-5 border dark:border-neutral-700 text-black rounded-full focus:  dark:bg-neutral-900 dark:text-white transition-colors hover:bg-primary hover:border-primary hover:text-white focus:outline-none focus:bg-primary focus:border-primary focus:text-white "
        >
           <span className="w-10 h-10 md:w-9 md:h-9 text-disabled grid place-items-center rounded-full transition-colors duration-200 group-hover:bg-gossamer-600 group-focus:bg-gossamer-600">
            <MinusIcon className="w-6 h-6 stroke-2" />
          </span>
          <span className="flex-1">Adicionar</span>
          <span className="w-10 h-10 md:w-9 md:h-9  grid place-items-center  rounded-full transition-colors duration-200 group-hover:bg-gossamer-600 group-focus:bg-gossamer-600">
            <PlusIcon className="w-6 h-6 stroke-2" />
          </span>
        </button>
      );
    case "argon":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-sm text-heading bg-white rounded border border-gray-200 transition-colors hover:bg-primary hover:border-primary hover:text-white focus:outline-none focus:bg-primary focus:border-primary focus:text-white"
        >
          <PlusIcon className="w-5 h-5 stroke-2" />
        </button>
      );
    case "oganesson":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-sm rounded-full text-white bg-primary shadow-500 transition-colors hover:bg-primary hover:border-primary hover:text-white focus:outline-none focus:bg-primary focus:border-primary focus:text-white"
        >
          <span className="sr-only">plus</span>
          <PlusIcon className="w-5 h-5 md:w-6 md:h-6 stroke-2" />
        </button>
      );
    case "single":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="order-5 sm:order-4 py-2 px-3 sm:px-5 border-2 border-gray-100 flex items-center justify-center sm:justify-start text-sm font-semibold rounded-full text-primary hover:text-white bg-white hover:bg-primary hover:border-primary transition-colors duration-300 focus:outline-none focus:bg-primary focus:border-primary focus:text-white"
        >
          <CartIcon className="w-4 h-4 mr-2.5" />
          <span>Carrinho</span>
        </button>
      );
    case "big":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "add-cart-button py-4 px-5 h-14 w-full flex items-center text-white justify-center text-lg lg:text-base font-light md:rounded bg-primary hover:bg-primary-2 transition-colors duration-300 focus:outline-none focus:bg-primary-2 text-special-shadow",
            {
              "border dark:text-neutral  !bg-gray-300 hover:!bg-gray-300 border-black !text-gray-500 cursor-not-allowed": disabled,
            }
          )}
        >
          <span>Adicionar ao Carrinho</span>
        </button>
      );
    default:
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          title={disabled ? "Out Of Stock" : ""}
          className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-sm text-primary bg-white rounded border border-gray-200 transition-colors hover:bg-primary hover:border-primary hover:text-white focus:outline-none focus:bg-primary focus:border-primary focus:text-white"
        >
          <span className="sr-only">plus</span>
          <PlusIcon className="w-5 h-5 stroke-2" />
        </button>
      );
  }
};

export default AddToCartBtn;
