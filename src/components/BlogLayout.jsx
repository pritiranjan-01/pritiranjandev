import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Clock, Sun, Moon } from "lucide-react";
import BlogSidebarLeft from "./BlogSidebarLeft";
import BlogSidebarRight from "./BlogSidebarRight";
import { useBlogContext } from "../context/BlogContext";
import { useAppContext } from "../context/AppContext";

const layoutVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const BlogLayout = ({ children, activeBlog }) => {
  const { categories, blogs } = useBlogContext();
  const { isDarkMode, toggleTheme } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isBlogsList =
    location.pathname === "/blogs" || location.pathname === "/blogs/";

  return (
    <div className="flex flex-col min-h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-300">
      {/* Top Header */}
      <header className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-3 bg-light-bgPrimary dark:bg-dark-bgPrimary border-b border-light-border dark:border-white/10">
        {/* Left Side: Back */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-[#9ca3af] hover:text-accent-light dark:hover:text-accent-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {/* Right Side: Recent Posts & Theme Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-light-textPrimary dark:text-dark-textPrimary">
            <Clock className="h-4 w-4" strokeWidth={2} />
            <span className="text-sm font-bold">Recent Posts</span>
          </div>

          <button
            onClick={toggleTheme}
            className="relative inline-flex h-7 w-12 items-center rounded-full bg-light-border dark:bg-light-border transition-colors outline-none border border-transparent"
            aria-label="Toggle dark mode"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white dark:bg-black shadow transition-transform ${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              } flex items-center justify-center`}
            >
              {isDarkMode ? (
                <Moon className="h-3 w-3 text-white dark:text-gray-300" />
              ) : (
                <Sun className="h-3 w-3 text-light-textSecondary" />
              )}
            </span>
          </button>
        </div>
      </header>

      <motion.div
        className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 relative flex flex-col lg:flex-row gap-8 lg:gap-12"
        variants={layoutVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Sidebar (Categories & Author) */}
        <motion.aside
          variants={itemVariants}
          className="w-full lg:w-64 xl:w-72 shrink-0"
        >
          <BlogSidebarLeft
            categories={categories || []}
            activeBlog={activeBlog}
          />
        </motion.aside>

        {/* Main Content Area */}
        <motion.main variants={itemVariants} className="flex-1 min-w-0">
          {children}
        </motion.main>

        {/* Right Sidebar (Recent Posts) */}
        <motion.aside
          variants={itemVariants}
          className="w-full lg:w-72 xl:w-80 shrink-0 hidden lg:block"
        >
          <BlogSidebarRight blogs={blogs || []} />
        </motion.aside>

        {/* Mobile-only recent Posts (Stack at the bottom) */}
        <motion.aside
          variants={itemVariants}
          className="w-full lg:hidden shrink-0 mt-8 border-t border-light-border dark:border-dark-border pt-8"
        >
          <BlogSidebarRight blogs={blogs || []} />
        </motion.aside>
      </motion.div>
    </div>
  );
};

export default BlogLayout;
