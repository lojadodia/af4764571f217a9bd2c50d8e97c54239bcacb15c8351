import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import Radio from "@components/ui/radio/radio";
import TextArea from "@components/ui/text-area";
import { useUI } from "@contexts/ui.context";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  title: string;
  type: string;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const addressSchema = yup.object().shape({
  type: yup.string().required("Tipo de Morada é obrigatório"),
  title: yup.string().required("Título é obrigatório"),
  address: yup.object().shape({
    country: yup.string().required("País é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    state: yup.string().required("Estado é obrigatório"),
    zip: yup.string().required("Código Postal é obrigatório"),
    street_address: yup.string().required("O endereço da rua é obrigatório"),
  }),
});

const AddNif = () => {
  const {
    modalData: { customerId, address, type },
    closeModal,
  } = useUI();
  const { mutate: updateProfile } = useUpdateCustomerMutation();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      // title: address?.title ?? "Endereço",
      // country: address?.country ?? "Portugal",
      // state: address?.state ?? "Portugal",
      title: "Endereço",
      country: "Portugal",
      state: "Portugal",
      type: address?.type ?? type,
      ...(address?.address && address),
    },
  });
  function onSubmit(values: FormValues) {
    const formattedInput = {
      id: address?.id,
      customer_id: customerId,
      title: values.title,
      type: values.type,
      address: {
        ...(address?.id ? { id: address.id } : {}),
        ...values.address,
      },
    };

    updateProfile({
      id: customerId,
      address: [formattedInput],
    });
    return closeModal();
  }
  return (
    <div className="p-5 sm:p-8 bg-white">
      <h1 className="text-heading font-semibold text-lg text-center mb-4 sm:mb-6">
        {address ? "Atualizar" : "Adicionar Novo"} Endereço
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-2 gap-5 h-full"
      >
        <div style={{display:"none"}}>
          <Label>Tipo de Morada</Label>

          <div className="space-x-4 flex items-center">
            <Radio
              id="billing"
              {...register("type", { required: "Type is required" })}
              type="radio"
              value="billing"
              label="Cobrança"
            />

            <Radio
              id="shipping"
              {...register("type", { required: "Type is required" })}
              type="radio"
              value="shipping"
              label="Envio"
            />
          </div>

        <Input 
          label="Título"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
          variant="outline"
          className="col-span-2"
          value="Endereço"
        />
        </div>
        <TextArea
          label="Endereço"
          {...register("address.street_address")}
          error={errors?.address?.street_address?.message}
          variant="outline"
          placeholder="Introduza: Rua, Apt, Porta"
          className="col-span-2"
        />
        <Input
          label="Código Postal"
          {...register("address.zip")}
          error={errors.address?.zip?.message}
          variant="outline"
          placeholder="XXXX-XXX"
        />
        <Input
          label="Cidade"
          {...register("address.city")}
          error={errors?.address?.city?.message}
          variant="outline"
          
        />
         <div style={{display:'none'}}>

         <Input
          label="País"
          {...register("address.country")}
          error={errors?.address?.country?.message}
          variant="outline"
          value="Portugal"
        />


        <Input
          label="Estado"
          {...register("address.state")}
          error={errors?.address?.state?.message}
          variant="outline"
          value="Portugal"
        />
         </div>
       

      

       

        <Button className="w-full col-span-2">
          {address ? "Atualizar" : "Guardar"} Endereço
        </Button>
      </form>
    </div>
  );
};

export default AddNif;
