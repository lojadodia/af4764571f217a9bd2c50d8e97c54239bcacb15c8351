export type BannerType = {
  heading: string;
  subheading: string;
  image: string;
};
export interface PageInfo {
  title: string;
  description: string;
  banner: BannerType;
}
export type PageName =
  | "home";

export const sitePages: Record<PageName, PageInfo> = {
  home: {
    title: "Grocery - Loja do dia",
    description: "Grocery Details",
    banner: {
      heading: "Produtos de mercearia entregues em 90 minutos",
      subheading:
        "Receba alimentos e lanches saudáveis entregues em sua porta o dia todo, todos os dias",
      image: "/banner/grocery.png",
    },
  }
};
