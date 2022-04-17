import { useEffect, useState } from "react";
import Layout from "@components/layout/layout";
import ProfileSidebar from "@components/profile/profile-sidebar";
import OrderCard from "@components/order/order-card";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import ErrorMessage from "@components/ui/error-message";
import OrderDetails from "@components/order/order-details";
import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Scrollbar from "@components/ui/scrollbar";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {},
  };
};

export default function OrdersPage() {
  const [order, setOrder] = useState<any>({});
  const { data, isLoading: loading, error } = useCustomerQuery();
  useEffect(() => {
    if (data?.me?.orders) {
      setOrder(data.me.orders[0]);
    }
  }, [data?.me?.orders]);
  if (loading) return <Spinner showText={false} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="w-full dark:bg-neutral-900 bg-gray-100">
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14  min-h-screen">
        <ProfileSidebar className="flex-shrink-0 hidden xl:block xl:w-80 mr-8" />
        {/* End of sidebar navigation */}

        <div className="w-full hidden overflow-hidden md:flex">
          <div
            className="pr-5 lg:pr-8 w-full md:w-1/3"
            style={{ height: "calc(100vh - 60px)" }}
          >
            <div className="flex flex-col h-full pb-5 bg-white md:border md:border-gray-200 dark:border-neutral-700 dark:bg-neutral-900">
              <h3 className="text-xl  dark:text-white py-5 text-heading px-5">
              Meus pedidos
              </h3>
              <Scrollbar
                className="w-full"
                style={{ height: "calc(100% - 80px)" }}
              >
                <div className="px-5">
                  {data?.me?.orders?.length ? (
                    data?.me?.orders?.map((_order: any, index: number) => (
                      <OrderCard
                        key={index}
                        order={_order}
                        onClick={() => setOrder(_order)}
                        isActive={order?.id === _order?.id}
                      />
                    ))
                  ) : (
                    <div className="w-full h-full flex items-center justify-center my-auto">
                      <h4 className="text-sm font-semibold dark:text-neutral text-body text-center">
                      Você ainda não pediu nada
                      </h4>
                    </div>
                  )}
                </div>
              </Scrollbar>
            </div>
          </div>
          {/* End of Order List */}
          <OrderDetails order={order} />
        </div>

        {/* Order Card Mobile */}
        <div className="flex flex-col w-full md:hidden">
          <div className="flex flex-col w-full h-full px-0 pb-5">
            <h3 className="text-xl font-semibold dark:text-white pb-5 text-heading">
            Meu pedido
            </h3>
            <Collapse
              accordion={true}
              defaultActiveKey="active"
              expandIcon={() => null}
            >
              {data?.me?.orders?.length ? (
                data?.me?.orders?.map((_order: any, index: number) => (
                  <Panel
                    header={
                      <OrderCard
                        key={`mobile_${index}`}
                        order={_order}
                        onClick={() => setOrder(_order)}
                        isActive={order?.id === _order?.id}
                      />
                    }
                    headerClass="accordion-title"
                    key={index}
                    className="mb-4"
                  >
                    <OrderDetails order={order} />
                  </Panel>
                ))
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center py-10 my-auto">
                  <div className="w-5/6 h-full flex items-center justify-center mb-7">
                    <img
                      src="/no-result.svg"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-sm font-semibold dark:text-neutral text-body text-center">
                  Nenhum pedido realizado até então
                  </h4>
                </div>
              )}
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}

OrdersPage.Layout = Layout;
