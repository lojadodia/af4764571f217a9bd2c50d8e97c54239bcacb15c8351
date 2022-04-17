import { useSettings } from "@contexts/settings.context";
import { DefaultSeo } from "next-seo";

const Seo = ({metadata = {}}: {metadata?: object | null}) => {
  const settings: any = useSettings();
  return (
    <DefaultSeo
      //fix IOS input zoom issue
      additionalMetaTags={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0",
        },
      ]}
      title={settings?.siteTitle ?? "Loja do Dia"}
      titleTemplate={`%s${settings?.seo?.metaTitle ?? ""}`}
      description={settings?.seo?.metaDescription || settings?.siteSubtitle}
      canonical={settings?.seo?.canonicalUrl}
      openGraph={{
        title: settings?.seo?.ogTitle,
        description: settings?.seo?.ogDescription,
        type: "website",
        locale: "pt_PT",
        site_name: settings?.siteTitle,
        images: [
          {
            url: settings?.seo?.ogImage?.original,
            width: 800,
            height: 600,
            alt: settings?.seo?.ogTitle,
          },
        ],
      }}
      twitter={{
        handle: settings?.seo?.twitterHandle,
        site: settings?.siteTitle,
        cardType: settings?.seo?.twitterCardType,
      }}
    />
  );
};

export default Seo;
