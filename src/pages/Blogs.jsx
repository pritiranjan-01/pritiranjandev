import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";
import { useBlogContext } from "../context/BlogContext";
import BlogList from "../components/BlogList";
import BlogErrorState from "../components/BlogErrorState";
import Loading from "../components/Loading";
import BlogLayout from "../components/BlogLayout";

const Blogs = () => {
  const { blogs: allBlogs, loading, error } = useBlogContext();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  // Persist the chosen view mode in localStorage so it survives navigation
  const [viewMode, setViewMode] = useState(
    () => localStorage.getItem("blogViewMode") || "grid",
  );

  const handleViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem("blogViewMode", mode);
  };

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
      {/* ── Header ── */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-4xl font-bold tracking-tight text-light-textPrimary dark:text-dark-textPrimary sm:text-5xl">
          Blogs
        </h3>

        {/* Grid / List toggle */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl
                     bg-light-bgSecondary dark:bg-dark-bgSecondary
                     border border-light-border dark:border-white/10"
        >
          {/* Grid button */}
          <button
            id="blog-view-grid"
            onClick={() => handleViewMode("grid")}
            title="Grid view"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewMode === "grid"
                ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                : "text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-border dark:hover:bg-white/10"
            }`}
          >
            <LayoutGrid className="w-4 h-4" strokeWidth={2} />
            <span className="hidden sm:inline">Grid</span>
          </button>

          {/* List button */}
          <button
            id="blog-view-list"
            onClick={() => handleViewMode("list")}
            title="List view"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewMode === "list"
                ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                : "text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-border dark:hover:bg-white/10"
            }`}
          >
            <List className="w-4 h-4" strokeWidth={2} />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* ── Loading State ── */}
      {loading && <Loading />}

      {/* ── Blog List ── */}
      {!loading && filteredBlogs.length > 0 && (
        <BlogList blogs={filteredBlogs} viewMode={viewMode} />
      )}

      {/* ── Empty / Error State ── */}
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
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </BlogLayout>
  );
};

export default Blogs;
