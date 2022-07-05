import cn from "classnames";
import { PlusIcon } from "@components/icons/plus-icon";
import { MinusIcon } from "@components/icons/minus-icon";

import usePrice from "@utils/use-price";
type ExtraGroupProps = {
  label?: string;
  price?: string;
  onClick: () => void;
  active?: boolean;
  className?: string; 
}; 

const ExtraGroup: React.FC<ExtraGroupProps> = ({
  label,
  price,
  active,
  onClick, 
  className
}) => {

  const classes = cn(
    {
      "order-5 mr-1 mb-2 sm:order-4 py-2 px-2 sm:px-5 border border-gray-100  dark:border-neutral-800 dark:text-white flex items-center justify-center sm:justify-start text-sm rounded-full bg-white dark:bg-black  transition-colors duration-300": true,
      "!text-white !bg-primary !border-primary": active,
      "!border-primary": active,
    },
    "cursor-pointer"
  );
  const { price: totalPrice } = usePrice({
    amount: +price,
  });
  return (
    <button
      onClick={onClick}
      className={classes.concat(' ').concat(className)}
      tabIndex={1}
    >
      <span className="dark:text-white">
        {active ? (
          <MinusIcon className="w-4 h-4 mr-1" />
        ) : (
          <PlusIcon className="w-4 h-4 mr-1" />
        )}
      </span>

      <span className="absolute-capitalize">{label} {price ? `| ${totalPrice}` : ''}</span>
    </button>
  );
};

export default ExtraGroup;
