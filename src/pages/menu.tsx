import { useRouter } from "next/router";

import { scroller, Element } from "react-scroll";
import Simple from "@components/layout/simple";
import FeedList from "@components/product/feed-list";
import { useWindowSize } from "@utils/use-window-size";
import { sitePages, PageName } from "@settings/site-pages.settings";
import { getKeyValue } from "@utils/get-key-value";
import React, { useEffect } from "react";
import { useSettings } from "@contexts/settings.context";

export default function Menu({ metadata }: {metadata: object}) {


  
    
  const { query } = useRouter();
  const settings = useSettings();
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
setTimeout(() => {
   document.documentElement.style.setProperty('--bg-gray-100', settings?.site?.bg_color);
}, 1000);
 
  return (
    <>
      <Element
        name="grid"
        className="flex flex-1 border-t border-r border-solid border-theme dark:border-neutral-700 dark:bg-black border-opacity-70">
        <main className="flex-1">
          <FeedList />
        </main>
      </Element>

    </>
  );
}

Menu.Layout = Simple;
