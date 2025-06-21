import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../../../constants";


export interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(({ collapsed = false }, ref) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(navbarLinks.map(link => [link.title, true]))
  );

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      ref={ref}
      className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}
    >
      <div className="sidebar__logo">
        {collapsed ? (
          <img
            src="/logo128.png"
            alt="Logo Collapsed"
            className="sidebar__logo-img"
            loading="lazy"
          />
        ) : (
          <>
            <img
              src="/images/logo/logo-blk.png"
              alt="Logo Light"
              className="sidebar__logo-img sidebar__logo-img--light"
              loading="lazy"
            />
            <img
              src="/images/logo/logo-wte.png"
              alt="Logo Dark"
              className="sidebar__logo-img sidebar__logo-img--dark"
              loading="lazy"
            />
          </>
        )}
      </div>

      <div className="sidebar__content">
        {navbarLinks.map((navbarLink) => {
          const isOpen = openSections[navbarLink.title];

          return (
            <nav key={navbarLink.title} className="sidebar__group">
              <p
                className="sidebar__group-title"
                onClick={() => toggleSection(navbarLink.title)}
              >
                {navbarLink.title}
              </p>

              {isOpen && navbarLink.links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  state={link.label === "Dashboard" ? { openFromSidebar: true } : undefined}
                  end={link.path === "/admin"}
                  className={({ isActive }) =>
                    `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
                  }
                >
                  <link.icon size={22} className="sidebar__icon" />
                  {!collapsed && <p className="sidebar__label">{link.label}</p>}
                </NavLink>
              ))}
            </nav>
          );
        })}
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";
