import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  PenTool, 
  List as ListIcon, 
  LayoutList, 
  LogOut,
  Menu,
  X,
  PlusCircle
} from "lucide-react";
import { logout } from "../../services/api";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/auth/signin");
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Create Blog", path: "/admin/create-blog", icon: <PenTool className="w-5 h-5" /> },
    { label: "Manage Blog", path: "/admin/manage-blog", icon: <ListIcon className="w-5 h-5" /> },
    { 
      label: "Manage Category", 
      path: "/admin/category", 
      icon: <LayoutList className="w-5 h-5" />,
      subItems: [
        { label: "Create Category", path: "/admin/category#create", icon: <PlusCircle className="w-4 h-4" /> }
      ]
    },
  ];

  return (
    <div className="flex h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary overflow-hidden w-full">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-bgSecondary border-r border-light-border dark:border-dark-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo / Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-light-border dark:border-dark-border">
            <span className="text-xl font-bold bg-gradient-to-r from-accent-light to-[#0096ff] bg-clip-text text-transparent dark:from-accent-dark dark:to-[#4facfe]">
              Admin Panel
            </span>
            <button 
              className="lg:hidden text-light-textSecondary dark:text-dark-textSecondary"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
            {navItems.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive && !window.location.hash
                        ? "bg-accent-light/10 text-accent-light dark:bg-accent-dark/10 dark:text-accent-dark font-medium"
                        : "text-light-textSecondary hover:bg-light-bgSecondary dark:text-dark-textSecondary dark:hover:bg-dark-bgSecondary/50 hover:text-light-textPrimary dark:hover:text-dark-textPrimary"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
                
                {/* Render sub-items if they exist */}
                {item.subItems && (
                  <div className="ml-8 space-y-1 border-l-2 border-light-border dark:border-dark-border pl-2 my-1">
                    {item.subItems.map((sub, subIdx) => (
                      <NavLink
                        key={subIdx}
                        to={sub.path}
                        className={() =>
                          `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            window.location.hash === "#create"
                              ? "text-accent-light dark:text-accent-dark font-medium bg-accent-light/5 dark:bg-accent-dark/5"
                              : "text-light-textSecondary hover:bg-light-bgSecondary dark:text-dark-textSecondary dark:hover:bg-dark-bgSecondary/50 hover:text-light-textPrimary dark:hover:text-dark-textPrimary"
                          }`
                        }
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {sub.icon}
                        <span>{sub.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer / Logout */}
          <div className="p-4 border-t border-light-border dark:border-dark-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center h-16 px-4 bg-white dark:bg-dark-bgSecondary border-b border-light-border dark:border-dark-border sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-light-textSecondary dark:text-dark-textSecondary rounded-lg hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary/50"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-4 font-bold text-light-textPrimary dark:text-dark-textPrimary">
            Admin Panel
          </span>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
