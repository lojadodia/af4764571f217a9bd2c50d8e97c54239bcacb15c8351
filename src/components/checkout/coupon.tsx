import { useState } from "react";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useCheckout } from "@contexts/checkout.context";
import { useVerifyCouponMutation } from "@data/coupon/verify-coupon.mutation";
import { RiGift2Fill } from "react-icons/ri";

const Coupon = () => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm();
  const {
    mutate: verifyCoupon,
    isLoading: loading,
  } = useVerifyCouponMutation();
  const { applyCoupon, coupon, order_type } = useCheckout();
  if (!hasCoupon && !coupon) {
    return (
      <p
        role="button"
        className="text-xs font-bold  border border-2 border-dashed rounded-lg px-4 py-3 border-primary text-primary w-full text-center dark:text-primary transition duration-200 hover:text-primary"
        onClick={() => setHasCoupon(true)}
      >
        <RiGift2Fill style={{ display: "inline-block", verticalAlign: '-4px',fontSize:'13pt' }} /> TEM ALGUM VOUCHER DE DESCONTO?
      </p>
    );
  }
  async function onSubmit({ code }: { code: string }) {
    verifyCoupon(
      {
        code,
        order_type
      },
      {
        onSuccess: (data) => {
          if (data.is_valid) {
            applyCoupon(data.coupon);
            setHasCoupon(false);
          } else {
            setError("code", {
              type: "manual",
              message: "Código de cupom inválido! Por favor, tente novamente.",
            });
          }
        },
      }
    );
    // if (data?.verifyCoupon?.is_valid) {
    //   applyCoupon(data?.verifyCoupon?.coupon);
    //   setHasCoupon(false);
    // } else if (!data?.verifyCoupon?.is_valid) {
    //   setError("code", {
    //     type: "manual",
    //     message: "Invalid coupon code! please try again.",
    //   });
    // }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full flex flex-col sm:flex-row"
    >
      <Input
        {...register("code", { required: "O código do cupom é obrigatório" })}
        placeholder="INSIRA O VOUCHER AQUI"
        variant="outline"
        className="mb-4 sm:mb-0 sm:mr-4 flex-1"
        dimension="small"
        error={errors?.code?.message}
      />
      <Button
        loading={loading}
        disabled={loading}
        size="small"
        className="w-full sm:w-40 lg:w-auto"
      >
        APLICAR
      </Button>
    </form>
  );
};

export default Coupon;
