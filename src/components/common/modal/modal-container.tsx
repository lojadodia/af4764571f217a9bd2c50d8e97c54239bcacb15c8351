import dynamic from "next/dynamic";
import { useUI } from "@contexts/ui.context";
import { useRouter } from 'next/router'
import Modal from "@components/common/modal/modal";
import { useCart } from "@contexts/quick-cart/cart.context";


import { useEffect } from 'react'
import { useCheckout } from "@contexts/checkout.context";

import { API_ENDPOINTS } from '@utils/api/endpoints'
import http from '@utils/api/http'

const Login = dynamic(() => import("@components/auth/login"));
const Register = dynamic(() => import("@components/auth/register"));

const ForgotPassword = dynamic(
  () => import("@components/auth/forget-password/forget-password")
);

const OrderType = dynamic(
  () => import("@components/order/order-type")
);
const ProductOffer = dynamic(
  () => import("@components/checkout/checkout-product-offer")
);
const PaymentForm = dynamic(() => import("@components/checkout/payment-form"));
const ProductDetailsModalView = dynamic(
  () => import("@components/product/product-details-modal-view")
);
const CreateOrUpdateAddressForm = dynamic(
  () => import("@components/address/address-form")
);
const AddressDeleteView = dynamic(
  () => import("@components/address/address-delete-view")
);

const ModalContainer = () => {
  const { displayModal, closeModal, modalView, modalData } = useUI();
  const { items, total, removeItemFromCart } = useCart()
  const { order_type } = useCheckout()
  const router = useRouter()
  function onCloseModal (status) {
    const url: URL = new URL(window.location)
    if (url.pathname.substr(0, 2) == '/a' && !status) {
      closeModal()
     // window.history.back()
     // return
      url.pathname = ''
      //window.history.pushState({}, '', url)
      // router.prefetch('/')
      window.history.replaceState({}, '', url)
      
      
    }
  }

  useEffect(() => {
    let elements = items.filter(item => item.id.toString().indexOf(".offer") !== -1)
    
    if (elements.length && order_type) {
      Promise.all(elements.map(elem => {

        return (http.post(`${API_ENDPOINTS.CHECK_OFFER}`, {
          order_type: order_type,
          amount: total
        }).then(res => res.data).then((data ) => {
          if(data?.message == "give_the_amount" || data?.message == "not_offer_found" || data?.message == "not_product_found"){
            removeItemFromCart(elem.id)
          }
        })
        )
      }))
      
    }
  }, [total, order_type, items])
  return (
    <Modal open={displayModal} lock={
        modalView === "ORDER_TYPE" 
        // ||
        // modalView === "LOGIN_VIEW" ||
        // modalView === "REGISTER" 
      } onClose={onCloseModal}>
      {modalView === "LOGIN_VIEW" && <Login />}
      {modalView === "REGISTER" && <Register />}
      {modalView === "FORGOT_VIEW" && <ForgotPassword />}
      {modalView === "ADD_OR_UPDATE_ADDRESS" && <CreateOrUpdateAddressForm />}
      {modalView === "DELETE_ADDRESS" && <AddressDeleteView />}
      {modalView === "ADD_CARD_INFO" && <PaymentForm />}
      {modalView === "ORDER_TYPE" && <OrderType />}
      {modalView === "PRODUCT_OFFER" && <ProductOffer />}
      {modalView === "PRODUCT_DETAILS" && (
        <ProductDetailsModalView productSlug={modalData} />
      )}
    </Modal>
  );
};

export default ModalContainer;