import NotFound from "@components/common/not-found";
import { Table } from "@components/ui/table";
import usePrice from "@utils/use-price";
import { siteSettings } from "@settings/site.settings";
import { formatAddress } from "@utils/format-address";
import OrderStatus from "./order-status";
import { RiCloseCircleLine } from 'react-icons/ri';
import dayjs from "dayjs";

const orderTableColumns = [
  {
    title: "Produtos",
    dataIndex: "",
    key: "items",
    width: 250,
    ellipsis: true,
    render: (_: any, record: any) => {
      const { price } = usePrice({
        amount: +record.pivot?.unit_price,
      });
      let name = record.name;

      //---------
      let extras = null;
      try {
        extras = JSON.parse(record.pivot.extras);
      }
      catch(e) {
      }
      //---------


      if (record.pivot?.variation_option_id) {
        const variationTitle = record.variation_options?.find(
          (vo: any) => vo.id === record.pivot.variation_option_id
        )["title"];
        name = `${name} - ${variationTitle}`;
      }



      return (
        <div className="flex items-center">
          <div className="w-16 h-16 flex flex-shrink-0 rounded overflow-hidden">
            <img
              src={
                record.image?.thumbnail ?? siteSettings.product.placeholderImage
              }
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col ml-4 overflow-hidden">
            <div className="flex mb-1">
              <span className="text-sm text-body dark:text-white truncate inline-block overflow-hidden">
                {name} x&nbsp;
                
              </span>
              <span className="text-sm text-heading dark:text-gray font-semibold truncate inline-block overflow-hidden">
                {record.unit}
              </span>
            </div>
            {!!extras && <p className="text-xs text-body dark:text-neutral"><b>Extras</b> <br />
              { Object.keys(extras).map((key, index) => {
                const extra = extras[key]
                const {price} = usePrice({
                  amount: +extra.sync_price
                })
                return <span className='block' key={key} >{extra.value} ({price})&nbsp;</span>
              })}
            </p>}
            {record?.pivot?.obs && (
              <>
                <span className="text-sm  mt-2 block text-body dark:text-neutral">
                  <i>{'Obs: ' +record?.pivot?.obs}</i>
                </span>
              </>
            )}
            <span className="text-sm text-primary font-semibold mb-1 truncate inline-block overflow-hidden">
              {price}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    title: "Qtd",
    dataIndex: "pivot",
    key: "pivot",
    align: "center",
    width: 100,
    render: (pivot: any) => {
      return <p className="text-body dark:text-gray">{pivot.order_quantity}</p>;
    },
  },
  {
    title: "Preço",
    dataIndex: "pivot",
    key: "price",
    align: "right",
    width: 100,
    render: (pivot: any) => {
      const { price } = usePrice({
        amount: +pivot.subtotal,
      });
      return <p>{price}</p>;
    },
  },
];

interface Props {
  order: any;
}

const OrderDetails = ({ order }: Props) => {
  const {
    products,
    status,
    cancelled_at,
    obs,
    billing_address,
    tracking_number,
    delivery_hour
  } = order ?? {};
  
  const { price: amount } = usePrice({
    amount: order?.amount,
  });
  const { price: discount } = usePrice({
    amount: order?.discount,
  });
  const { price: total } = usePrice({
    amount: order?.total,
  });
  const { price: delivery_fee } = usePrice({
    amount: order?.delivery_fee,
  });
  const { price: sales_tax } = usePrice({
    amount: order?.sales_tax,
  });

  return (
    
    <div className="flex flex-col w-full bg-white dark:bg-neutral-900 dark:border-neutral-500 md:w-2/3 border border-gray-200">
      {order ? (
        <>
          <h2 className="dark:text-white text-xl text-gray-800 p-5 border-b dark:border-neutral-500 border-gray-200">
          Pedido - {tracking_number?.slice(-5)} | {delivery_hour}
          </h2>
         
          <div className="flex flex-col sm:flex-row border-b border-gray-200 dark:border-neutral-500">
            <div className="w-full md:w-3/5 flex flex-col px-5 py-4 border-b sm:border-b-0 dark:border-neutral-500 sm:border-r border-gray-200">
              {/* <div className="mb-4">
                <span className="text-sm text-heading dark:text-gray font-bold mb-2 block">
                  Endereço para Envio
                </span>

                <span className="text-sm text-body dark:text-neutral">
                  {formatAddress(shipping_address)}
                </span>
              </div> */}

              <div>
                <span className="text-sm text-heading dark:text-neutral font-bold mb-2 block">
                  Para
                </span>

                <span className="text-sm text-body dark:text-white">
                  {formatAddress(billing_address)}
                </span>
              </div>
              <div>
                <span className="text-sm text-heading italic dark:text-neutral  mt-5 mb-2 block">
                 {!!obs && ('Obs: ' + obs)}
                </span>

               
              </div>
            </div>

            <div className="w-full md:w-2/5 flex flex-col px-5 py-4">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-body dark:text-gray">Sub Total</span>
                <span className="text-sm text-heading dark:text-gray">{amount}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-sm text-body dark:text-gray">Descontos</span>
                <span className="text-sm text-heading dark:text-gray">{discount}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-sm text-body dark:text-gray">Taxa de Entrega</span>
                <span className="text-sm text-heading dark:text-gray">{delivery_fee}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm text-body dark:text-gray">Outras Taxas</span>
                <span className="text-sm text-heading dark:text-gray">{sales_tax}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm font-bold text-heading dark:text-white">Total</span>
                <span className="text-sm font-bold text-heading dark:text-white">{total}</span>
              </div>
            </div>
          </div>
 
          {/* Order Table */}
          <div>
            <div className="w-full flex justify-center items-center px-6">
            {!cancelled_at ? <>
              <OrderStatus status={status?.serial} />
              </> :
              <>
              <div className="bg-red-100 w-full mb-5 mt-5 dark:border-neutral-500 border-t-4 border-red-700 rounded-b text-teal-900 px-4 py-3 shadow-md" style={{borderColor:'#f56565'}} role="alert">
          <div className="flex">
            <div className="py-1">
              <RiCloseCircleLine className="fill-current h-8 w-8 text-teal-500 mr-4" style={{ display: "inline-block", verticalAlign: '-2px' }} />
            </div>
            <div>
              <p className="font-bold">Este Pedido foi Cancelado</p>
              <p className="text-sm mb-2">Lamentamos mas por algum motivo este pedido foi cancelado em: {dayjs(cancelled_at).format("DD/MM/YYYY")} às {dayjs(cancelled_at).format("HH:mm")}. <br /> O reembolso do seu pagamento será processando entre 3-5 dias úteis.</p>
            </div>
          </div>
        </div>
              </>
            }
            </div>
            <div className="relative">
              <div className="absolute w-full top-0 z-50" style={{height:"100%"}}></div>
              <Table
                  //@ts-ignore
                  columns={orderTableColumns}
                  data={products ? products : []}
                  rowKey={(record: any) =>
                    record.pivot?.variation_option_id
                      ? record.pivot.variation_option_id
                      : record.id
                  }
                  className="orderDetailsTable dark:bg-neutral-700 w-full"
                  scroll={{ x: 350, y: 500 }}
                /> 
            </div>
           
          </div>
        </>
      ) : (
        <div className="max-w-lg mx-auto">
          <NotFound text="Nenhum pedido encontrado" />
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
