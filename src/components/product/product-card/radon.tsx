import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import { siteSettings } from "@settings/site.settings";

type RadonProps = {
  product: any;
  className?: string;
};

const Radon: React.FC<RadonProps> = ({ product, className }) => {
  const { name, slug, image, author } = product ?? {};

  return (
    <Link href={`/products/${slug}`}>
      <article
        className={cn(
          "product-card cart-type-radon rounded h-full bg-white overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-sm",
          className
        )}
      >
        <div className="relative flex items-center justify-center w-auto h-48 sm:h-64">
          <Image
            src={image?.original ?? siteSettings?.product?.placeholderImage}
            alt={name}
            layout="fill"
            objectFit="contain"
            className="product-image"
          />
        </div>
        {/* End of product image */}

        <header className="p-3 md:p-6 text-center">
          <h3 className="text-sm md:text-base text-heading font-semibold truncate mb-2">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-body">por {author}</p>
        </header>
        {/* End of product info */}
      </article>
    </Link>
  );
};

export default Radon;
