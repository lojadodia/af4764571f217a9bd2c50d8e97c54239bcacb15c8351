import { useRef } from "react";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import NavLink from "@components/ui/link/nav-link";
import JoinButton from "@components/layout/navbar/join-button";
import { addActiveScroll } from "@utils/add-active-scroll";
import { useUI } from "@contexts/ui.context";
import dynamic from "next/dynamic";
import { ROUTES } from "@utils/routes";
import Link from "@components/ui/link";
const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);
type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const Navbar = () => {
  const navbarRef = useRef() as DivElementRef;
  const { isAuthorize } = useUI();
  addActiveScroll(navbarRef);

  return (
    <header ref={navbarRef} className="site-header h-14 md:h-16 lg:h-22">
      <nav className="h-14 md:h-16 lg:h-22 fixed w-full z-20 bg-white dark:bg-black shadow-sm py-5 px-4 border-b dark:border-neutral-700 lg:px-5 xl:px-8 flex justify-between items-center">
        <Logo className="mx-auto lg:mx-0" /> 
        <ul className="hidden lg:flex items-center space-x-8">
          {/*
        <li key="track-orders">
              <Link
                href={ROUTES.ABOUT}
                className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-primary focus:text-primary"
              >
              Acerca
              </Link>
            </li>
            */}
          {isAuthorize ? (
            <li key="track-orders">
              <Link
                href={ROUTES.ORDERS}
                className="text-heading flex items-center dark:text-white transition duration-200 no-underline hover:text-primary focus:text-primary"
              >
              MEUS PEDIDOS
              </Link>
            </li>
            
          ) : null}
          {siteSettings.headerLinks.map(({ href, label, icon }) => (
            <li key={`${href}${label}`}>
              <NavLink activeClassName="text-primary" href={href}>
                <a className="no-underline flex items-center transition-colors duration-200 hover:text-primary dark:text-white focus:text-primary">
                  {icon && <span className="mr-2">{icon}</span>}
                  {label}
                </a>
              </NavLink>
            </li>
          ))}
          {isAuthorize ? (
            <li>
              <AuthorizedMenu />
            </li>
          ) : (
            <li>
              <JoinButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
