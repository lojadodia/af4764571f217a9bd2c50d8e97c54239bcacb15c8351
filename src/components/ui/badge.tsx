import cn from "classnames";
type BadgeProps = {
  className?: string;
  color?: string;
  textColor?: string;
  text?: string;
};

const Badge: React.FC<BadgeProps> = (props) => {
  const {
    className,
    color: colorOverride,
    textColor: textColorOverride,
    text,
  } = props;

  const classes = {
    root: "px-3 py-1 rounded-full text-sm",
    default: "bg-primary",
    text: "text-white",
  };

  return (
    <span
      className={cn(
        classes.root,
        {
          [classes.default]: !colorOverride,
          [classes.text]: !textColorOverride,
        },
        colorOverride,
        textColorOverride,
        className
      )}
    >
      {text}
    </span>
  );
};

export default Badge;
