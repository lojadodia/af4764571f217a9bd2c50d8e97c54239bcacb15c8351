import Footer from "./footer";
import Navbar from "@components/layout/navbar/navbar";
import MobileNavigation from "./mobile-navigation";
import { useEffect } from 'react'
import ReactGA from 'react-ga';
import { useSettings } from "@contexts/settings.context";
import { ThemeProvider } from "next-themes";

const Layout: React.FC = ({ children }) => {
  const settings = useSettings();

  ReactGA.initialize(settings?.env?.GOOGLE_ANALYSTICS);
  useEffect(() => {
    //if (!settings?.env?.settings?.env?.GOOGLE_ANALYSTICS) return
    ReactGA.initialize(settings?.env?.GOOGLE_ANALYSTICS);
    ReactGA.pageview(window.location.pathname + window.location.search);
  
  }, [settings?.env?.GOOGLE_ANALYSTICS]);

  
  return (
    <ThemeProvider attribute="class" forcedTheme={settings?.env?.THEME ? settings?.env?.THEME : "light"}>
        <div className="min-h-screen flex flex-col transition-colors duration-150 bg-gray-100 dark:bg-neutral-900">
          <Navbar /> 
          <div className="flex-grow">{children}</div>
          <MobileNavigation search={false} />
          <div className="flex-grow">
            <div className="flex flex-col max-w-7xl w-full mx-auto py-5 px-5  xl:px-8 2xl:px-14">
              <hr className="border-rgb dark:border-neutral-700"/>
            </div>
          </div>
          <Footer />
        </div>
  </ThemeProvider>
  )
}

export default Layout;
