import { InputHTMLAttributes } from "react";
import cn from "classnames";
import { SearchIcon } from "@components/icons/search-icon";
import { CloseIcon } from "@components/icons/close-icon";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  variant?: "minimal" | "normal";
  onSubmit: (e: any) => void;
  onClearSearch: (e: any) => void;
}

const classes = {
  normal:
    "bg-white pl-6 pr-14 rounded-tr-none rounded-br-none  border border-r-0 border-transparent focus:border-primary",
  minimal:
    "bg-gray-100 pl-10 pr-12 md:pl-14 border border-gray-200 focus:border-primary focus:bg-white",
};

const SearchBox: React.FC<Props> = ({
  className,
  label,
  onSubmit,
  onClearSearch,
  variant = "normal",
  value,
  ...rest
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={cn(
          "rounded md:rounded-lg flex relative",
          variant === "normal" ? "h-14 shadow-900" : "h-11 md:h-12"
        )}
      >
        <label htmlFor={label} className="sr-only">
          {label}
        </label>

        <input
          id={label}
          type="text"
          value={value}
          autoComplete="off"
          className={cn(
            "w-full h-full flex item-center appearance-none transition duration-300 ease-in-out text-heading placeholder-gray-500 overflow-hidden rounded-lg dark:bg-neutral-800 dark:border dark:placeholder-neutral-400 dark:border-neutral-500 border-r-0 dark:text-white focus:outline-none focus:ring-0",
            classes[variant]
          )}
          {...rest}
        />
        {value && (
          <button
            type="button"
            onClick={onClearSearch}
            className={cn(
              "cursor-pointer h-full w-10 md:w-14 flex items-center justify-center absolute text-body transition-colors duration-200 focus:outline-none hover:text-primary-2 focus:text-primary-2",
              {
                "right-36": variant === "normal",
                "right-0": variant !== "normal",
              }
            )}
          >
            <span className="sr-only">close</span>
            <CloseIcon className="w-3.5 h-3.5 md:w-3 md:h-3" />
          </button>
        )}

        {variant === "normal" ? (
          <button className="h-full px-8 flex items-center rounded-lg rounded-tl-none rounded-bl-none bg-primary text-white font-semibold transition-colors duration-200 focus:outline-none hover:bg-primary-2 focus:bg-primary-2">
            <SearchIcon className="w-4 h-4 mr-2.5" />
            Procurar
          </button>
        ) : (
          <button className="h-full w-10 md:w-14 flex items-center justify-center absolute left-0 text-body transition-colors duration-200 focus:outline-none hover:text-primary-2 focus:text-primary-2">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBox;
