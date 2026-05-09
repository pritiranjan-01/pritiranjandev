import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs, viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <div className="w-full">
        {/* Column Header */}
        <div
          className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_200px]
                      gap-4 pb-2 px-1
                      border-b border-light-border dark:border-white/10"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-light-textTertiary dark:text-dark-textSecondary">
            Title
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-light-textTertiary dark:text-dark-textSecondary text-right sm:text-left">
            Category
          </span>
        </div>

        {blogs.map((blog, index) => (
          <BlogCard
            key={blog.id ?? blog.slug ?? blog.title}
            blog={blog}
            index={index}
            viewMode="list"
          />
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog.id ?? blog.slug ?? blog.title}
          blog={blog}
          index={index}
          viewMode="grid"
        />
      ))}
    </div>
  );
};

export default React.memo(BlogList);
