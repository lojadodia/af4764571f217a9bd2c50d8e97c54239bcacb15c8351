import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import cn from "classnames";
import CopyToClipboard from "react-copy-to-clipboard";

type CouponCardProps = {
  coupon?: any;
  className?: string;
};
type InputElementRef = React.MutableRefObject<HTMLInputElement>;

const CouponCard: React.FC<CouponCardProps> = ({ coupon, className }) => {
  const { code, image, is_valid } = coupon;
  const [copyText, setCopyText] = useState({
    value: code,
    copied: false,
  });
  const codeRef = useRef() as InputElementRef;

  useEffect(() => {
    if (copyText.copied) {
      setTimeout(() => {
        setCopyText({
          ...copyText,
          copied: false,
        });
      }, 3500);
    }
  }, [copyText.copied]);

  return (
    <div className={cn("coupon-card", className)}>
      <div className="flex rounded overflow-hidden bg-gray-200">
        <Image
          src={image?.thumbnail ?? "/coupon-placeholder.svg"}
          alt={code}
          width={572}
          height={429}
        />
      </div>
      <div className="w-11/12 grid grid-flow-col auto-cols-fr items-center py-4 px-5 mx-auto rounded-bl rounded-br shadow-sm bg-white">
        {is_valid ? (
          <>
            <input
              readOnly
              ref={codeRef}
              value={copyText.value}
              className="text-heading font-semibold uppercase focus:outline-none"
            />

            {!copyText.copied ? (
              <CopyToClipboard
                text={copyText.value}
                onCopy={() =>
                  setCopyText({
                    ...copyText,
                    copied: true,
                  })
                }
              > 
                <button className="text-right text-primary text-sm font-semibold transition-colors duration-200 focus:outline-none hover:text-primary-2 focus:text-primary-2">
                  Copiar
                </button>
              </CopyToClipboard>
            ) : (
              <div className="text-right text-primary text-sm font-semibold">
                Copiado!
              </div>
            )}
          </>
        ) : (
          <span className="text-sm text-center block text-red-500">
            Expirado
          </span>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
