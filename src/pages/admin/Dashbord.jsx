import { Link, useNavigate } from "react-router-dom";
import { PenTool, List, LayoutList, LogOut, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { logout } from "../../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/auth/signin");
  };

  const menuItems = [
    {
      title: "Create Blog",
      description: "Write a new blog post for your portfolio.",
      icon: <PenTool className="w-8 h-8 text-accent-light dark:text-accent-dark" />,
      link: "/admin/create-blog",
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Manage Blogs",
      description: "Edit, delete, and view your existing blog posts.",
      icon: <List className="w-8 h-8 text-accent-light dark:text-accent-dark" />,
      link: "/admin/manage-blog",
      color: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Categories",
      description: "Manage categories used to organize your blogs.",
      icon: <LayoutList className="w-8 h-8 text-accent-light dark:text-accent-dark" />,
      link: "/admin/category",
      color: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto min-h-screen">
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 sm:gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-accent-light/10 dark:bg-accent-dark/10 rounded-xl flex-shrink-0">
            <LayoutDashboard className="w-6 h-6 sm:w-8 sm:h-8 text-accent-light dark:text-accent-dark" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary leading-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base text-light-textSecondary dark:text-dark-textSecondary mt-0.5 sm:mt-1">
              Welcome back! Manage your portfolio content from here.
            </p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 w-full sm:w-auto justify-center sm:justify-start bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-medium rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors text-sm sm:text-base"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          Sign Out
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link
              to={item.link}
              className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border hover:border-accent-light dark:hover:border-accent-dark hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className={`p-4 rounded-xl w-fit mb-6 transition-transform group-hover:scale-110 ${item.color}`}>
                {item.icon}
              </div>
              <h2 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-2">
                {item.title}
              </h2>
              <p className="text-light-textSecondary dark:text-dark-textSecondary flex-1">
                {item.description}
              </p>
              
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                <svg className="w-6 h-6 text-accent-light dark:text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;