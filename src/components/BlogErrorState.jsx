import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

const BlogErrorState = ({ error }) => {
  return (
    <div className="flex min-h-[50vh] items-center justify-center py-12">
      <div className="glass rounded-2xl p-8 text-center max-w-md">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500 dark:text-red-400" />

        <h2 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-2">
          Oops! Something went wrong
        </h2>

        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-6">
          {error ||
            "Unable to load the content. Please try again later."}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/blogs"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent-light dark:bg-accent-dark text-white dark:text-black font-medium transition-opacity hover:opacity-90"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogErrorState;
