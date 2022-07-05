import usePrice from "@utils/use-price";
import dayjs from "dayjs";
import cn from "classnames";

type OrderCardProps = {
  order: any;
  isActive: boolean;
  onClick?: (e: any) => void;
}; 
 
const OrderCard: React.FC<OrderCardProps> = ({ onClick, order, isActive }) => {
  const { id, status, created_at, delivery_time , delivery_hour } = order;
  const { price: amount } = usePrice({
    amount: order?.amount,
  });
  const { price: total } = usePrice({
    amount: order?.total,
  });

  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "bg-gray-100 dark:bg-neutral-800 rounded overflow-hidden w-full flex flex-shrink-0 flex-col mb-4 border-2 border-transparent cursor-pointer last:mb-0",
        isActive === true && "border-primary"
      )}
    >
      <div className="flex justify-between items-center border-b dark:border-neutral-700 border-gray-200 py-3 px-5 md:px-3 lg:px-4">
        <span className="font-bold text-base md:text-sm lg:text-base text-heading mr-4 flex-shrink-0 dark:text-white">
        Pedido
          <span className="font-normal"> #{order?.tracking_number?.slice(-5)}</span>
        </span>
        {!order?.cancelled_at ? <>
        <span
          className="text-sm text-blue-500 bg-blue-100 px-3 py-2 rounded whitespace-nowrap truncate max-w-full"
          title={status.name}
        >
          {status.name}
        </span>
        </> :
              <>
               <span
          className="text-sm text-red-500 bg-red-100 px-3 py-2 rounded whitespace-nowrap truncate max-w-full"
          title="PEDIDO CANCELADO"
        >
          CANCELADO
        </span>
              </>
            }
      </div>

      <div className="flex flex-col p-5 md:p-3 lg:px-4 lg:py-5">
        {/* <p className="text-base sm:text-sm text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">Data</span>
          <span className="mr-auto">:</span>
          <span className="ml-1">
            {dayjs(created_at).format("DD-MM-YYYY")}
          </span>
        </p> */}
        <p className="text-base sm:text-sm text-heading dark:text-neutral w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
          Estimativa
          </span>
          <span className="mr-auto">:</span>
          <span className="ml-1 truncate">{dayjs(dayjs(delivery_time,'YYYY-MM-DD HH:mm:ss')).format('DD/MM/YYYY')} {delivery_hour}</span>
        </p>
        <p className="text-base sm:text-sm font-bold text-heading dark:text-neutral w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">Montante</span>
          <span className="mr-auto">:</span>
          <span className="ml-1">{amount}</span>
        </p>
        <p className="text-base sm:text-sm font-bold text-heading dark:text-white w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
         Total
          </span>
          <span className="mr-auto">:</span>
          <span className="ml-1">{total}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
