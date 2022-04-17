import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "@utils/use-click-outside";
import { zoomInOut } from "@utils/motion/zoom-in-out";

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const CartVoucher = () => {
  const voucherRef = useRef() as DivElementRef;
  const [toggleVoucher, setToggleVoucher] = useState<boolean>(false);
  useOnClickOutside(voucherRef, () => setToggleVoucher(false));
  function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }
  return (
    <div ref={voucherRef} className="text-center mt-2 mb-5">
      <AnimatePresence initial={false}>
        {toggleVoucher ? (
          <motion.form
            initial="from"
            animate="to"
            exit="from"
            variants={zoomInOut()}
            onSubmit={(e) => handleOnSubmit(e)}
            className="flex justify-between w-full h-13 p-1 rounded text-sm border border-solid border-gray-200 border-opacity-75 shadow-sm transition-colors duration-200 hover:border-primary"
          >
            <input
              type="text"
              placeholder="Enter voucher code"
              className="focus:outline-none px-4 flex-1"
            />
            <button
              type="submit"
              className="py-2 px-5 font-semibold flex-shrink-0 text-white bg-primary rounded shadow-400 transition-colors focus:outline-none hover:bg-primary-2 focus:bg-primary-2"
            >
              Apply
            </button>
          </motion.form>
        ) : (
          <motion.button
            initial="from"
            animate="to"
            exit="from"
            variants={zoomInOut()}
            onClick={() => setToggleVoucher(!toggleVoucher)}
            className="text-sm font-semibold text-primary transition-colors focus:outline-none hover:text-primary-2 focus:text-primary-2"
          >
            Do you have voucher?
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartVoucher;
