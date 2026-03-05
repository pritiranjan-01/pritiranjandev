import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const BlogCard = ({ blog, index = 0 }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
  };

  function isNewPost(createdAt) {
    const postDate = new Date(createdAt);
    const now = new Date();

    const diffDays = (now - postDate) / (1000 * 60 * 60 * 24);

    return diffDays <= 5; // Consider new if created within the last 5 days
  }

  return (
    <Link
      to={`/blogs/${blog.slug ?? ""}`}
      className="block p-3 sm:p-4 rounded-lg bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-light-border dark:hover:bg-dark-border transition-colors group"
      style={{
        animation: `blogs-fade-in 0.5s ease-out ${index * 0.06}s both`,
      }}
    >
      <h3 className="flex items-center gap-2 text-base sm:text-lg font-medium text-light-textPrimary dark:text-dark-textPrimary group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
        {blog.title}
        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isNewPost(blog.createdAt) && (
          <span className="rounded-full bg-accent-light px-2 py-0.5 text-xs font-semibold text-white dark:bg-accent-dark dark:text-black ">
            New
          </span>
        )}
      </h3>
      <p className="mt-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
        {formatDate(blog.createdAt)}
      </p>
    </Link>
  );
};

export default React.memo(BlogCard);
