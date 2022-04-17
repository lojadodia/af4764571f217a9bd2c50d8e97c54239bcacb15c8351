import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "normal" | "outline";
  size?: "big" | "medium" | "small";
  active?: boolean;

  loading?: boolean;
  disabled?: boolean;
}
const classes = {
  root:
    "inline-flex items-center rounded justify-center flex-shrink-0 font-semibold leading-none outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow",
  normal: "bg-primary text-white border border-transparent hover:bg-primary-2",
  outline:
    "border border-gray-500 bg-transparent hover:text-white hover:bg-primary hover:border-primary",
  disabled:
    "border border-gray-300 bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed",
  disabledOutline: "border border-gray-300 text-gray-400 cursor-not-allowed",
  small: "px-4 py-0 h-10 text-sm",
  medium: "px-5 py-0 h-12",
  big: "px-10 py-0 h-14",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "normal",
      size = "medium",
      children,
      active,
      loading = false,
      disabled = false,
      ...rest
    } = props;

    const classesName = cn(
      classes.root,
      {
        [classes.normal]: !disabled && variant === "normal",
        [classes.disabled]: disabled && variant === "normal",
        [classes.outline]: !disabled && variant === "outline",
        [classes.disabledOutline]: disabled && variant === "outline",
        [classes.small]: size === "small",
        [classes.medium]: size === "medium",
        [classes.big]: size === "big",
      },
      className
    );

    return (
      <button
        aria-pressed={active}
        data-variant={variant}
        ref={ref}
        className={classesName}
        disabled={disabled}
        {...rest}
      >
        {children}
        {loading && (
          <span
            className="h-4 w-4 ml-2 rounded-full border-2 border-transparent border-t-2 animate-spin"
            style={{
              borderTopColor:
                variant === "outline" ? "currentColor" : "#ffffff",
            }}
          />
        )}
      </button>
    );
  }
);

export default Button;
