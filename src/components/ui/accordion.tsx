import { useState } from "react";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { MinusIcon } from "@components/icons/minus-icon";
import { PlusIcon } from "@components/icons/plus-icon";
import { heightCollapse } from "@utils/motion/height-collapse";

type CollapseProps = {
  i: number;
  title: string;
  content: string;
  expanded: number;
  setExpanded: any;
};

const Collapse: React.FC<CollapseProps> = ({
  i,
  expanded,
  setExpanded,
  title,
  content,
}) => {
  const isOpen = i === expanded;
  // active state style
  const activeClass = isOpen ? "shadow-sm" : "";

  return (
    <div
      className={cn(
        "border border-solid border-gray-200 bg-white dark:bg-black dark:border-neutral-700 rounded mb-2.5 transition-all hover:border-gray-300",
        activeClass
      )}
    >
      <motion.header
        initial={false}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="py-4 px-5 rounded cursor-pointer flex items-center justify-between transition-colors"
      >
        <h2 className="text-sm md:text-base font-semibold dark:text-gray leading-relaxed text-heading">
          {title}
        </h2>
        {isOpen ? (
          <MinusIcon
            className="flex-shrink-0 stroke-2"
            width={18}
            height={18}
          />
        ) : (
          <PlusIcon className="flex-shrink-0 stroke-2" width={20} height={20} />
        )}
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="from"
            animate="to"
            exit="from"
            variants={heightCollapse()} 
          >
            <div dangerouslySetInnerHTML={{__html: content}} className="md:pt-1 pb-4 px-5 leading-7 dark:text-neutral text-sm md:text-base md:leading-loose text-gray-600"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type AccordionProps = {
  items: {
    title: string;
    description: string;
  }[];
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expanded, setExpanded] = useState<number>(0);

  return (
    <>
      {items.map((item, index) => (
        <Collapse
          i={index}
          key={item.title}
          title={item.title}
          content={item.description}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </>
  );
};

export default Accordion;
