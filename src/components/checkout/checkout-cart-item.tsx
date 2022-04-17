import usePrice from "@utils/use-price";
import cn from "classnames";
interface Props {
  item: any;
  notAvailable?: boolean;
  isOffer?: boolean
}

const CheckoutCartItem = ({ item, notAvailable, isOffer = false }: Props) => {
  const { price } = usePrice({
    amount: item.itemTotal,
  });
  let items = []

  if (item?.extras) {
    for(let key in item.extras) {
      let aux = item.extras[key]
      const { price: priceExtra } = usePrice({
        amount: +(aux.sync_price * item.quantity),
      });
      aux.sync_price2 = priceExtra
      items.push(aux)
    }
  }
  return (
    <div className={cn("text-sm", notAvailable ? "text-red-500" : "text-body dark:text-white ")}
    key={item.id}>
      <div className={cn("flex justify-between py-2 ")+ `${isOffer && " uppercase font-semibold text-primary italic" }`}>
        <p className={"flex items-center justify-between text-body "}>
          <span
            className={cn("text-sm", notAvailable ? "text-red-500" : "text-body ") + (!!isOffer && " text-primary")}
          >
            <span
              className={cn(
                "text-sm font-bold",
                notAvailable ? "text-red-500" : "text-heading "
              ) + (!!isOffer && " text-primary")}
            >
             <span  className="dark:text-white">{item.quantity}</span> 
            </span>
            <span className="mx-2 dark:text-white">x</span>
            {!!isOffer && <span>🎉 </span>}
            <span className="dark:text-white">{item.name}</span> | <span  className="dark:text-white">{item.unit}</span>
          </span>
        </p>
        <span
          className={cn("text-sm", notAvailable ? "text-red-500" : "text-body dark:text-neutral") + (!!isOffer && " text-primary")}
        >
          <span className="dark:text-gray">{!notAvailable ? price : "Indisponível"}</span>
        </span>
      </div>
      {items.length !== 0 &&
        (<>
        <p>
          <span className="text-xs dark:text-neutral"><b>Extras</b></span>
        </p>
          <ul className="w-40 mb-1">
            {items && items.map((extra:any) =>
            (<li
              className="text-xs dark:text-neutral"
              key={extra.id}>
                <span>{extra.value}</span>&nbsp;
                (<span>{extra.sync_price2})</span>
            </li>)
            )}
          </ul>
          </>)
        }
        {
          item.obs && <span className="text-xs text-body dark:text-neutral mb-3 block">Obs: <i>{item.obs}</i></span> 
        }
    </div>
  );
};

export default CheckoutCartItem;
