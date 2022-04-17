import { motion } from "framer-motion";
import renderProductCard from "@components/product/render-product-card";
import cn from "classnames";
interface Props {
  products: any;
  currentProductId: any;
  gridClassName?: string;
}

const RelatedProducts = ({
  products,
  currentProductId,
  gridClassName,
}: Props) => {
  return (
    <>
      <h2 className="text-lg text-heading dark:text-white tracking-tight font-semibold mb-6">
      Produtos Relacionados
      </h2>
      <div style={{paddingBottom:'120px'}}
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2",
          gridClassName
        )}
      >
        {products?.map((item: any, idx: number) => {
          if (currentProductId === item.id) {
            return null;
          }
          return (
            <motion.div key={idx}>
              {renderProductCard(
                item,
                "!shadow-none border border-gray-200 dark:border-neutral-700 hover:!border-gray-200 dark:border-neutral-700 border-opacity-70"
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default RelatedProducts;
