import React, { InputHTMLAttributes } from "react";
import styles from "./radio.module.css";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name: string;
  id: string;
  error?: string;
}

const Radio = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, name, id, error, ...rest }, ref) => {
    return (
      <div className={className}>
        <div className="flex items-center">
          <input
            id={id}
            name={name}
            type="radio"
            ref={ref}
            className={styles.radio_input}
            {...rest}
          />

          <label  dangerouslySetInnerHTML={{__html: label}} htmlFor={id} className="text-body text-sm">
        
          </label>
        </div>

        {error && (
          <p className="my-2 text-xs text-right text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

export default Radio;
