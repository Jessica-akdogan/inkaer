import { ChartColumn, 
    Home, 
    NotepadText, 
   // Package, 
   // CalendarDays,
    //PackagePlus,
  
     Settings, 
    // ShoppingBag,    
   //  UserCheck,
      UserPlus, 
      Users, 
      NotebookText, MessageCircleQuestion } from "lucide-react";




   
   
      export const data = [
        { name: "Jan", sales: 4000 },
        { name: "Feb", sales: 3000 },
        { name: "Mar", sales: 5000 },
        { name: "Apr", sales: 4000 },
      ];
  



//admin
export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/admin",
                
            },
            {
                label: "Analytics",
                icon: ChartColumn,
                path: "/admin/analytics",
            },
            {
                label: "Reports",
                icon: NotepadText,
                path: "/admin/reports",
            },
        ],
    },  
    {
        title: "Questions",
        links: [
            {
                label: "View Questions",
                icon:    NotebookText,
                path: "/admin/view-interview-question",
            },  
              {
                label: "Add Questions",
                icon: MessageCircleQuestion,
                path: "/admin/add-interview-question",
            }, 
           
            // {
            //     label: "Bookings",
            //     icon: Package,
            //     path: "/admin/view/bookings",
            // },
        ],
    },
    {
        title: "Customers",
        links: [
            {
                label: "Customers",
                icon: Users,
                path: "/admin/view-users",
            },
            {
                label: "Manage Users",
                icon: UserPlus,
                path: "/admin/manage-users",
            },
          
        ],
    },
 
    {
        title: "Settings",
        links: [
            {
                label: "Settings",
                icon: Settings,
                path: "/admin/settings",
            },
        ],
    },
];





