import Layout from "@components/layout/layout";
import { useSettings } from "@contexts/settings.context";




export default function HelpPage() {
  const settings = useSettings();
  return (

    <section className="max-w-7xl  w-full mx-auto 0 px-5 xl:px-8 2xl:px-14">


 
    
      <div className=" w-full mx-auto">
      
      <div className="bg-gray-100 min-h-full pt-6 pb-8 px-0 lg:p-0">
      <h1 className="text-4xl xl:text-5xl mt-10 pt-5 tracking-tight text-heading font-bold mb-5 xl:mb-8">
          {settings?.site?.title}
        </h1>
        <p className="text-base xl:text-lg text-heading mb-10 xl:mb-14">
        {settings?.site?.subtitle}
        </p>
    <div className="grid grid-cols-2 mt-10 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 gap-3">
      
       <div>
          <article className="product-card cart-type-neon rounded h-full bg-white overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5 p-5">
            {settings?.scheduleType}
           </article>
       </div>
       <div>
          <article className="product-card cart-type-neon rounded h-full bg-white overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5">
          <div className="" style={{background: `url('https://images.unsplash.com/photo-1599458448510-59aecaea4752?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,backgroundSize:'cover',backgroundPosition:'center', opacity: '1', width: '100%', height: '100%' }}></div>
           </article>
       </div>
       <div>
          <article className="product-card cart-type-neon rounded h-full bg-white overflow-hidden shadow-sm transition-all duration-200 hover:shadow transform hover:-translate-y-0.5">
          <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="400" id="gmap_canvas"   src={`https://maps.google.com/maps?q=${settings?.site?.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} scrolling="no" ></iframe></div></div>
           </article>
       </div>
      
    </div>

 </div>
      </div>







    </section>

  );
}

HelpPage.Layout = Layout;
