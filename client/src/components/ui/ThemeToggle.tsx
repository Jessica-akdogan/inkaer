import { FiMoon } from "react-icons/fi";
import { GoSun } from "react-icons/go";

const ThemeToggle = ({ toggleTheme, theme }: { toggleTheme: () => void; theme: string }) => (
    <button
      onClick={toggleTheme}
       className="flex items-center p-2 rounded-full
                   bg-gray-100 dark:bg-gray-300 hover:shadow-md cursor-pointer"
    >
      {theme === "light" ? <FiMoon size={20} /> : <GoSun size={20} />}
    </button>
  );
  export default ThemeToggle;  