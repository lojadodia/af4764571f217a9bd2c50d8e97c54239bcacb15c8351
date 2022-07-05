import { useRouter } from "next/router";

import { scroller, Element } from "react-scroll";
import dynamic from "next/dynamic";
import Banner from "@components/common/banner";
import HomeLayout from "@components/layout/home-layout";
import ProductFeed from "@components/product/feed";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import FilterBar from "@components/common/filter-bar";
import { useWindowSize } from "@utils/use-window-size";
import { sitePages, PageName } from "@settings/site-pages.settings";
import { getKeyValue } from "@utils/get-key-value";
import React, { useEffect } from "react";
import Seo from "@components/ui/seo";
import { fetchSettings } from "@data/settings/use-settings.query";
import PromotionSlider from "@components/common/promotion-slider";
import { GetServerSideProps } from "next";
 import Cookies from "js-cookie";

import nookies from 'nookies';




const ButtonBuy = dynamic(
  () => import("@components/ui/button-buy"), { ssr: false})

const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    if(ctx?.query?.af) {
      nookies.set(ctx, 'affiliates', ctx?.query?.af, { path: '/'});
    }
  
  const response = await fetchSettings()
  return {
    props: {
      metadata: response.settings.options
    }
  }
};




export default function HomePage({ metadata }: {metadata: object}) {

  useEffect(() => {
    const takeCookie = Cookies.get('offer');
    if(takeCookie){
      Cookies.remove('offer')
    }
  })
  
  
    
  const { query } = useRouter();
  // !query.category && (query.category = 'fruits')
  useEffect(() => {
    if (query.text || query.category) {
      scroller.scrollTo("grid", {
        smooth: true,
        offset: -110,
      });
    }
  }, [query.text, query.category]);


  

  const { width } = useWindowSize();
  const PAGE_TYPE = "home";
  const getPageData = getKeyValue(sitePages, PAGE_TYPE as PageName);


  return (
    
    <>
    <Seo metadata={metadata} />

    
      <Banner banner={getPageData?.banner} className="" />

      <FilterBar />
      <Element
        name="grid"
        className="flex flex-1 border-t border-r border-solid border-theme dark:border-neutral-700 dark:bg-black border-opacity-70"
      >
        <CategoryDropdownSidebar />
        <main className="flex-1">
          <ProductFeed />
          <ButtonBuy title="Carrinho" isOpenModal={true} className="add-cart-button h-16 no-desktop shadow-400" />
        </main>
      </Element>
      {width > 1023 && <CartCounterButton />}
    </>
  );
}

HomePage.Layout = HomeLayout;
