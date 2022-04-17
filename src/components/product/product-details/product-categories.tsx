import Router from "next/router";

interface Props {
  categories: any;
  basePath: string;
  onClose?: () => void;
}

const ProductCategories = ({ onClose, categories, basePath }: Props) => {
  const handleClick = (path: string) => {
    Router.push(path);
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="w-full mt-4 md:mt-6 pt-4 md:pt-6 flex flex-row items-start border-t border-gray-200 dark:border-neutral-700 border-opacity-60">
      <span className="text-sm font-semibold text-heading dark:text-gray capitalize mr-6 py-1">
        Categorias:
      </span>
      <div className="flex flex-row flex-wrap">
        {categories?.map((category: any) => (
          <button
            onClick={() => handleClick(`${basePath}?category=${category.slug}`)}
            key={category.id}
            className="lowercase text-sm text-heading dark:text-gray tracking-wider whitespace-nowrap py-1 px-2.5 bg-transparent border border-gray-200 dark:border-neutral-700 rounded mr-2 mb-2 transition-colors hover:border-primary hover:text-primary focus:outline-none focus:bg-opacity-100"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
