import NavbarWithSearch from "@components/layout/navbar/navbar-with-search";
import MobileNavigation from "./mobile-navigation";
import Footer from "./footer";
import {useEffect} from 'react'
import ReactGA from 'react-ga';
import { useSettings } from "@contexts/settings.context";
import Head from 'next/head'
import { ThemeProvider } from "next-themes";
const HomeLayout: React.FC = ({ children }) => {
  const settings = useSettings();

  useEffect(() => {
    //if (!settings?.env?.settings?.env?.GOOGLE_ANALYSTICS) return  
    ReactGA.initialize(settings?.env?.GOOGLE_ANALYSTICS);
    ReactGA.pageview(window.location.pathname + window.location.search);

  }, [settings?.env?.GOOGLE_ANALYSTICS])

  return (
    <ThemeProvider attribute="class" forcedTheme={settings?.env?.THEME ? settings?.env?.THEME : "light"}>
      <div className="flex flex-col min-h-screen transition-colors duration-150">
        <NavbarWithSearch />
        {children}
        <MobileNavigation />
        <Footer />
      </div>
  </ThemeProvider>
  
  )
}

export default HomeLayout;
