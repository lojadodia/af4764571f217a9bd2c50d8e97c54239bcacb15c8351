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
            Cookies.set("auth_token", data.token);
            Cookies.set("auth_permissions", data.permissions);
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
      <p className="text-center text-sm dark:text-gray md:text-base text-body mt-4 sm:mt-5 mb-8 sm:mb-10">
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
          label="Email"
          {...register("email")}
          type="email"
          variant="outline"
          className="mb-5"
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          {...register("password")}
          error={errors.password?.message}
          variant="outline"
          className="mb-5"
          forgotPageRouteOnClick={() => setModalView("FORGOT_VIEW")}
        />
        <div className="mt-8">
          <Button
            className="w-full h-11 sm:h-12"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </div>
      </form>
      {/* End of forgot login form */}

      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full dark:border-neutral-700" />
        <span className="absolute left-2/4 -top-2.5 px-2 -ml-4 bg-white dark:bg-neutral-800  dark:text-white">
          Ou
        </span>
      </div>
      <div className="text-sm sm:text-base dark:text-gray text-body text-center">
        Não tem conta?{" "}
        <button
          onClick={() => setModalView("REGISTER")}
          className="ml-1 underline text-primary font-semibold transition-colors duration-200 focus:outline-none hover:text-primary-2 focus:text-primary-2 hover:no-underline focus:no-underline"
        >
          Criar Conta
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
