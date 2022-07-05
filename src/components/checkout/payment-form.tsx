import React, { useState, useEffect, ChangeEvent } from "react";
import Button from "@components/ui/button";
import FormattedInput from "@components/ui/formatted-input";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import Radio from "@components/ui/radio/radio";
import { useCheckout } from "@contexts/checkout.context";
import { formatOrderedProduct } from "@utils/format-ordered-product";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ValidationError from "@components/ui/validation-error";
import { ROUTES } from "@utils/routes";
import { useCreateOrderMutation } from "@data/order/use-create-order.mutation";
import { useOrderStatusesQuery } from "@data/order/use-order-statuses.query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useSettings } from "@contexts/settings.context";
import { toast } from "react-toastify";
import usePrice from "@utils/use-price";
import { RiFileCopyLine } from "react-icons/ri";
import {
  calculatePaidTotal,
  calculateTotal,
} from "@contexts/quick-cart/cart.utils";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
interface FormValues {
  payment_gateway: "cod" | "stripe" | "mbway" | "mb" | "pix" | "boleto";
  contact: string;
  contact_mbway: string;
  email: string;
  nif: string;
  order: string;
  order_type: string;
  message: string;
  card: {
    number: string;
    expiry: string;
    cvc: string;
  };
}
interface ValiteCPF {
  data: { taxNumber: string; valid: boolean; exists: boolean };
}
const paymentSchema = Yup.object().shape({
  contact: Yup.string()
    .min(9, "Por-favor adicione um contato válido ao seu perfil")
    .required(),
  payment_gateway: Yup.string()
    .default("stripe")
    .oneOf(["cod", "stripe", "mbway", "mb", "pix", "boleto"]),
  card: Yup.mixed().when("payment_gateway", {
    is: (value: string) => value === "stripe",
    then: Yup.object().shape({
      number: Yup.string().required("Por-favor introduza o número do cartão"),
      expiry: Yup.string().required("A data é obrigatória"),
      cvc: Yup.string().required("Digite o CVC do seu cartão"),
    }),
  }),
});

export default function PaymentForm() {
  const { data } = useCustomerQuery();
  const settings = useSettings();
  const [order, setOrder] = useState({
    id: null,
    tracking_number: null,
    entity: null,
    reference: null,
    value: null,
  });
  const [seconds, setSeconds] = useState<number>(1);
  const [isDisabledSubmitButton, setIsDisabledSubmitButton] =
    useState<boolean>(false);
  const [isMBway, setIsMBway] = useState<boolean>(false);
  const [timerIdMBway, setTimerIdMBway] = useState<any>(null);
  const router = useRouter();
  const { mutate: createOrder, isLoading: loading } = useCreateOrderMutation();




  const [cpf, setCpf] = useState("");
  const [code, setCode] = useState({ copy: false });
  var default_method = "mbway";
  if (settings?.env?.SHIPPING_COUNTRY == "BR") {
    default_method = "pix";
  }

  let dark = "";
  if(settings?.env?.THEME == "dark"){
    dark = "dark-";
  }

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      contact: contact,
      contact_mbway: contact,
      payment_gateway: default_method,
    },
  });

  const { price: totalPrice } = usePrice({
    amount: +order.value,
  });

  // Tradução
  useEffect(() => {
    translate();
  }, []);

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get only the numbers from the data input
    let data = e.target.value.replace(/\D/g, "");
    let cpf = "";
    let parts = Math.ceil(data.length / 3);
    for (let i = 0; i < parts; i++) {
      if (i === 3) {
        cpf += `-${data.substr(i * 3)}`;
        break;
      }
      cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
    }
    data = cpf;
    setCpf(data);
    //setValue('nif', cpf)
  };
  const { t } = useTranslation();
  const translate = () => {
    i18next.changeLanguage(settings?.env?.SHIPPING_COUNTRY);
  };
  // Fim da Tradução

  const contact = data?.me?.profile?.contact;
  const { data: orderStatusData } = useOrderStatusesQuery();

  const isCashOnDelivery = watch("payment_gateway");
  const nif = watch("nif");
  useEffect(() => {
    if (!order.id) return;
    var timer = setInterval(() => {
      fetch(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}` +
          "order_paid?order=" +
          order.tracking_number
      )
        .then((resp) => resp.json())
        .then(function (res) {
          if (res == 1) {
            clearInterval(timer);
            router.push(`${ROUTES.ORDER_RECEIVED}/${order?.tracking_number}`);
          }
        });
    }, 5000);
  }, [order]);

  useEffect(() => {
    setValue("contact", data?.me?.profile?.contact);
    //setValue("contact_mbway", data?.me?.profile?.contact);
  });

  useEffect(() => {
    if (seconds > 60) {
      setIsDisabledSubmitButton(false);
      setIsMBway(false);
      clearInterval(timerIdMBway);
      setSeconds(1);
      setTimerIdMBway(null);
    }
  }, [seconds, timerIdMBway]);

  useEffect(() => {
    if (timerIdMBway !== null) return;
    if (isMBway && isCashOnDelivery === "mbway") {
      setTimerIdMBway(
        setInterval(() => {
          setSeconds((prev) => prev + 1);
        }, 1000)
      );
    }
   
  }, [isMBway, isCashOnDelivery, timerIdMBway]);

  const { items } = useCart();
  const {
    billing_address,
    shipping_address,
    obs,
    order_type,
    delivery_time,
    delivery_schedule,
    checkoutData,
    coupon,
    discount,
  } = useCheckout();

  const available_items = items?.filter(
    (item: any) => !checkoutData?.unavailable_products?.includes(item.id)
  );

  const subtotal = calculateTotal(available_items);
  const total = calculatePaidTotal(
    {
      totalAmount: subtotal,
      tax: checkoutData?.total_tax!,
      shipping_charge: checkoutData?.shipping_charge!,
    },
    discount
  );

   const CopyBarCode = ()=>{
    setCode({...code, copy: true})
  }


  const onlyNumbers = (str: string) => str.replace(/[^0-9]/g, "");

  async function onSubmit(values: FormValues) {
    if (
      (settings?.env?.SHIPPING_COUNTRY == "BR" &&
        isCashOnDelivery &&
        isCashOnDelivery === "boleto") ||
      isCashOnDelivery === "pix"
    ) {
      if (!cpf) {
        toast.error("Por favor digite o seu CPF para poder avançar");
        return false;
      }

      const result: ValiteCPF = await axios.get(
        `https://api.nfse.io/validate/NaturalPeople/taxNumber/${onlyNumbers(
          cpf
        )}`
      );

      if (!result.data.exists && !result.data.valid) {
        toast.error("CPF Inválido tente novamente");
        return false;
      }
    }

    let input = {
      //@ts-ignore
      products: available_items?.map((item) => formatOrderedProduct(item)),
      customer_contact: values.contact,
      customer_nif: values.nif,
      contact_mbway: values.contact_mbway,
      customer_email: values.email,
      status: orderStatusData?.order_statuses?.data[0]?.id ?? 1,
      amount: subtotal,
      coupon_id: coupon?.id,
      discount: discount ?? 0,
      paid_total: total,
      order_type: order_type,
      total,
      sales_tax: checkoutData?.total_tax,
      delivery_fee: checkoutData?.shipping_charge,
      delivery_way: checkoutData?.mail,
      delivery_time: delivery_time,
      delivery_schedule: delivery_schedule,
      obs: obs,
      payment_gateway: values.payment_gateway,
      billing_address: {
        ...(billing_address?.address && billing_address.address),
      },
      shipping_address: {
        ...(shipping_address?.address && shipping_address.address),
      },
    };
    //if (values.payment_gateway === "stripe") {
    // @ts-ignore
    input.card = {
      number: values?.card?.number,
      exp_month: values?.card?.expiry?.split("/")[0],
      exp_year: values?.card?.expiry?.split("/")[1],
      cvc: values?.card?.cvc,

      //  };
    };
    if (isCashOnDelivery === "mbway") {
      setIsMBway(true);
    }
    setIsDisabledSubmitButton(true);
    createOrder(input, {
      onSuccess: (order: any) => {
        if (isCashOnDelivery === "mbway") {
          toast.success(
            "Enviamos uma solicitação para o seu MBWAY, aceite para continuar",
            {
              autoClose: 8000,
            }
          );
        }
        if (order.status == "1") {
          router.push(`${ROUTES.ORDER_RECEIVED}/${order?.tracking_number}`);
        } else {
          setOrder(order);
        }
      },
      onError(error: any) {
        toast.error(error.response.data.message, {
          autoClose: 7000,
          closeOnClick: true,
        });
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-5 md:mb-8">
          <div className="flex mb-4 items-center space-x-3 md:space-x-4">
            <span className="rounded-full w-8 h-8 bg-primary flex items-center justify-center text-base lg:text-xl text-white">
              {settings?.scheduleType != "store" && 3}
              {settings?.scheduleType == "store" && 2}
            </span>
            <p className="text-lg lg:text-xl text-heading dark:text-white">Pagamento</p>
            {/* <Label>Escolha uma Forma de Pagamento</Label> */}
          </div>
          <FormattedInput
            variant="outline"
            class="dark:bg-black dark:text-white dark:border-neutral-700 border border-gray-300 rounded dark:bg-black dark:text-white dark:border-neutral-700 focus:border-primary px-4 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0 h-12"
            type="text"
            className="flex"
            placeholder={t("seu_contribuinte")}
            {...register("nif")}
          />

         {/* <FormattedInput
            variant="outline"
            class="dark:bg-black dark:text-white dark:border-neutral-700 border border-gray-300 rounded dark:bg-black dark:text-white dark:border-neutral-700 focus:border-primary px-4 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0 h-12"
            type="text"
            options={{
              blocks: [settings?.env?.SHIPPING_COUNTRY != "PT" ? "14" : "9"],
            }}
            className="flex"
            placeholder={t("seu_contribuinte")}
            {...register("nif")}
            value={cpf}
            ref={(e) => {
              if (settings?.env?.SHIPPING_COUNTRY != "PT") {
                if (e) {
                  e.onkeyup = handleCpfChange;
                }
              }
            }}
          /> */}
        </div>

        <div className="space-x-4 flex items-center">
          {(!settings?.env?.SHIPPING_COUNTRY ||
            settings?.env?.SHIPPING_COUNTRY == "PT") && (
            <>
              {settings?.env?.PAYMENT_MBWAY != false && (
                <Radio
                  id="mbway"
                  type="radio"
                  {...register("payment_gateway")}
                  value="mbway"
                  label={`<img style='margin-top:-5px;height:27px' src='/img/${dark}payment/mbway.png' alt='MBWAY' />`}
                  className=""
                />
              )}
              {settings?.env?.PAYMENT_MB != false && (
                <Radio
                  id="mb"
                  type="radio"
                  {...register("payment_gateway")}
                  value="mb"
                  label={`<img style='margin-top:-6px;height:30px' src='/img/${dark}payment/mb.png' alt='MULTIBANCO' />`}
                  className=""
                />
              )}
            </>
          )}
          {settings?.env?.SHIPPING_COUNTRY == "BR" && (
            <>
              <Radio
                id="pix"
                type="radio"
                {...register("payment_gateway")}
                value="pix"
                label={`<img style='margin-top:-6px;height:24px' src='/img/${dark}payment/pix.png' alt='PIX' />`}
                className=""
              />
              <Radio
                id="boleto"
                type="radio"
                {...register("payment_gateway")}
                value="boleto"
                label={`<img style='margin-top:-6px;height:24px' src='/img/${dark}payment/boleto.png' alt='BOLETO' />`}
                className=""
              />
            </>
          )}
          {settings?.env?.PAYMENT_STRIPE != false && (
            <Radio
              id="stripe"
              type="radio"
              {...register("payment_gateway")}
              value="stripe"
              label={`<img style='margin-top:-5px;height:27px' src='/img/${dark}payment/card.png' alt='CARTÕES' />`}
              className=""
            />
          )}
          {/* 
          <Radio
            id="paypal"
            type="radio"
            {...register("payment_gateway")}
            value="paypal"
            label="<img style='margin-top:-6px;height:24px' src='/paypal.png' alt='PayPal' />"
            className=""
          />
       
         
           */}

          {settings?.env?.PAYMENT_CASH != false && (
            <Radio
              id="cod"
              type="radio"
              {...register("payment_gateway")}
              value="cod"
              label="<p style='margin-top:-3px;height:24px;padding-top:2px' class='text-black dark:text-white font-semibold' />DINHEIRO</p>"
              className=""
            />
          )}
        </div>
      </div>

      {isCashOnDelivery === "stripe" && (
        <div>
          <Label className="dark:text-gray">Informações do Cartão</Label>
          <Input
            {...register("contact", {
              required: "O número de contato é obrigatório",
            })}
            variant="outline"
            className="w-1/2"
            error={errors?.contact?.message}
            type="number"
            style={{ display: "none" }}
          />
          <FormattedInput
            variant="outline"
            class="dark:bg-black dark:text-white dark:border-neutral-700 border border-gray-300 rounded dark:bg-black dark:text-white dark:border-neutral-700 focus:border-primary px-4 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0 h-12"
            className=""
            placeholder="Número do Cartão"
            {...register("card.number")}
            onChange={() => setIsDisabledSubmitButton(false)}
            options={{
              creditCard: true,
            }}
            error={errors?.card?.number?.message}
          />

          <div className="flex space-x-4 w-full">
            <FormattedInput
              variant="outline"
              class="dark:bg-black dark:text-white dark:border-neutral-700 border border-gray-300 rounded dark:bg-black dark:text-white dark:border-neutral-700 focus:border-primary px-4 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0 h-12"
              className="w-1/2"
              placeholder="M/Y"
              options={{ date: true, datePattern: ["m", "y"] }}
              {...register("card.expiry")}
              onChange={() => setIsDisabledSubmitButton(false)}
              error={errors?.card?.expiry?.message}
            />
            <FormattedInput
              variant="outline"
              class="dark:bg-black dark:text-white dark:border-neutral-700 border border-gray-300 rounded dark:bg-black dark:text-white dark:border-neutral-700 focus:border-primary px-4 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0 h-12"
              className="w-1/2"
              placeholder="CVC"
              type="number"
              options={{ blocks: [3] }}
              {...register("card.cvc", { valueAsNumber: true })}
              onChange={() => setIsDisabledSubmitButton(false)}
              error={errors?.card?.cvc?.message}
            />
          </div>
        </div>
      )}
      {!subtotal && (
        <ValidationError message="Your ordered items are unavailable" />
      )}
      {total < 0 && (
        <div className="mt-3">
          <ValidationError message="Sorry, we can't process your order :(" />
        </div>
      )}

      {(isCashOnDelivery === "mbway"  && settings?.env?.PAYMENT_MBWAY != false ) && (
        <div>
          <p className="mb-5">
            <small>
              Info (#2): Aguarde nesta tela depois de aceitar a solicitação no
              seu app MBWAY, ou bancário.
            </small>
          </p>
          <div className="flex space-x-4 w-full dark:text-neutral">
            <FormattedInput
              variant="outline"
              class="dark:bg-black dark:text-white dark:border-neutral-700 border border-gray-300 rounded dark:bg-black dark:text-white dark:border-neutral-700 focus:border-primary px-4 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0 h-12"
              {...register("contact_mbway", {
                required: "O número de contato é obrigatório",
                valueAsNumber: true,
              })}
              label="Nº Tel. MBWAY"
              type="number"
              options={{ blocks: [9] }}
              className="w-1/2"
              error={errors?.contact_mbway?.message}
            />
            <div style={{ display: "none" }}>
              <Input
                {...register("contact", {
                  required: "O número de contato é obrigatório",
                })}
                label="Nº Telemóvel"
                variant="outline"
                type="number"
                className="w-1/2"
                error={errors?.contact?.message}
              />
            </div>

            {!isMBway ? (
              <Button
                loading={loading}
                disabled={!subtotal || total < 0}
                className="w-1/2"
                style={{ marginTop: "26px" }}
              >
                Enviar{" "}
                <span className="hidden lg:block">&nbsp;Solicitação</span> →
              </Button>
            ) : (
              <Button
                loading={false}
                className="w-1/2"
                type="button"
                style={{ marginTop: "26px" }}
                disabled={true}
              >
                Aguarde {60 - seconds} Segundos
              </Button>
            )}
          </div>
        </div>
      )}
      {(isCashOnDelivery === "mb"  && settings?.env?.PAYMENT_MB != false ) && (
        <div>
          <Input
            {...register("contact", {
              required: "O número de contato é obrigatório",
            })}
            variant="outline"
            className="w-1/2"
            error={errors?.contact?.message}
            style={{ display: "none" }}
          />
          <div>
            {order?.entity && (
              <p>
                <b>Entidade: </b> {order.entity}
                <br />
                <b>Referência: </b>
                {order.reference}
                <br />
                <b>Valor: </b> € {order.value}
              </p>
            )}
          </div>
          {!order?.entity && (
            <Button
              loading={loading}
              disabled={!subtotal || total < 0}
              className="w-full lg:w-auto lg:ml-auto mt-5"
            >
              Gerar Refência →
            </Button>
          )}
        </div>
      )}

      {isCashOnDelivery === "pix" && (
        <div>
          {order?.qrcode && (
            <div className="text-center ">
              <h1 className="font-bold text-xl">Escaneie o Código QR</h1>
              <p>Para pagar o PIX</p>
              <p>
                <img src={order?.qrcode} className="lg:w-1/2 mx-auto" alt="" />
              </p>
              <CopyToClipboard
                text={order?.to_copy}
                onCopy={CopyBarCode}
              >
                <button type="button" className="inline-flex items-center rounded justify-center text-primary flex-shrink-0 font-semibold leading-none outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow border border-primary bg-transparent hover:text-white hover:bg-primary hover:border-primary px-5 py-0 h-12">
                  <RiFileCopyLine
                    style={{ display: "inline-block", verticalAlign: "-2px" }}
                  />
                  &nbsp; {code.copy ? "Código Copiado" : "Copiar Código PIX"}
                </button>
              </CopyToClipboard>
            </div>
          )}

          {!order?.qrcode && (
            <Button
              loading={loading}
              disabled={!subtotal || total < 0}
              className="w-full lg:w-auto lg:ml-auto mt-5"
            >
              Pagar com PIX →
            </Button>
          )}
        </div>
      )}

      {isCashOnDelivery === "boleto" && (
        <div>
          {order?.boleto?.link && (
            <div className="text-center">
              <h1 className="font-bold text-xl">Pague o Boleto Abaixo</h1>
              <a
                href={`${order?.boleto?.pdf?.charge}`}
                target="_blank"
                className="text-primary font-semibold hover:text-primary-2 pb-4"
              >
                Abrir Boleto →
              </a>
              <br />
              <br />
              <p>
                <img src={order?.img} className="w-full" alt="" />
              </p>
              <p className="text-sm">{order?.boleto?.barcode}</p>
              <p>
                <br />
               
                <CopyToClipboard
                  text={order?.boleto?.barcode}
                  onCopy={CopyBarCode}
                >
                  <button type="button" className="inline-flex items-center rounded justify-center text-primary flex-shrink-0 font-semibold leading-none outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow border border-primary bg-transparent hover:text-white hover:bg-primary hover:border-primary px-5 py-0 h-12">
                    <RiFileCopyLine
                      style={{ display: "inline-block", verticalAlign: "-2px" }}
                    />
                    &nbsp;{code.copy ? "Código Copiado" : "Copiar Código"}
                  </button>
                </CopyToClipboard>
              </p>
            </div>
          )}
          {!order?.boleto?.link && (
            <Button
              loading={loading}
              disabled={!subtotal || total < 0}
              className="w-full lg:w-auto lg:ml-auto mt-5"
            >
              Pagar com Boleto →
            </Button>
          )}
        </div>
      )}

      {(isCashOnDelivery === "stripe"  && settings?.env?.PAYMENT_STRIPE != false )  && (
        <Button
          loading={loading}
          type={isDisabledSubmitButton ? "button" : "submit"}
          disabled={!subtotal || total < 0}
          className="w-full lg:w-auto lg:ml-auto mt-5"
        >
          Fazer Pagamento seguro →
        </Button>
      )}

      {isCashOnDelivery === "cod" && (
        <div className="w-full">
          <h1 className="text-lg lg:text-xl w-full mb-2">Pagamento na Entrega ou no Levantamento</h1>
          <p className="text-xs ">
          <p className="text-xs  mb-2"> <b className="text-primary">ATENÇÃO, POR-FAVOR LEIA ANTES DE ENCOMENDAR!</b></p>
             <ol className="">
               <li>Pagará em Dinheiro ou através do método que preferir na Entrega ou Levantamento da Encomenda.</li>
               <li>Para o levantamento da encomenda apresente o código que receberá no seu e-mail, caso não encontre na Caixa Principal, tente por favor localizar o mesmo no SPAM.</li>
             </ol>
             
               </p>
          <Button
                  loading={loading}
                  type={isDisabledSubmitButton ? "button" : "submit"}
                  disabled={!subtotal || total < 0}
                  className="w-full lg:w-auto  mt-5"
                >
                  Efectuar Encomenda →
            </Button>
        </div>
       
      )}
     
    </form>
  );
}
