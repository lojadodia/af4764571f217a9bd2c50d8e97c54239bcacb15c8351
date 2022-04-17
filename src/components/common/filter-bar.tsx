import { useUI } from "@contexts/ui.context";
import ProductTypeMenu from "@components/layout/navbar/product-type-menu";
import { FilterIcon } from "@components/icons/filter-icon";

export default function FilterBar() {
  const { openSidebar, setSidebarView } = useUI();
  function handleSidebar() {
    setSidebarView("FILTER_VIEW");
    return openSidebar();
  }
  return (
    <div className="sticky top-14 md:top-16 lg:top-22 h-14 md:h-16 z-10 flex xl:hidden items-center justify-between py-3 px-5 lg:px-7 bg-white dark:bg-black  border-t border-b  border-gray-200 dark:border-neutral-700">
      <button
        onClick={handleSidebar}
        className="flex items-center border h-8 md:h-10 py-1 md:py-1.5 px-3 md:px-4 text-sm md:text-base bg-gray-100 dark:bg-neutral-900 dark:text-gray bg-opacity-90 rounded border-gray-200 dark:border-neutral-700 border-b font-semibold text-heading transition-colors duration-200 focus:outline-none hover:border-primary-2 focus:border-primary-2 hover:bg-primary focus:bg-primary hover:text-white focus:text-white"
      >
        <FilterIcon width="18" height="14" className="mr-2" />
        CATEGORIAS
      </button>
      <ProductTypeMenu btnClassName="text-heading hidden transition-colors duration-200 hover:text-primary focus:text-primary" />
    </div>
  );
}
