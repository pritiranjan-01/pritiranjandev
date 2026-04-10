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
      className="block p-5 rounded-xl bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-light-border dark:hover:bg-dark-bgSecondary/80 transition-colors group flex flex-col h-full justify-start gap-2"
      style={{
        animation: `blogs-fade-in 0.5s ease-out ${index * 0.06}s both`,
      }}
    >
      <h3 className="text-lg font-bold text-light-textPrimary dark:text-dark-textPrimary group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors">
        {blog.title}
      </h3>
      <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
        {formatDate(blog.createdAt)}
      </p>
    </Link>
  );
};

export default React.memo(BlogCard);
