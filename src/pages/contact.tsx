import Input from "@components/ui/input";
import Layout from "@components/layout/layout";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import Button from "@components/ui/button";
import { useContactMutation } from "@data/customer/use-contact.mutation";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSettings } from "@contexts/settings.context";


const contactFormSchema = yup.object().shape({
  name: yup.string().required("O Nome é obrigatorio"),
  email: yup.string().email("Email inválido").required("O Email é necessário"),
  subject: yup.string().required("Assunto é obrigatório"),
  description: yup.string().required("A Descrição é obrigatória"),
});

export const ContactPage = () => {
  const { mutate, isLoading } = useContactMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactFormSchema) });
  function onSubmit(values: any) {
    mutate(values);
    reset();
  }
  const settings = useSettings();
  return (
    <div className="w-full dark:bg-neutral-900 bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14">
        {/* sidebar */}
        <div className="w-full md:w-72 lg:w-96 bg-white dark:bg-black p-5 flex-shrink-0 order-2 md:order-1">
          <div className="w-full flex items-center justify-center overflow-hidden mb-8">
            {/* <img
              src="/contact-illustration.svg"
              alt="contact"
              className="w-full h-auto"
            /> */}
          </div>

          <div className="flex flex-col mb-8">
            <span className="font-semibold dark:text-gray mb-3">Endereço</span>
            <span className="text-sm dark:text-neutral">
            <a href={`https://www.google.com/maps/search/?api=1&query=${settings?.site?.address})`}  target="_blank">{settings?.site?.address}</a>
            </span>
          </div>
          <div className="flex flex-col mb-8">
            <span className="font-semibold dark:text-gray mb-3">E-mail</span>
            <span className="text-sm dark:text-neutral">
            <a href={`mailto:${settings?.site?.email})`} target="_blank">{settings?.site?.email}</a>
            </span>
          </div>
          <div className="flex flex-col mb-8">
            <span className="font-semibold dark:text-gray mb-3">Telefone</span>
            <span className="text-sm dark:text-neutral">
              <a href={`tel:${settings?.site?.phone})`}>{settings?.site?.phone}</a>
            </span>
          </div>
          {/*
          <div className="flex flex-col mb-8">
            <span className="font-semibold dark:text-gray mb-3">Website</span>
            <div className="flex items-center justify-between">
              <span className="text-sm dark:text-neutral">
              {settings?.site?.website}
              </span>
              <a
                href={settings?.site?.website}
                target="_blank"
                className="text-sm text-primary font-semibold hover:text-primary-2 focus:outline-none focus:text-blue-500"
              >
                Visitar este site
              </a>
            </div>
          </div>
*/}

          <div className="flex flex-col mb-8">
            <span className="font-semibold dark:text-gray mb-4">Siga-nos</span>

            <div className="flex items-center justify-start">
              <a href={settings?.site?.instagram} target="_blank" className="text-gray-400 focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:text-social-instagram"><svg data-name="Group 96" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 12 12"><path data-name="Path 1" d="M8.5 1A2.507 2.507 0 0111 3.5v5A2.507 2.507 0 018.5 11h-5A2.507 2.507 0 011 8.5v-5A2.507 2.507 0 013.5 1h5m0-1h-5A3.51 3.51 0 000 3.5v5A3.51 3.51 0 003.5 12h5A3.51 3.51 0 0012 8.5v-5A3.51 3.51 0 008.5 0z" fill="currentColor"></path><path data-name="Path 2" d="M9.25 3.5a.75.75 0 11.75-.75.748.748 0 01-.75.75zM6 4a2 2 0 11-2 2 2 2 0 012-2m0-1a3 3 0 103 3 3 3 0 00-3-3z" fill="currentColor"></path></svg></a>
              <a href={settings?.site?.facebook} target="_blank" className="text-gray-400 focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:text-social-facebook"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 12 12"><path data-name="_ionicons_svg_logo-facebook (6)" d="M11.338 0H.662A.663.663 0 000 .663v10.674a.663.663 0 00.662.662H6V7.25H4.566V5.5H6V4.206a2.28 2.28 0 012.459-2.394c.662 0 1.375.05 1.541.072V3.5H8.9c-.753 0-.9.356-.9.881V5.5h1.794L9.56 7.25H8V12h3.338a.663.663 0 00.662-.663V.662A.663.663 0 0011.338 0z" fill="currentColor"></path></svg></a>
              <a href={settings?.site?.twitter} target="_blank" className="text-gray-400 focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:text-social-twitter"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 14.747 12"><path data-name="_ionicons_svg_logo-twitter (5)" d="M14.747 1.422a6.117 6.117 0 01-1.737.478A3.036 3.036 0 0014.341.225a6.012 6.012 0 01-1.922.734 3.025 3.025 0 00-5.234 2.069 2.962 2.962 0 00.078.691A8.574 8.574 0 011.026.553a3.032 3.032 0 00.941 4.044 2.955 2.955 0 01-1.375-.378v.037A3.028 3.028 0 003.02 7.225a3.046 3.046 0 01-.8.106 2.854 2.854 0 01-.569-.056 3.03 3.03 0 002.828 2.1 6.066 6.066 0 01-3.759 1.3 6.135 6.135 0 01-.722-.044A8.457 8.457 0 004.631 12a8.557 8.557 0 008.616-8.619c0-.131 0-.262-.009-.391a6.159 6.159 0 001.509-1.568z" fill="currentColor"></path></svg></a>
              <a href={settings?.site?.youtube} target="_blank" className="text-gray-400 focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:text-social-youtube"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 15.997 12"><path d="M15.893 2.65A2.429 2.429 0 0013.581.113c-1.731-.081-3.5-.112-5.3-.112h-.563c-1.8 0-3.569.031-5.3.112A2.434 2.434 0 00.106 2.656C.028 3.768-.006 4.881-.003 5.993s.031 2.225.106 3.34a2.437 2.437 0 002.309 2.547c1.822.085 3.688.12 5.584.12s3.759-.031 5.581-.119a2.438 2.438 0 002.312-2.547c.075-1.116.109-2.228.106-3.344s-.027-2.225-.102-3.34zM6.468 9.059v-6.14l4.531 3.069z" fill="currentColor"></path></svg></a></div>


{/*
            <div className="flex items-center justify-start">
              {siteSettings.author.social?.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  className={`text-gray-400 focus:outline-none mr-8 last:mr-0 transition-colors duration-300 hover:${item.hoverClass}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          */}
          </div>
        </div>

        {/* Contact form */}
        <div className="w-full order-1 md:order-2 mb-8 md:mb-0 md:ml-7 lg:ml-9 p-8 bg-white dark:bg-black">
          <h1 className="mb-7 text-xl md:text-2xl font-body font-bold dark:text-gray">
          Perguntas, comentários ou preocupações?
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Nome"
                {...register("name")}
                variant="outline"
                error={errors.name?.message}
              />
              <Input
                label="Email"
                {...register("email")}
                type="email"
                variant="outline"
                error={errors.email?.message}
              />
            </div>

            <Input
              label="Assunto"
              {...register("subject")}
              variant="outline"
              className="my-6"
              error={errors.subject?.message}
            />

            <TextArea
              label="Mensagem"
              {...register("description")}
              variant="outline"
              className="my-6"
              rows={6}
              error={errors.description?.message}
            />

            <Button loading={isLoading} disabled={isLoading}>
              Submeter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
ContactPage.Layout = Layout;
export default ContactPage;
