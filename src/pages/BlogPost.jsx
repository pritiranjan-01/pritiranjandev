import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug } from "../services/api";
import BlogErrorState from "../components/BlogErrorState";

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
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

  // Fetch blog post from API
  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getBlogBySlug(slug);
        setBlog(res.data);
      } catch (err) {
        setError(
          err?.body?.message || err?.message || "Post not found",
        );
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate read time
  const calculateReadTime = (content) => {
    if (!content) return 0;
    const words = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / 200); // 200 words per minute
    return Math.max(1, readTime); // Minimum 1 minute
  };

  // Loading state
  if (loading) {
    return (
      <div className="container-custom flex min-h-[50vh] items-center justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-DEFAULT border-t-transparent dark:border-accent-dark" />
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return <BlogErrorState error={error} />;
  }

  // Blog post content
  return (
    <>
      <article
        className="container-custom py-8 sm:py-10 md:py-12"
        style={{ animation: "blogpost-fade-in 0.5s ease-out both" }}
      >
        <Link
          to="/blogs"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-light-textSecondary transition-colors hover:text-accent-light dark:text-dark-textSecondary dark:hover:text-accent-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </Link>

        <header className="mb-6 sm:mb-8">
          <h1 className="gradient-text mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
            {blog.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
            <span className="font-medium">
              {calculateReadTime(blog.content)} min read
            </span>
            <span>·</span>
            <span>{formatDate(blog.createdAt)}</span>
            <span>·</span>
            <span className="rounded-full px-2 py-1 bg-gray-500 text-white">{blog.categoryName}</span>
          </div>
        </header>

        {blog.thumbnailUrl && (
          <div className="mb-8 overflow-hidden rounded-2xl bg-light-bgSecondary dark:bg-dark-bgSecondary">
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="blog-content max-w-none text-light-textSecondary dark:text-dark-textSecondary [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:mb-3 [&_ul]:list-inside [&_ul]:list-disc [&_ol]:mb-3 [&_ol]:list-inside [&_ol]:list-decimal [&_a]:text-accent-light [&_a]:underline [&_a]:hover:no-underline dark:[&_a]:text-accent-dark [&_pre]:overflow-x-auto [&_code]:rounded [&_code]:bg-light-bgSecondary [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm dark:[&_code]:bg-dark-bgSecondary">
          <ReactMarkdown>{blog.content || ""}</ReactMarkdown>
        </div>
      </article>

      <style>{`
        @keyframes blogpost-fade-in {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default BlogPost;
