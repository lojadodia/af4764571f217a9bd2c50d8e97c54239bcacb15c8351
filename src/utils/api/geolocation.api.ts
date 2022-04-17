import { Visitor } from "@ts-types/custom.types";
import { sendVisitor } from "@data/visitor/visitor"; 

  const getVisitorDetails = () => {
    return Promise.all([fetch("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572")
        .then(response => response.json())
            .then(data => data),
            fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}api/store/info?token=LDDEUu`)
            .then(res => res.json()).then(data => data.merchant)])
  }
  export function pushVisitorDetails () {
    const geo = sessionStorage.getItem('session_storage_merchant') || null

   
    !geo && getVisitorDetails().then(data => {
      const details = data[0]
      const visitor: Visitor = {
        ip: details?.IPv4,
        address: details?.city,
        country: details?.country_name,
        latitude: details?.latitude,
        longitude: details?.longitude,
        merchant: data[1]
      }
      
      sendVisitor(visitor)
      sessionStorage.setItem('session_storage_merchant', data[1])
    })
    
  };
  