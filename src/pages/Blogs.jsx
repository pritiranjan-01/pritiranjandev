import React, { useEffect, useState, useMemo } from "react";
import { useBlogContext } from "../context/BlogContext";
import CategoryFilter from "../components/CategoryFilter";
import BlogList from "../components/BlogList";
import BlogErrorState from "../components/BlogErrorState";
import Loading from "../components/Loading";

const Blogs = () => {
  const { blogs: allBlogs, categories, loading, error } = useBlogContext();
  const [activeCategory, setActiveCategory] = useState(null);

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

  const handleCategoryChange = (categorySlug) => {
    setActiveCategory(categorySlug);
  };

  return (
    <div className="container-custom py-8 sm:py-10 md:py-5">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="gradient-text pb-5 text-3xl font-bold sm:text-4xl md:text-5xl">
          Blogs
        </h1>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Loading State */}
      {loading && <Loading />}

      {/* Blog List */}
      {!loading && filteredBlogs.length > 0 && <BlogList blogs={filteredBlogs} />}

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
    </div>
  );
};

export default Blogs;
