import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from '@uidotdev/usehooks';
import { Header } from "../../components/admin/layouts/header";
import { Sidebar } from "../../components/admin/layouts/sidebar";
import useClickOutside from "../../hooks/useClickOutside";
import { cn } from "../../lib/utils";
  
   
const Layout = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 896px)");
  const [collapsed, setCollapsed] = useState<boolean>(() => !isDesktopDevice);

  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useClickOutside([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) {
      setCollapsed(true);
    }
  });

  return (
    <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
      <div
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
          !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30"
        )}
      />
      <Sidebar ref={sidebarRef} collapsed={collapsed} />
      <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;