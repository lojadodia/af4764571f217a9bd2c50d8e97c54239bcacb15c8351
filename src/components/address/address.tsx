import SectionWithCardGroup from "@components/common/section-with-card-group";
import { useCheckout } from "@contexts/checkout.context";
import { useUI } from "@contexts/ui.context";
import { loggedIn } from "@utils/is-loggedin";
import { useEffect } from "react";

interface Props {
  id: string;
  heading: string;
  addresses: any[] | undefined;
  count?: number;
  type?: "billing" | "shipping";
}

const Address = ({ id, addresses, heading, count, type }: Props) => {
  const { openModal, setModalView, setModalData } = useUI();
  const { updateBillingAddress, updateShippingAddress } = useCheckout();

  useEffect(() => {
    if (!!addresses?.length && type === "billing") {
      handleSelect(addresses[0])
      updateBillingAddress(addresses[0]);
    }
    else if (addresses?.length && type === "shipping") {
      updateShippingAddress(addresses[0]);
    } else {
     //updateBillingAddress(null);
     //updateShippingAddress(null);
    }
  }, [type]);


  /*
  useEffect(() => {
    if (addresses && type === "billing") {
      updateBillingAddress(addresses[0]);
    }
    if (addresses && type === "shipping") {
      updateShippingAddress(addresses[0]);
    }
  }, [addresses]);
  */




  function handleAdd() {
    if (loggedIn()) {
      setModalData({ customerId: id, type });
      setModalView("ADD_OR_UPDATE_ADDRESS");
      return openModal();
    } else {
      setModalView("LOGIN_VIEW");
      openModal();
    }
  }
  function handleEdit(address: any) {
    setModalData({ customerId: id, address });
    setModalView("ADD_OR_UPDATE_ADDRESS");
    return openModal();
  }
  function handleDelete(address: any) {
    setModalData({ customerId: id, addressId: address.id });
    setModalView("DELETE_ADDRESS");
    return openModal();
  }
  function handleSelect(item: any) {
    
    if (type === "billing") {
      updateBillingAddress(item);
    } else {
      updateShippingAddress(item);
    }
  }
  return (
    <SectionWithCardGroup
      count={count}
      heading={heading}
      addActionText="Endereço"
      items={addresses}
      onSelect={handleSelect}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default Address;
