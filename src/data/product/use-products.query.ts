import {
  QueryParamsType,
  ProductsQueryOptionsType,
  Product,
} from "@ts-types/custom.types";
import { CoreApi, ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useInfiniteQuery } from "react-query";
const ProductService = new CoreApi(API_ENDPOINTS.PRODUCTS);
const ProductTodayMenuService = new CoreApi(API_ENDPOINTS.TODAY_MENU)
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedProduct> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if(params.type === undefined) {
    params.type = 'home'
  }
  if (pageParam) {
    const response = await ProductService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await ProductService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const fetchProductsTodayMenu = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedProduct> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if(params.type === undefined) {
    params.type = 'home'
  }
  if (pageParam) {
    const response = await ProductTodayMenuService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await ProductTodayMenuService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};



const useProductsQuery = (options: ProductsQueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};


const useProductsTodayMenuQuery = (options: ProductsQueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.TODAY_MENU, options],
    fetchProductsTodayMenu,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useProductsQuery, useProductsTodayMenuQuery, fetchProducts, fetchProductsTodayMenu };
