import React, { InputHTMLAttributes, useState } from "react";
import cn from "classnames";
import Link from "@components/ui/link";
import { Eye } from "@components/icons/eye-icon";
import { EyeOff } from "@components/icons/eye-off-icon";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label: string;
  name: string;
  forgotPageLink?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  error: string | undefined;
  // onChange?: (...args: any[]) => any;
  forgotPageRouteOnClick?: () => void;
}

const variantClasses = {
  normal:
    "bg-gray-100 border border-gray-300 focus:shadow focus:bg-white focus:border-primary",
  solid:
    "bg-gray-100 border border-gray-100 focus:bg-white focus:border-primary",
  outline: "border border-gray-300 focus:border-primary dark:bg-black dark:text-white dark:border-neutral-700",
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      label,
      name,
      error,
      children,
      variant = "normal",
      shadow = false,
      type = "text",
      forgotPageLink = "",
      forgotPageRouteOnClick,
      // onChange,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    // const handleOnChange = (e: any) => {
    //   if (onChange) {
    //     onChange(e.target.value);
    //   }
    //   return null;
    // };
    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={name} className="font-semibold dark:text-neutral text-sm text-body">
            {label}
          </label>

         
        </div>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={show ? "text" : "password"}
            ref={ref}
            className={cn(
              "py-3 pl-4 pr-11 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0",
              shadow && "focus:shadow",
              variantClasses[variant],
              inputClassName
            )}
            // onChange={handleOnChange}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...rest}
          />
          <label
            htmlFor={name}
            className="absolute right-4 top-5 -mt-2 text-gray-500 cursor-pointer dark:text-gray"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOff className="w-6 h-6" />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </label>
        </div>
        
        {error && <p className="my-2 text-xs text-red-500">{error}</p>}

        {forgotPageLink && (
            <Link
              href={forgotPageLink}
              className="text-sm mt-3 text-primary transition-colors duration-200 focus:outline-none focus:text-blue-500 hover:text-primary-2"
            >
              Esqueceu a Password?
            </Link>
          )}
          {forgotPageRouteOnClick && (
            <button
              onClick={forgotPageRouteOnClick}
              type="button"
              className="text-sm mt-3 text-primary transition-colors duration-200 focus:outline-none focus:text-blue-500 hover:text-primary-2"
            >
              Esqueceu a Password?
            </button>
          )}
      </div>
    );
  }
);

export default PasswordInput;
