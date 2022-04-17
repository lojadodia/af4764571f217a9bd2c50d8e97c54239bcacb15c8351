import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";
import { Category, SettingsType } from "@ts-types/custom.types";
import axios from "axios";
import { settings } from "cluster";

const SettingsService = new CoreApi(API_ENDPOINTS.SETTINGS);

export const fetchSettings = async () => {
  const { data } = await SettingsService.findAll();
  return { settings: data };
};
type SettingsResponse = {
  settings: SettingsType;
};
export const useSettingsQuery = () => {
  return useQuery<SettingsResponse, Error>(
    API_ENDPOINTS.SETTINGS,
    fetchSettings
  );
};

export const listCategory = async()=>{
  return new Promise ((resolve, rejeita )  =>  {
    console.log(process.env.NEXT_PUBLIC_REST_API_ENDPOINT, API_ENDPOINTS.PRODUCTS)
    axios.get(  `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${API_ENDPOINTS.PRODUCTS}?search=type.slug:home`).then((resp)=>{
      const data:Category[] = resp.data?.data;
      resolve(data);
    }).catch((error)=>{
        console.log(error)
    })

  } )
}