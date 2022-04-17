import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import cn from "classnames";
import { ExpandLessIcon } from "@components/icons/expand-less-icon";
import { ExpandMoreIcon } from "@components/icons/expand-more-icon";
import { getIcon } from "@utils/get-icon";
import * as CategoryIcons from "@components/icons/category";
import { useUI } from "@contexts/ui.context";
import { useEffect, useState } from "react";

function SidebarMenuItem({ className, item, depth = 0 }: any) {
  const router = useRouter();
  const active = router?.query?.category;
  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      // router.push(href);
      const { query } = router;
      const { type, ...rest } = query;
      router.push(
        {
          pathname: '/',
          query: { ...rest, category: slug },
        },
        {
          pathname: '/',
          query: { ...rest, category: slug },
        },
        {
          scroll: false,
        }
      );
      displaySidebar && closeSidebar();
    }
  }

  
  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <ExpandLessIcon className="w-3 h-3" />
    ) : (
      <ExpandMoreIcon className="w-3 h-3" />
    );
  }

  return (
    <>
      <motion.li
        initial={false}
        //animate={{ backgroundColor: "#ffffff" }}
        onClick={closeSidebar}
        className="py-1 rounded-md dark:bg-black"
      >
        <button
          className={cn(
            "flex dark:bg-black items-center w-full py-2 text-left outline-none text-gray-600 dark:text-neutral font-semibold  focus:outline-none focus:ring-0 focus:text-primary ",
            isOpen ? "text-primary" : "text-gray-600",
            className ? className : "text-lg"
          )}
        >
          {icon && (
            <span className="flex w-10 h-10 mr-4 items-center justify-center">
              {getIcon({
                iconList: CategoryIcons,
                iconName: icon,
                className: "max-h-full max-w-full",
              })}
            </span>
          )}
          <a href={`#${slug}`} className="uppercase">{name}</a>
          {Array.isArray(items) && !!items.length && <span className="ml-auto" onClick={() => setOpen(!isOpen)} >{expandIcon}</span>}

        </button>
      </motion.li>
      <AnimatePresence initial={false}>
        {Array.isArray(items) && isOpen ? (
          <li>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="ml-4 text-xs"
            >
              {items?.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <SidebarMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn("text-sm text-gray-500 ml-5")}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function SidebarMenu({ items, className }: any) {
  return (
    <ul className={cn("text-xs", className)}>
      {items?.map((item: any) => (
        <SidebarMenuItem key={`${item.name}${item.slug}`} item={item} />
      ))}
    </ul>
  );
}

export default SidebarMenu;
