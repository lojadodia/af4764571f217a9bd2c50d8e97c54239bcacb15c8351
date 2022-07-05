import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { CloseIcon } from "@components/icons/close-icon";

const DrawerWrapper: React.FC = ({ children }) => {
  const { closeSidebar } = useUI();
  return (
    <div className="flex flex-col h-full dark:bg-black">
      <div className="flex items-center justify-between py-4 px-5 md:py-5 md:px-8 mb-4 md:mb-6 border-b border-gray-200 dark:border-neutral-700 border-opacity-75">
        <Logo className="w-24 md:w-auto" />
        <button
          onClick={closeSidebar}
          className="w-7 h-7 flex items-center justify-center rounded-full text-gray-500 bg-gray-200 transition-all duration-200 focus:outline-none hover:bg-primary focus:bg-primary hover:text-white focus:text-white"
        >
          <CloseIcon className="w-2.5 h-2.5" />
        </button>
      </div>
      {/* End of header part */}

      {children}
      {/* End of menu part */}
    </div>
  );
};

export default DrawerWrapper;
