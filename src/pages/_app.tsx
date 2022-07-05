import type { AppProps /*, AppContext */ } from "next/app";
import Head from "next/head";
import Router from "next/router";

import "@vetixy/circular-std";
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@assets/main.css";
import "react-toastify/dist/ReactToastify.css";
import { UIProvider } from "@contexts/ui.context";
import { SearchProvider } from "@contexts/search.context";
import { CheckoutProvider } from "@contexts/checkout.context";
import ModalContainer from "@components/common/modal/modal-container";
import SidebarContainer from "@components/common/sidebar/sidebar-container";
import ErrorMessage from "@components/ui/error-message";
import { SettingsProvider } from "@contexts/settings.context";
import PageLoader from "@components/ui/page-loader/page-loader";
import {
  useSettingsQuery,
  fetchSettings,
} from "@data/settings/use-settings.query";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { useEffect, useRef, useState } from "react";
import Color from "color";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "@contexts/quick-cart/cart.context";
import Seo from "@components/ui/seo";
import { useSettings } from "@contexts/settings.context";
import TagManager from "react-gtm-module";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";


function FacebookPixel() {
  const settings: any = useSettings();
  const [isLinkElementLoaded, setLinkElementLoaded] = useState(false)





  useEffect(() => {
    const FACEBOOKPIXELID = settings?.env?.FACEBOOK_PIXEL;
    FACEBOOKPIXELID &&
      import("react-facebook-pixel")
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(FACEBOOKPIXELID);
          ReactPixel.pageView();

          Router.events.on("routeChangeComplete", () => {
            ReactPixel.pageView();
          });
        });
    settings?.env?.GOOGLE_TAG &&
      TagManager.initialize({
        gtmId: settings?.env?.GOOGLE_TAG,
      });


    const linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("type", "text/css");
    linkElement.setAttribute(
      "href",
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}`+"custom/style.css"
    );
    document.head.appendChild(linkElement);
    setLinkElementLoaded(true)

  }, [settings?.env]);

  return null;
}

const Noop: React.FC = ({ children }) => <>{children}</>;

const AppSettings: React.FC = (props) => {
  const { data, error, isLoading: loading } = useSettingsQuery();

  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return <SettingsProvider initialValue={data?.settings?.options} {...props} />;
};

export default function CustomApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  useEffect(() => {
    // alterar o tema do site.
    fetchSettings().then((res: any) => res.settings.options).then((data: {color: any}) => {
      const color = Color(data?.site?.color).darken(0.5);
      const bg = Color(data?.site?.color).lightness(96)
      const textnormal = Color(data?.site?.color).lightness(20)
      const textdark = Color(data?.site?.color).lightness(15)
      document.documentElement.style.setProperty('--text-normal', textnormal);
      document.documentElement.style.setProperty('--text-dark', textdark);
      document.documentElement.style.setProperty('--gossamer-600', color);
      document.documentElement.style.setProperty('--gossamer-500', data?.site?.color);

      if(data?.env?.THEME != "dark"){
        if(data?.site?.bg_color){
          document.documentElement.style.setProperty('--bg-gray-100', data?.site?.bg_color);
          document.documentElement.style.setProperty('--border-theme', Color(data?.site?.bg_color).darken(0.1));
        }else{
          document.documentElement.style.setProperty('--bg-gray-100', bg);
        }
      }else{
        document.documentElement.style.setProperty('--bg-gray-100', "#000");
        document.documentElement.style.setProperty('--border-theme', "#262626");
      }

      var link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
        link.href = data?.seo?.ogImage?.original;
      });

    i18next
      .use(HttpApi)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        supportedLngs: ["PT", "BR"],
        fallbackLng: "PT",
        debug: false,
        // Options for language detector
        detection: {
          order: ["path", "cookie", "htmlTag"],
          caches: ["cookie"],
        },
        // react: { useSuspense: false },
        backend: {
          loadPath: "/locales/{{lng}}/translation.json",
        },
      });
  }, []);


  const Layout = (Component as any).Layout || Noop;
  return (

      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <AppSettings>
            <UIProvider>
              <CartProvider>
                <CheckoutProvider>
                  <SearchProvider>
                    <Layout>
                   
                      <Head> 
                     
                      </Head>
                      <Seo />
                      <FacebookPixel />
                      <Component {...pageProps} />
                    </Layout>
                    <ToastContainer autoClose={4000} />
                    <ModalContainer />
                    <SidebarContainer />
                  </SearchProvider>
                </CheckoutProvider>
              </CartProvider>
            </UIProvider>
          </AppSettings>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>

 
  );
}
