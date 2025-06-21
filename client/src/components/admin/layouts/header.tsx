import { Bell, ChevronsLeft,  Search, } from "lucide-react";
import {  useContext, useRef, useState } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import Button from "../../ui/Button";
import { ThemeContext } from "../../../context/ThemeContext";
import ThemeToggle from "../../ui/ThemeToggle";


interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside([profileRef, dropdownRef], () => setDropdownOpen(false));

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
      <div className="flex items-center gap-x-3">
        <Button
          aria-label="toggle collapse"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
        </Button>
        <div className="input">
          <Search size={20} className="text-slate-300" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
          />
        </div>
      </div>
      <div className="flex items-center gap-x-3">
       <ThemeToggle toggleTheme={toggleTheme} theme={theme} /> 
        <Button aria-label="bell icon" >
          <Bell size={20} />
        </Button>

        <div ref={profileRef} className="relative">
          <button
            aria-label="profile"
            //  imgSrc="/images/avatar.png"
            //imgAlt="Profile image"
            //className="size-10 overflow-hidden rounded-full"
            onClick={() => setDropdownOpen((prev) => !prev)} 
                ></button>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg  dark:bg-slate-800"
            >
              <button
              
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
