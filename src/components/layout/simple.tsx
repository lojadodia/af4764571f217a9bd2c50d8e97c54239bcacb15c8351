import { ThemeProvider } from "next-themes";

const Simple: React.FC = ({ children }) => {
  return (
    <ThemeProvider attribute="class" forcedTheme={"light"}>
        <div className="min-h-screen flex flex-col transition-colors duration-150 bg-gray-100 dark:bg-neutral-900">
          <div className="flex-grow">{children}</div>
        </div>
  </ThemeProvider>
  )
}

export default Simple;
