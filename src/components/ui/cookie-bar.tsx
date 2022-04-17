import cn from "classnames";
import Link from "@components/ui/link";
import Button from "@components/ui/button";

type CookieBarProps = {
  hide: boolean;
  content?: React.ReactNode;
  btnTitle?: string;
  className?: string;
  onClick: () => void;
};

const CookieBar: React.FC<CookieBarProps> = ({
  hide,
  content,
  btnTitle,
  onClick,
  className,
}) => {
  // hide state style
  const hideClass = hide
    ? "translate-y-full opacity-0"
    : "translate-y-0 opacity-100";

  return (
    <div
      // style={{ '--tw-shadow': '0 -12px 30px -12px rgba(0, 0, 0, 0.1)' }}
      className={cn(
        "fixed bottom-0 left-0 w-full z-50 bg-white shadow-2xl py-5 px-12 flex flex-col sm:flex-row sm:items-center sm:justify-between transform transition-all duration-300 ease-out",
        hideClass,
        className
      )}
    >
      <div className="text-gray-600 mb-4 sm:mb-0 sm:pr-2">{content}</div>
      <Button onClick={onClick}>{btnTitle ? btnTitle : "Accept"}</Button>
    </div>
  );
};

CookieBar.defaultProps = {
  content: (
    <p>
      This site uses cookies to improve your experience. By clicking, you agree
      to our{" "}
      <Link
        href="/privacy-policy"
        className="ml-1 text-gray-800 underline hover:no-underline focus:no-underline focus:outline-black"
      >
        privacy policy
      </Link>
      .
    </p>
  ),
};

export default CookieBar;
