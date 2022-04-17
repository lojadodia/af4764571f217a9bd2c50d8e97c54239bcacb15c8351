import ArrowNarrowLeft from "@components/icons/arrow-narrow-left";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="inline-flex items-center justify-center text-primary font-medium transition-colors hover:text-primary-2 focus:text-primary-2 focus:outline-none"
      onClick={() => router.back()}
    >
      <ArrowNarrowLeft className="w-5 h-5 mr-2" strokeWidth={1.7} />
      Back
    </button>
  );
};

export default BackButton;
