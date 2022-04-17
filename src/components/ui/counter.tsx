import cn from "classnames";
import { PlusIcon } from "@components/icons/plus-icon";
import { MinusIcon } from "@components/icons/minus-icon";

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value: number;
  variant?:
    | "helium"
    | "neon"
    | "argon"
    | "oganesson"
    | "single"
    | "details"
    | "pillVertical"
    | "big";
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

const variantClasses = {
  helium:
    "w-7 h-18 sm:w-20 sm:h-7 md:h-9 md:w-24 bg-primary flex-col-reverse sm:flex-row absolute sm:static bottom-3 right-3 sm:bottom-0 sm:right-0 text-white rounded",
  neon: "w-full h-10 md:h-10 bg-primary text-white rounded-full",
  argon:
    "w-7 h-18 sm:w-20 sm:h-7 md:h-9 md:w-24 bg-primary flex-col-reverse sm:flex-row text-white rounded",
  oganesson:
    "w-20 h-8 md:w-24 md:h-10 bg-primary text-white rounded-full shadow-500",
  single:
    "order-5 sm:order-4 w-9 sm:w-24 h-24 sm:h-10 bg-primary text-white rounded-full flex-col-reverse sm:flex-row absolute sm:relative bottom-0 sm:bottom-auto right-0 sm:right-auto",
  details:
    "order-5 sm:order-4 w-full sm:w-24 h-10 bg-primary text-white rounded-full",
  pillVertical:
    "flex-col-reverse items-center w-10 h-24 bg-gray-100 text-heading rounded-full",
  big: "w-full h-14 md:rounded text-white bg-primary inline-flex justify-between add-cart-button",
};

const Counter: React.FC<CounterProps> = ({
  value,
  variant = "helium",
  onDecrement,
  onIncrement,
  className,
  disabled,
}) => {
  return (
    <div
      className={cn("flex overflow-hidden  dark:text-gray dark:bg-neutral-700", variantClasses[variant], className)}
    >
      <button
        onClick={onDecrement}
        className={cn(
          "cursor-pointer p-2 px-5 transition-colors  duration-200 focus:outline-none hover:bg-primary-2 ",
          {
            "px-3 py-3 sm:px-2": variant === "single",
            "px-5": variant === "big",
            "hover:!bg-gray-100 dark:hover:bg-neutral-900": variant === "pillVertical",
          }
        )}
      >
        <span className="sr-only">minus</span>
        <MinusIcon className="h-5 w-5 stroke-2.5" />
      </button>
      <div
        className={cn(
          "flex-1 flex items-center justify-center  font-semibold",
          variant === "pillVertical" && "text-heading  dark:text-white"
        )}
      >
        {value}
      </div>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          "cursor-pointer p-2 px-3 transition-colors duration-200 focus:outline-none hover:bg-primary-2",
          {
            "px-3 py-3 sm:px-2": variant === "single",
            "px-5": variant === "big",
            "hover:!bg-gray-100": variant === "pillVertical",
          }
        )}
        title={disabled ? "Out Of Stock" : ""}
      >
        <span className="sr-only">plus</span>
        <PlusIcon className="h-5 w-5 md:h-5 md:w-5 stroke-2.5" />
      </button>
    </div>
  );
};

export default Counter;
