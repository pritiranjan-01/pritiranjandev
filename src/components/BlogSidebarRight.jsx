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
      year: "numeric"
    });
  };

  return (
    <div className="sticky top-6">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-accent-light dark:text-accent-dark" />
        <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">
          Recent Posts
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {recentBlogs.length === 0 ? (
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
            No recent posts.
          </p>
        ) : (
          recentBlogs.map((blog) => (
            <Link
              key={blog.id ?? blog.slug}
              to={`/blogs/${blog.slug}`}
              className="group block rounded-lg border border-transparent hover:border-light-border dark:hover:border-dark-border bg-light-bgSecondary/30 p-4 transition-colors dark:bg-dark-bgSecondary/30 hover:bg-light-bgSecondary hover:dark:bg-dark-bgSecondary"
            >
              <h4 className="mb-1 text-sm font-medium text-light-textPrimary line-clamp-2 group-hover:text-accent-light dark:text-dark-textPrimary dark:group-hover:text-accent-dark transition-colors">
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
