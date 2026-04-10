import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

const BlogSidebarRight = ({ blogs }) => {
  // Sort blogs by createdAt descending and get top 5, memoized for performance
  const recentBlogs = useMemo(() => {
    if (!blogs || !Array.isArray(blogs)) return [];
    return [...blogs]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [blogs]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="sticky top-0 flex flex-col  ">
      <div className="flex flex-col gap-6 mt-6">
        {recentBlogs.length === 0 ? (
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
            No recent posts.
          </p>
        ) : (
          recentBlogs.map((blog) => (
            <Link
              key={blog.id ?? blog.slug}
              to={`/blogs/${blog.slug}`}
              className="group block transition-colors"
            >
              <h4 className="mb-2 text-sm font-bold text-light-textPrimary line-clamp-2 hover:text-accent-light dark:text-dark-textPrimary dark:hover:text-accent-dark transition-colors">
                {blog.title}
              </h4>
              <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                {formatDate(blog.createdAt)}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogSidebarRight;
