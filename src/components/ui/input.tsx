import cn from "classnames";
import React, { InputHTMLAttributes } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  type?: string;
  value?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline" | "line";
  dimension?: "small" | "medium" | "big";
}

const variantClasses = {
  normal:
    "bg-gray-100 border border-gray-300 rounded focus:shadow focus:bg-white focus:border-primary",
  solid:
    "bg-gray-100 border border-gray-100 rounded focus:bg-white focus:border-primary",
  outline: "border border-gray-300 rounded dark:bg-black dark:text-white dark:border-neutral-700 focus:border-primary",
  line: "pl-0 border-b border-gray-300 rounded-none focus:border-primary",
};

const sizeClasses = {
  small: "text-sm h-10",
  medium: "h-12",
  big: "h-14",
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      name,
      error,
      value,
      children,
      variant = "normal",
      dimension = "medium",
      shadow = false,
      disabled = false,
      type = "text",
      inputClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className="block text-gray-600 dark:text-neutral font-semibold text-sm leading-none mb-3"
          >
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          value={value}
          className={cn(
            "px-4 flex items-center w-full appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0",
            shadow && "focus:shadow",
            variantClasses[variant],
            sizeClasses[dimension],
            disabled && "bg-gray-100 cursor-not-allowed",
            inputClassName
          )}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-invalid={error ? "true" : "false"}
          {...rest}
        />
        {error && <p className="my-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default Input;
