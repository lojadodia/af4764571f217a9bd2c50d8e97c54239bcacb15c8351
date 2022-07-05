import { useState, useEffect } from "react";
import cn from "classnames";
import { CloseIcon } from "@components/icons/close-icon";
import { PencilIcon } from "@components/icons/pencil-icon";
import { PlusIcon } from "@components/icons/plus-icon";
import { formatAddress } from "@utils/format-address";

interface ICardItem {
  id: string | number;
  title: string;
  description: string;
  address?: any;
  // default: boolean;
}
interface Props {
  count?: number;
  heading: string;
  addActionText?: string;
  items: ICardItem[] | undefined;
  onSelect: (item: any) => void;
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const SectionWithCardGroup = ({
  count,
  heading,
  addActionText,
  items,
  onAdd,
  onEdit,
  onDelete,
  onSelect,
}: Props) => {
  const [selected, setSelected] = useState(items?.length ? 0 : -1);
  function select(item: any, idx: number) {
    setSelected(idx);
    onSelect(item);
  }

  useEffect(() => {
    if (!!items?.length) {
      setSelected(0)
      onSelect(items[0]);
    }
   
  }, [items?.length])
 
  return (
    <>
      <div className="flex items-center justify-between mb-5 md:mb-8">
        <div className="flex items-center space-x-3 md:space-x-4">
          {count && (
            <span className="rounded-full w-8 h-8 bg-primary flex items-center justify-center text-base lg:text-xl text-white">
              {count}
            </span>
          )}
          <p className="text-lg lg:text-xl uppercase font-semibold text-heading dark:text-white">
            {heading}
          </p>
        </div>
        {onAdd && (
          <button
            className="flex items-center text-sm font-semibold text-primary transition-colors duration-200 focus:outline-none "
            onClick={onAdd}
          >
            <PlusIcon className="w-4 h-4 stroke-2 mr-0.5" /> Adicionar {" "}
            <span className="hidden sm:inline-block sm:ml-1">
              {addActionText}
            </span>
          </button>
        )}
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items?.length ? (
          items?.map((item, idx) => (
            <div
              key={item.id}
              className={cn(
                "relative p-4 rounded border cursor-pointer group hover:border-primary",
                {
                  "border-primary shadow-sm": selected === idx,
                  "bg-gray-100 dark:bg-neutral-800 border-transparent": selected !== idx,
                }
              )}
              onClick={() => select(item, idx)}
            >
              <p className="text-sm text-heading font-semibold dark:text-neutral mb-3 capitalize">
                {item.title}
              </p>
              <p className="text-sm text-gray-700 dark:text-neutral">
                {item.description ? item.description : formatAddress(item.address)}                  
              </p>
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100">
                {onEdit && (
                  <button
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white"
                    onClick={() => onEdit(item)}
                  >
                    <span className="sr-only">Editar</span>
                    <PencilIcon className="w-3 h-3" />
                  </button>
                )}
                {onDelete && (
                  <button
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white"
                    onClick={() => onDelete(item)}
                  >
                    <span className="sr-only">Excluir</span>
                    <CloseIcon className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (

       
          <div onClick={onAdd} className="relative px-5 py-6 text-body dark:text-gray text-center bg-gray-100 dark:border-neutral-700 rounded border border-gray-200">
              Nenhum endereço encontrado
          </div>
        )}
      </div>
    </>
  );
};

export default SectionWithCardGroup;
