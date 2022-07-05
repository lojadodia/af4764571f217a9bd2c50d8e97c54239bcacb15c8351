import { useState } from "react";

type ReadMoreProps = {
  more?: string;
  less?: string;
  character: number;
  children: any;
};

const ReadMore: React.FC<ReadMoreProps> = ({
  children,
  more,
  less,
  character,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleLines = (event: any) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  if (!children) return null;

  return (
    <>
      {(children && children.length < character) || expanded
        ? children
        : children.substring(0, character)}
      {children && children.length > character && !expanded && (
        <>
          <br />
          <span>
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: "#009e7f", fontWeight: 700 }}
            >
              {more}
            </a>
          </span>
        </>
      )}
      {children && children.length > character && expanded && (
        <>
          <br />
          <span>
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: "#009e7f", fontWeight: 700 }}
            >
              {less}
            </a>
          </span>
        </>
      )}
    </>
  );
};

ReadMore.defaultProps = {
  character: 150,
  more: "Ler mais",
  less: "less",
};

export default ReadMore;
