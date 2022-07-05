import React, { useState } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@data/auth/use-login.mutation";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import { CUSTOMER, SUPER_ADMIN } from "@utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setSession } from "@utils/session-cookies/cookies";

type FormValues = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().email("E-mail não é válido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha requerida"),
});

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { mutate: login, isLoading: loading } = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const { authorize, setModalView } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginFormSchema),
    defaultValues,
  });

  function onSubmit({ email, password }: FormValues) {
    login(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          if (
            data?.token &&
            (data?.permissions?.includes(CUSTOMER) ||
              data?.permissions?.includes(SUPER_ADMIN))
          ) {
            setSession("auth_token", data.token);
            setSession("auth_permissions", data.permissions);
            authorize();
            return;
          }
          if (!data.token) {
            setErrorMsg("As credenciais estavam erradas!");
            return;
          }
          if (!data.permissions.includes(CUSTOMER)) {
            setErrorMsg("Não tem permissão suficiente");
            return;
          }
        },
      }
    );
  }
  return (
    <div className="py-6 px-5 sm:p-8 bg-white dark:bg-neutral-800 rounded-lg w-screen md:max-w-md h-screen md:h-auto flex flex-col justify-center  dark:border-neutral-700 border">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="text-center text-sm dark:text-gray md:text-base text-body mt-4 sm:mt-5 mb-5 sm:mb-5">
      Faça login com seu e-mail e senha
      </p>
      {errorMsg && (
        <Alert
          variant="error"
          message={errorMsg}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg("")}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="E-Mail"
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-2"
          error={errors.email?.message}
        />
        <PasswordInput
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
          variant="outline"
          className="mb-2"

        />
        <div className="mt-4">
          <Button
            className="w-full h-11 sm:h-12 login-button"
            loading={loading}
            disabled={loading}
          >
            FAZER LOGIN
          </Button>
        </div>
      </form>
      <a href="javascript:return false;" className="text-sm mt-3 text-primary" onClick={() => setModalView("FORGOT_VIEW")}>Esqueceu a Password?</a>
      {/* End of forgot login form */}

      <div className="flex flex-col items-center  justify-center relative text-sm text-heading mt-5 sm:mt-4 mb-5 sm:mb-5">
        <hr className="w-full dark:border-neutral-700" />
        <span className="absolute left-2/4 -top-2.5 px-2 -ml-4 bg-white dark:bg-neutral-800  dark:text-white">
          Ou
        </span>
      </div>

      <Button className="w-full h-11 sm:h-12 border-2 bg-black dark:bg-black register-button"  onClick={() => setModalView("REGISTER")} >
        CRIAR CONTA
      </Button>

    </div>
  );
};

export default LoginForm;
