import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../../../constants";
import { cn } from "../../../lib/utils";
import '../styles/layout/sidebar.scss'


export interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed = false }, ref) => {
    //const { bgBtn } = useColor();

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
      () => Object.fromEntries(navbarLinks.map((link) => [link.title, true]))
    );

    const toggleSection = (title: string) => {
      setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    return (
      <aside
        ref={ref}
        className={cn(
          "sidebar",
          collapsed ? "sidebar--collapsed" : ""
        )}
      >
        <div className="sidebar__logo">
          {collapsed ? (
            <img src="/logo128.png" alt="Logo" className="sidebar__logo-img" />
          ) : (
            <>
              <img
                src="/images/logo/logo-blk.png"
                alt="Logo Light"
                className="sidebar__logo-img sidebar__logo-img--light"
              />
              <img
                src="/images/logo/logo-wte.png"
                alt="Logo Dark"
                className="sidebar__logo-img sidebar__logo-img--dark"
              />
            </>
          )}
        </div>

        <div className="sidebar__nav">
          {navbarLinks.map((group) => {
            const isOpen = openSections[group.title];

            return (
              <nav key={group.title} className="sidebar__group">
                <p
                  className="sidebar__group-title"
                  onClick={() => toggleSection(group.title)}
                >
                  {group.title}
                </p>
                {isOpen &&
                  group.links.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      end={link.path === "/admin"}
                      state={
                        link.label === "Dashboard"
                          ? { openFromSidebar: true }
                          : undefined
                      }
                      className={({ isActive }) =>
                        cn(
                          "sidebar__item",
                          isActive && `bg-blue-600 sidebar__item--active`,
                          collapsed && "sidebar__item--collapsed"
                        )
                      }
                    >
                      <link.icon size={22} className="sidebar__icon" />
                      {!collapsed && (
                        <p className="sidebar__label">{link.label}</p>
                      )}
                    </NavLink>
                  ))}
              </nav>
            );
          })}
        </div>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";
export default Sidebar;