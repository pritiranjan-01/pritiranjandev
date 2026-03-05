import React, { useEffect, useState } from "react";
import {
  getBlogs,
  getBlogsByCategory,
  getCategories,
} from "../services/api";
import CategoryFilter from "../components/CategoryFilter";
import BlogList from "../components/BlogList";
import BlogErrorState from "../components/BlogErrorState";

const Blogs = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 0);
    });
  }, []);

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch {
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  // Fetch blogs from API
  const fetchBlogs = async (categorySlug) => {
    setLoading(true);
    setError(null);
    try {
      const res = categorySlug
        ? await getBlogsByCategory(categorySlug, {
            sortBy: "createdAt",
            direction: "desc",
          })
        : await getBlogs({
            sortBy: "createdAt",
            direction: "desc",
          });
      setBlogs(res.data);
    } catch (err) {
      setError(
        err?.body?.message || err?.message || "Failed to load blogs",
      );
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs when category changes
  useEffect(() => {
    fetchBlogs(activeCategory);
  }, [activeCategory]);

  // Handle category filter
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
      {loading && (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-DEFAULT border-t-transparent dark:border-accent-dark" />
        </div>
      )}

      {/* Blog List */}
      {!loading && blogs.length > 0 && <BlogList blogs={blogs} />}

      {/* Empty State */}
      {!loading && blogs.length === 0 && (
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
