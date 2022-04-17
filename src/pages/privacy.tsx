import Layout from "@components/layout/layout";
import { useSettings } from "@contexts/settings.context";



export default function PrivacyPage() {

  function nl2br (str: any, is_xhtml : any) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }
  
  const settings = useSettings();
  return (
    <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">

      {/* End of page header */}

      <div className="flex-grow pt-4">
      <div className="flex flex-col md:flex-row max-w-7xl w-full mx-auto 0 px-5 xl:px-8 2xl:px-14">
        <div className=" flex-col py-3  w-full ">
          <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-gray-800 font-bold mb-4 sm:mb-5 2xl:mb-7">
            Política de Privacidade
          </h1>
          <div
            className="text-gray-600 dark:text-neutral leading-loose"
            dangerouslySetInnerHTML={{ __html: nl2br(settings?.license?.privacy, true) }}
          />
        </div>
        </div>
        {/* End of content */}
      </div>
    </section>
  );
}

PrivacyPage.Layout = Layout;
