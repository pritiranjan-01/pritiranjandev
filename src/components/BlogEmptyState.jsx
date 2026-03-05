import React from "react";

const BlogEmptyState = () => {
  return (
    <div className="glass flex min-h-[40vh] flex-col items-center justify-center rounded-2xl p-8 text-center">
      <p className="text-light-textSecondary dark:text-dark-textSecondary">
        No posts yet. Check back later.
      </p>
    </div>
  );
};

export default BlogEmptyState;
