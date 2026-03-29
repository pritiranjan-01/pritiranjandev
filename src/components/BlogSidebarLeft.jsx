import React from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { FolderOpen, Calendar, Clock, Tag } from "lucide-react";
import logo from "../assets/util/logo.png"; // Use the actual profile picture

const BlogSidebarLeft = ({ categories, activeBlog }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isBlogsList = location.pathname === "/blogs";

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
    <div className="sticky top-6 flex flex-col gap-4">
      {/* Author Section */}
      <div className="flex flex-col items-center text-center">
        <Link to="/blogs" className="group relative mb-4 block h-20 w-20 overflow-hidden rounded-full border-2 border-accent-light dark:border-accent-dark transition-transform hover:scale-105 cursor-pointer">
          <img
            src={logo}
            alt="Pritiranjan Mohanty"
            className="h-full w-full object-contain "
          />
        </Link>
        <h2 className="text-lg font-bold text-light-textPrimary dark:text-dark-textPrimary">
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
          <hr className="border-light-border dark:border-dark-border" />

          {/* Categories Section */}
          <div>
            <div className="mb-4 flex items-center gap-2 px-2">
              <FolderOpen className="h-5 w-5 text-accent-light dark:text-accent-dark" />
              <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
                Categories
              </h3>
            </div>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  to="/blogs"
                  className={`block rounded-lg px-4 py-2 transition-colors duration-200 ${!activeCategory && isBlogsList
                    ? "bg-accent-light/10 text-accent-light dark:bg-accent-dark/10 dark:text-accent-dark font-medium"
                    : "text-light-textSecondary hover:bg-light-bgSecondary hover:text-light-textPrimary dark:text-dark-textSecondary dark:hover:bg-dark-bgSecondary dark:hover:text-dark-textPrimary"
                    }`}
                >
                  All Categories
                </Link>
              </li>
              {categories.map((cat) => {
                const categorySlug = cat.slug ?? cat.name;
                const isActive = activeCategory === categorySlug && isBlogsList;
                return (
                  <li key={cat.id ?? categorySlug}>
                    <Link
                      to={`/blogs?category=${encodeURIComponent(categorySlug)}`}
                      className={`block rounded-lg px-4 py-2 transition-colors duration-200 ${isActive
                        ? "bg-accent-light/10 text-accent-light dark:bg-accent-dark/10 dark:text-accent-dark font-medium"
                        : "text-light-textSecondary hover:bg-light-bgSecondary hover:text-light-textPrimary dark:text-dark-textSecondary dark:hover:bg-dark-bgSecondary dark:hover:text-dark-textPrimary"
                        }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogSidebarLeft;
