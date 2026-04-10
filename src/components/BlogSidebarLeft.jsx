import React from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { FolderOpen, ArrowLeft } from "lucide-react";
import logo from "../assets/util/logo.png";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const BlogSidebarLeft = ({ categories, activeBlog }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  // Handle both /blogs and /blogs/ cases
  const isBlogsList = location.pathname === "/blogs" || location.pathname === "/blogs/";

  // If we are on the blog list, use the search param. Otherwise, no category is active.
  const activeCategory = isBlogsList ? searchParams.get("category") : null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return 0;
    const words = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / 200);
    return Math.max(1, readTime);
  };

  return (
    <div className="sticky top-6 flex flex-col gap-6">
      {/* Back Button */}
      {isBlogsList && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="hidden group w-full max-w-fit items-center gap-2 bg-light-bgSecondary/50 text-md font-medium text-light-textSecondary transition-all hover:bg-light-bgSecondary hover:text-accent-light dark:bg-dark-bgSecondary/50 dark:text-dark-textSecondary dark:hover:bg-dark-bgSecondary dark:hover:text-accent-dark cursor-pointer rounded-lg px-2 py-1"
        >
          <ArrowLeft className="h-6 w-8 transition-transform group-hover:-translate-x-1" />
        </button>
      )}

      {/* Author Section */}
      <div className="flex flex-col items-center text-center mt-2">
        <Link to="/blogs" className="group relative mb-4 block h-20 w-20 overflow-hidden rounded-full border-2 border-accent-light dark:border-accent-dark transition-transform hover:scale-105 cursor-pointer">
          <img
            src={logo}
            alt="Pritiranjan Mohanty"
            className="h-full w-full object-contain"
          />
        </Link>
        <h2 className="text-sm font-bold text-light-textPrimary dark:text-dark-textPrimary">
          Pritiranjan Mohanty
        </h2>
      </div>

      {/* Post Metadata (Only when reading a blog) */}
      {!isBlogsList && activeBlog && (
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 py-2 px-4 rounded-xl bg-light-bgSecondary/40 dark:bg-dark-bgSecondary/40">
          <div className="flex items-center gap-3 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
            <span>{formatDate(activeBlog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">
            <span>{calculateReadTime(activeBlog.content)} min read</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mt-1">
            <Link
              to={`/blogs?category=${encodeURIComponent(activeBlog.categorySlug || activeBlog.categoryName)}`}
              className="text-m font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors  hover:no-underline"
            >
              {activeBlog.categoryName}
            </Link>
          </div>
        </div>
      )}

      {isBlogsList && (
        <>
          {/* Categories Section */}
          <div className="mt-4">
            <div className="mb-4 flex items-center gap-2 px-2 text-light-textSecondary dark:text-dark-textSecondary opacity-70">
              <FolderOpen className="h-4 w-4" strokeWidth={2} />
              <h3 className="text-xs font-bold tracking-wider uppercase">
                Categories
              </h3>
            </div>
            <motion.ul 
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="flex overflow-x-auto px-2 pb-3 gap-2 lg:gap-1 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <motion.li variants={itemVariants}>
                <Link
                  to="/blogs"
                  className={`block whitespace-nowrap rounded-full lg:rounded-lg px-4 py-1.5 lg:py-2 text-sm transition-colors duration-200 border lg:border-transparent ${!activeCategory && isBlogsList
                    ? "bg-black text-white dark:bg-white dark:text-black font-semibold border-black dark:border-white"
                    : "text-light-textSecondary hover:bg-light-bgSecondary/50 hover:text-light-textPrimary dark:text-dark-textSecondary dark:hover:bg-dark-bgSecondary/50 dark:hover:text-dark-textPrimary border-light-border dark:border-dark-border"
                    }`}
                >
                  All Categories
                </Link>
              </motion.li>
              {categories.map((cat) => {
                const categorySlug = cat.slug ?? cat.name;
                const isActive = activeCategory === categorySlug && isBlogsList;
                return (
                  <motion.li key={cat.id ?? categorySlug} variants={itemVariants}>
                    <Link
                      to={`/blogs?category=${encodeURIComponent(categorySlug)}`}
                      className={`block whitespace-nowrap rounded-full lg:rounded-lg px-4 py-1.5 lg:py-2 text-sm transition-colors duration-200 border lg:border-transparent ${isActive
                        ? "bg-black text-white dark:bg-white dark:text-black font-semibold border-black dark:border-white"
                        : "text-light-textSecondary hover:bg-light-bgSecondary/50 hover:text-light-textPrimary dark:text-dark-textSecondary dark:hover:bg-dark-bgSecondary/50 dark:hover:text-dark-textPrimary border-light-border dark:border-dark-border"
                        }`}
                    >
                      {cat.name}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogSidebarLeft;
