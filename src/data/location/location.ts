import axios, { AxiosRequestConfig } from "axios"

export const addressInfo = (address:string,settings:any)=>{

     return new Promise(async(resolve, reject)=>{
       try {
        const config:AxiosRequestConfig = {
            method: 'get',
            url: `https://api.tomtom.com/search/2/search/${address}.json?countrySet=${settings?.env?.SHIPPING_COUNTRY ? settings?.env?.SHIPPING_COUNTRY : "PT"}&key=${settings?.env?.TOMTOM_MAP}`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
        const response =  await axios(config);
        resolve(response)

       } catch (error) {
       }

     })
}

export const addressInfoByCoords = (lat: any, lon:any)=>{
  return new Promise(async(resolve, reject)=>{
    try {
     const config:AxiosRequestConfig = {
         method: 'get',
         url: `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=Kn09fHvoCZdGKtl7qqR94cM5Ylbuu8OE`,
         headers: { 'content-type': 'application/x-www-form-urlencoded' }
     }
     const response =  await axios(config);
     return resolve(response.data.addresses[0])

    } catch (error) {
    }

  })
}



