import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useBlogContext } from "../context/BlogContext";
import BlogList from "../components/BlogList";
import BlogErrorState from "../components/BlogErrorState";
import Loading from "../components/Loading";
import BlogLayout from "../components/BlogLayout";

const Blogs = () => {
  const { blogs: allBlogs, loading, error } = useBlogContext();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  // Scroll to top on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 0);
    });
  }, []);

  // Filter blogs based on activeCategory client-side
  const filteredBlogs = useMemo(() => {
    if (!activeCategory) return allBlogs;
    return allBlogs.filter((blog) => {
      return (
        blog.categoryName === activeCategory ||
        blog.categorySlug === activeCategory ||
        blog.category?.name === activeCategory ||
        blog.category?.slug === activeCategory ||
        String(blog.categoryId) === activeCategory ||
        String(blog.category?.id) === activeCategory ||
        String(blog.category) === activeCategory
      );
    });
  }, [allBlogs, activeCategory]);

  return (
    <BlogLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-light-textPrimary dark:text-dark-textPrimary sm:text-5xl">
          Explore
        </h1>
      </div>

      {/* Loading State */}
      {loading && <Loading />}

      {/* Blog List */}
      {!loading && filteredBlogs.length > 0 && (
        <BlogList blogs={filteredBlogs} />
      )}

      {/* Empty State */}
      {!loading && filteredBlogs.length === 0 && (
        <div className="text-center py-12 text-light-textSecondary dark:text-dark-textSecondary">
          {error
            ? "Something went wrong."
            : "No blogs found. Check back later!"}
        </div>
      )}

      <style>{`
        @keyframes blogs-fade-in {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </BlogLayout>
  );
};

export default Blogs;
