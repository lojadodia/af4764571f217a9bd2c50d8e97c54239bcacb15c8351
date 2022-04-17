import React, { TextareaHTMLAttributes } from "react";
import cn from "classnames";

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
}

const variantClasses = {
  normal:
    "bg-gray-100 border border-gray-300 focus:shadow focus:bg-white focus:border-primary",
  solid:
    "bg-gray-100 border border-gray-100 focus:bg-white focus:border-primary",
  outline: "border border-gray-300 focus:border-primary dark:bg-black dark:text-white dark:border-neutral-700 ",
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {
    className,
    label,
    name,
    error,
    variant = "normal",
    shadow = false,
    inputClassName,
    ...rest
  } = props;

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
      <textarea
        id={name}
        name={name}
        className={cn(
          "px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm dark:text-white focus:outline-none focus:ring-0",
          shadow && "focus:shadow",
          variantClasses[variant],
          inputClassName
        )}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        rows={4}
        ref={ref}
        {...rest}
      />
      {error && <p className="my-2 text-xs text-red-500">{error}</p>}
    </div>
  );
});

export default TextArea;
