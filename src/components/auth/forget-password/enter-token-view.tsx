import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface Props {
  onSubmit: (values: { token: string }) => void;
  loading: boolean;
}
const schema = yup.object().shape({
  token: yup.string().required("Password is required"),
});

const EnterTokenView = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ token: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Coloque seu token que você recebeu do e-mail"
        {...register("token")}
        variant="outline"
        className="mb-5"
        error={errors.token?.message}
      />
      <Button className="w-full h-11" loading={loading} disabled={loading}>
      Enviar Token
      </Button>
    </form>
  );
};

export default EnterTokenView;
