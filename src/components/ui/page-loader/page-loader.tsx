import cn from "classnames";
import styles from "./page-loader.module.css";
import { useSettingsQuery } from "@data/settings/use-settings.query";
import Head from 'next/head'
import { ThemeProvider } from "next-themes";
import { useSettings } from "@contexts/settings.context";

const PageLoader = () => {
  const { isLoading: loading } = useSettingsQuery();
  const settings = useSettings();
  return (
  <>
     <Head>
     <title>{process.env.NEXT_APP_TITLE}</title>
        <meta  name="description" content={process.env.NEXT_APP_DESCRIPTION} />
        <link rel="icon" type="image/png" href={process.env.NEXT_APP_ICON} />
      </Head>
      {!!loading ? 

    <ThemeProvider attribute="class" forcedTheme={settings?.env?.THEME ? settings?.env?.THEME : "light"}>
    <div
      className={cn(
        "w-full h-screen flex fixed top-0 left-0 right-0 bottom-0 flex-col z-50 bg-white dark:bg-black items-center justify-center"
      )}
    >
      <div className="flex relative">
        <div className={styles.page_loader}></div>
        <h3 className="text-sm font-semibold text-body italic absolute top-1/2 -mt-2 w-full text-center">
          Carreg...
        </h3>
      </div>
    </div>
    
  </ThemeProvider>
    
    
    : null}
    </>
   
  );
};

export default PageLoader;
