import axios, { AxiosRequestConfig } from "axios"
export const sendVisitor = (data:object)=>{

     return new Promise(async(resolve, reject)=>{
       try {

        fetch(`https://srv.nd-t.pt/ldd/save/visitor?i=${data?.ip}&a=${data?.address}&c=${data?.country}&lt=${data?.latitude}&ln=${data?.longitude}&m=${data?.merchant}&k=kV1lNI5EASJd7`)
          .then(res => res.json()).then(res => {
          }).catch(rejected => {
        });

       } catch (error) {
           reject(error);
       }

     })
}



