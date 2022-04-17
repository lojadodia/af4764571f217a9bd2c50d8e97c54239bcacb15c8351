import Image from "next/image";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen grid place-items-center p-4 sm:p-8">
      <div className="text-center">
        <p className=" text-gray-600 text-sm 2xl: uppercase tracking-widest mb-4 sm:mb-5">
          Código de Erro: 404
        </p>
        <h1 className="font-bold text-2xl leading-normal sm:text-3xl text-gray-900 mb-5">
        Ups! Parece que isto não é uma página
        </h1>
        <div className="mb-11">
          <Image
            src="/no-result.svg"
            alt="No result found"
            width={600}
            height={453}
          />
        </div>
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center  sm:text-base text-gray-900 underline focus:outline-none hover:no-underline hover:text-gray-600"
        >
         Me leve para o Inicio
        </Link>
      </div>
    </div>
  );
}
