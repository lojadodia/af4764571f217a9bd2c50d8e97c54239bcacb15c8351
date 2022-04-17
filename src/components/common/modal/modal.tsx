import { CloseIcon } from "@components/icons/close-icon";
import { useUI } from "@contexts/ui.context";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

export default function Modal({ open, onClose, lock = false, children }: any) {
  const cancelButtonRef = useRef(null);
  const { closeModal, modalView } = useUI();
  const close = () => {
    if(modalView == "PRODUCT_DETAILS"){
      const url: URL = new URL(window.location)
      url.pathname = `/`
      window.history.pushState({}, '/', url)
    }
    closeModal();
  };
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={onClose}
      >
        <div
        className="min-h-full md:p-5 text-center relative">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900  bg-opacity-85 w-full h-full" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block min-w-content max-w-full text-left align-middle transition-all  md:rounded-xl relative">
              {!lock && (<button
                onClick={close}
                aria-label="Close panel"
                ref={cancelButtonRef}
                className="inline-block bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 outline-none focus:outline-none p-2 rounded-full absolute top-2 right-2 z-[60] x-close-icon"
              >
                <CloseIcon className="w-8 h-8" />
              </button>)
              }
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
