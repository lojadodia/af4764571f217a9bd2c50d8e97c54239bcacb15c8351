import { FC, useEffect, useRef } from "react";
import Portal from "@reach/portal";
import { motion, AnimatePresence } from "framer-motion";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import cn from "classnames";
import Scrollbar from "@components/ui/scrollbar";
import { fadeInRight } from "@utils/motion/fade-in-right";
import { fadeInLeft } from "@utils/motion/fade-in-left";
import { fadeInOut } from "@utils/motion/fade-in-out";

interface SidebarProps {
  children: any;
  open: boolean;
  variant?: "left" | "right";
  useBlurBackdrop?: boolean;
  onClose: () => void;
}
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const Sidebar: FC<SidebarProps> = ({
  children,
  open = false,
  variant = "right",
  useBlurBackdrop,
  onClose,
}) => {
  const ref = useRef() as DivElementRef;
  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.aside
            ref={ref}
            key="drawer"
            initial="from"
            animate="to"
            exit="from"
            variants={variant === "right" ? fadeInRight() : fadeInLeft()}
            className="fixed inset-0 overflow-hidden h-full" style={{zIndex:81}}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial="from"
                animate="to"
                exit="from"
                variants={fadeInOut(0.35)}
                onClick={onClose}
                className={cn(
                  "absolute inset-0 bg-black bg-opacity-40",
                  useBlurBackdrop && "use-blur-backdrop"
                )}
              />
              <div
                className={cn(
                  "absolute inset-y-0 max-w-full flex outline-none",
                  variant === "right" ? "right-0" : "left-0"
                )}
              >
                <div className="h-full w-screen max-w-md">
                  <div className="h-full flex flex-col text-base bg-white shadow-xl">
                    <Scrollbar className="w-full h-full">{children}</Scrollbar>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Sidebar;
