import { FacebookIcon } from "@components/icons/facebook";
import { InstagramIcon } from "@components/icons/instagram";
import { TwitterIcon } from "@components/icons/twitter";
import { YouTubeIcon } from "@components/icons/youtube";
import { ROUTES } from "@utils/routes";
export const siteSettings = {
  name: "",
  description: "",
  logo: {
    url: "/product-placeholder.svg",
    alt: "PickBazar",
    href: "/",
    width: 220,
    height: 40,
  },
  defaultLanguage: "pt",
  currencyCode: "EUR",
  product: {
    placeholderImage: "/product-placeholder.svg",
    cardMaps: {
      home: "Krypton",
      furniture: "Radon",
      bag: "Oganesson",
      makeup: "Neon",
      book: "Xenon",
      medicine: "Helium",
      default: "Argon",
    },
  },
  author: {
    name: "RedQ, Inc.",
    websiteUrl: "https://redq.io",
    address: "115 E 9th St, New York, CA 90079,USA",
    phone: "+971-321-4841-78",
    social: [
      {
        link: "https://www.facebook.com",
        icon: <FacebookIcon width="16px" height="16px" />,
        hoverClass: "text-social-facebook",
      },
      {
        link: "https://www.instagram.com",
        icon: <InstagramIcon width="16px" height="16px" />,
        hoverClass: "text-social-instagram",
      },
      {
        link: "https://www.twitter.com",
        icon: <TwitterIcon width="16px" height="16px" />,
        hoverClass: "text-social-twitter",
      },
      {
        link: "https://www.youtube.com",
        icon: <YouTubeIcon width="16px" height="16px" />,
        hoverClass: "text-social-youtube",
      },
    ],
  },
  headerLinks: [
    //{ href: ROUTES.OFFERS, label: "Promoções", icon: null },
    { href: ROUTES.HELP, label: "Ajuda" },
    { href: ROUTES.CONTACT, label: "Contatos" },
  ],
  authorizedLinks: [
    { href: ROUTES.PROFILE, label: "Perfil" },
    { href: ROUTES.CHECKOUT, label: "Checkout" },
    { href: ROUTES.ORDERS, label: "Meus Pedidos" },
    { href: ROUTES.LOGOUT, label: "Sair" },
  ],
  dashboardSidebarMenu: [
    {
      href: ROUTES.PROFILE,
      label: "Perfil",
    },
    {
      href: ROUTES.CHANGE_PASSWORD,
      label: "Mudar Password",
    },
    {
      href: ROUTES.ORDERS,
      label: "Meus Pedidos",
    },
    {
      href: ROUTES.HELP,
      label: "Precisa de Ajuda?",
    },
    {
      href: ROUTES.LOGOUT,
      label: "Sair",
    },
  ],
  deliverySchedule: [
    {
      id: "1",
      title: "Entrega Expresso",
      description: "Entrega Rápida",
    },
    {
      id: "2",
      title: "8-11",
      description: "8:00 - 11:00",
    },
    {
      id: "3",
      title: "11-14",
      description: "11:00 - 14:00",
    },
    {
      id: "4",
      title: "14-17",
      description: "14:00 - 17:00",
    },
    {
      id: "5",
      title: "17-20",
      description: "17:00 - 20:00",
    },
    {
      id: "6",
      title: "Dia Seguinte",
      description: "Dia Seguinte",
    },
  ],
}
