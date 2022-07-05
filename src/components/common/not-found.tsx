import cn from "classnames";
import { NotFoundIcon } from "../icons/not-found";
import { useSettings } from "@contexts/settings.context";

interface Props {
  text?: string;
  className?: string;
}

const NotFound: React.FC<Props> = (props) => {
  const settings = useSettings();
  return (
    <div className={cn("flex flex-col items-center", props.className)}>
      <div className="w-full h-full flex items-center justify-center">
        {/* <NotFoundIcon color={settings?.site?.color}/> */}
      </div>
      <h3 className="w-full text-center text-xl font-semibold text-body my-7">
        {props.text}
      </h3>
    </div>
  );
};

export default NotFound;
