import Button from "@components/ui/button";
import Card from "@components/ui/card";
import FileInput from "@components/ui/file-input";
import Input from "@components/ui/input";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { toast } from "react-toastify";
import { User } from "@ts-types/generated";
import pick from "lodash/pick";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Props {
  user: User;
}

type UserFormValues = {
  name?: User["name"];
  profile?: User["profile"];
  
};
const ProfileFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  profile: yup.object().shape({
    contact: yup.string().min(9, "Digite 9 caracteres").required("Contato é obrigatório"),
  }),
});
const ProfileForm = ({ user }: Props) => {
  const { register, handleSubmit, setValue, control ,formState: { errors },} = useForm<UserFormValues>(
    {
      resolver: yupResolver(ProfileFormSchema),
      defaultValues: {
        ...(user &&
          pick(user, [
            "name",
            "profile.bio",
            "profile.contact",
            "profile.avatar",
          ])),
      },
    }
  );
  const {
    mutate: updateProfile,
    isLoading: loading,
  } = useUpdateCustomerMutation();
  function onSubmit(values: any) {
    updateProfile(
      {
        id: user.id,
        name: values.name,
        profile: {
          id: user?.profile?.id,
          ...values.profile,
          avatar: values.profile.avatar?.[0],
        },
      },
      {
        onSuccess: () => {
          toast.success("Atualizado com sucesso!");
        },
      }
    );
  }
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex space-x-4 mb-8">
        <Card className="w-full dark:bg-black">
          <div className="mb-8">
            <FileInput control={control} name="profile.avatar" />
          </div>

          <div className="flex space-x-4 mb-6">
            <Input
              className="flex-1"
              label="Nome"
              {...register("name")}
              variant="outline"
              error={errors?.name?.message}
            />
            <Input
              {...register("profile.contact")}
              label="Contato"
              className="flex-1"
              onChange={(e) => {
                const value = e.target.value;
                //@ts-ignore
                setValue("profile.contact", value);
              }}
              variant="outline"
              error={errors?.profile?.contact?.message}
            />
          </div>

          <TextArea
            label="Bio"
            //@ts-ignore
            {...register("profile.bio")}
            variant="outline"
            className="mb-6"
          />

          <div className="flex">
            <Button className="ml-auto" loading={loading} disabled={loading}>
              Guardar
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
};

export default ProfileForm;
