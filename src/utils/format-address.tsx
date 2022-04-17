import { UserAddress } from "@ts-types/custom.types";

function removeEmpty(obj: any): any {
  return Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce(
      (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? removeEmpty(v) : v }),
      {}
    );
}
//street_address door details, zip, city 
export function formatAddress(address: UserAddress) {
  let formattedAddress = {};
  if (address) {
    formattedAddress = removeEmpty(address);
     
  } 

  if(!formattedAddress?.street_address){
    return "Takeaway";
  }else{
    return formattedAddress?.street_address + ' ' + formattedAddress?.door + ' ' + formattedAddress?.details + ', '+ formattedAddress?.zip + ', ' + formattedAddress?.city + ', ' + formattedAddress?.state;
  }
  

}
