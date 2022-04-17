import axios, { AxiosRequestConfig } from "axios"
 
export const getApiKeys = ()=>{
  return new Promise(async(resolve, reject)=>{
    try {
     const config:AxiosRequestConfig = {
         method: 'get',
         url: `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}api/store/info?token=LDDEUu`,
         headers: { 'content-type': 'application/x-www-form-urlencoded' }
     }
     const response =  await axios(config);
     return resolve(response.data)

    } catch (error) {
    }

  })
}



