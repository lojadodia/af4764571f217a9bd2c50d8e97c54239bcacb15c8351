import Search from "@components/common/search";
import { useUI } from "@contexts/ui.context";
import { BannerType } from "@settings/site-pages.settings";
import { Waypoint } from "react-waypoint";
import cn from "classnames";
import PromotionSlider from "@components/common/promotion-slider";
import { useSettings } from "@contexts/settings.context";
import React, { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@utils/api/endpoints";

type BannerProps = {
  banner: BannerType;
  className?: string;
};

const Banner: React.FC<BannerProps> = ({ className }) => {
  const { showHeaderSearch, hideHeaderSearch } = useUI();
  const onWaypointPositionChange = ({
    currentPosition,
  }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === "above") {
      showHeaderSearch();
    }
  };
  const settings = useSettings();
  const [data,setData] = useState([])
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}${API_ENDPOINTS.BANNER}`) 
    .then((resp) => resp.json())
    .then(function(data) {
      setData(data)
    });
  }, []);

  let promotion_slider = "block";
  if(settings?.site?.banner == 'none' || data.length == 0){
    promotion_slider = "none";
  }

  //min-h-140
  return (
    <div className={cn(" relative  ", className)}>
       <span className="absolute hidden lg:block" style={{background: `url(${settings?.site?.image.original})`,backgroundSize:'cover',backgroundPosition:'center', opacity: (settings?.site?.opacity), width: '100%', height: '100%',top:0 }}></span>
      <div className={`${promotion_slider == 'none' ? ' ' : 'grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-2' } grid  max-w-7xl w-full mx-auto`}>
        <div>
          <div className="py-5 hidden lg:block"></div>
            <div className=" justify-center items-center text-center relative mt-10  hidden lg:block">
            <div className={`${promotion_slider == 'none' ? ' items-center justify-center text-center ' : 'text-left' } hidden lg:block p-5 mt-8  inset-0 w-full flex flex-col  relative`}>
              <h1 className={`${promotion_slider == 'none' ? ' xl:text-5xl' : 'xl:text-4xl' } text-4xl  tracking-tight text-heading dark:text-white  font-bold mb-4 xl:mb-5`}>
                {settings?.site?.title}
              </h1>
              <p className="text-base xl:text-lg text-heading dark:text-white  mb-5 xl:mb-5">
              {settings?.site?.subtitle}
              </p>
              <div className="max-w-3xl mx-auto mb-10 pb-3 pt-3">
                <Search label="grocery search"  />
              </div>

            
              <Waypoint
                onLeave={showHeaderSearch}
                onEnter={hideHeaderSearch}
                onPositionChange={onWaypointPositionChange}
              />
            </div>
            </div>
        </div>
        <div  style={{display: `${promotion_slider}`}}>
        <div className="py-10 hidden lg:block"></div>
          <PromotionSlider slides={data}/>
        </div>
      </div>
      
     

    </div>
  );
};

export default Banner;
