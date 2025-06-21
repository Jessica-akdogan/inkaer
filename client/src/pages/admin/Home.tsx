import {
  CreditCard,
  DollarSign,
  Package,
  Users,
} from "lucide-react";
import { Footer } from "../../components/admin/layouts/footer";
import { useLocation, useNavigate } from "react-router-dom";
import {  useEffect } from "react";


const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openFromSidebar) {
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

 
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          {
            icon: <Package size={26} />,
            title: "Total Events",
           // value: totalEvents.toLocaleString(),
          },
          {
            icon: <DollarSign size={26} />,
            title: "Total Bookings",
           // value: totalBookings.toLocaleString(),
          },
          {
            icon: <Users size={26} />,
            title: "Total Users",
           // value: totalUsers.toLocaleString(),
          },
          {
            icon: <CreditCard size={26} />,
            title: "Total Demo Request",
          // value: totalDemoRequest.toLocaleString(),
          },
        ].map(({ icon, title, //value 

        }, i) => (
          <div className="card" key={i}>
            <div className="card-header">
              <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                {icon}
              </div>
              <p className="card-title">{title}</p>
            </div>
            <div className="card-body bg-slate-100 dark:bg-slate-950">
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
               {/*  {value} */}
              </p>
            </div>
          </div>
        ))}
      </div>
     
     
      <Footer />
    </div>
  );
};

export default DashboardPage;
