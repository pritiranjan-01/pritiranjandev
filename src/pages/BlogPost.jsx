import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Linkedin, Twitter, Link as LinkIcon, CheckCircle2, Calendar, Clock } from "lucide-react";
import { getBlogBySlug } from "../services/api";
import BlogErrorState from "../components/BlogErrorState";
import BlogLayout from "../components/BlogLayout";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleBackToBlogs = (e) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/blogs");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`${blog?.title}. Posted By @CuriousRanjan\n\n`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareLinkedIn = () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const url = encodeURIComponent(window.location.href);

    if (isMobile) {
      // LinkedIn Mobile App actively strips text parameters, so we revert to the generic URL share approach
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
    } else {
      // Desktop browsers support pre-filling text via the feed API
      const text = encodeURIComponent(`${blog?.title}\n\n${url}`);
      window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${text}`, "_blank");
    }
  };

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

        // Optimizing SEO: Dynamic browser tab title
        if (res.data?.title) {
          document.title = `${res.data.title} | Pritiranjan Mohanty`;
        }
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
      <BlogLayout>
        <div className="flex min-h-[50vh] items-center justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-light border-t-transparent dark:border-accent-dark" />
        </div>
      </BlogLayout>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <BlogLayout>
        <BlogErrorState error={error} />
      </BlogLayout>
    );
  }

  // Blog post content
  return (
    <BlogLayout activeBlog={blog}>
      <article
        className="h-full w-full"
        style={{ animation: "blogpost-fade-in 0.5s ease-out both" }}
      >
        <button
          onClick={handleBackToBlogs}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-light-textSecondary transition-colors hover:text-accent-light dark:text-dark-textSecondary dark:hover:text-accent-dark cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </button>

        <header className="mb-6 sm:mb-8">
          <h1 className="gradient-text mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
            {blog.title}
          </h1>
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

        <div className="blog-content max-w-none text-light-textSecondary dark:text-dark-textSecondary [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-lg [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:mb-3 [&_ul]:list-inside [&_ul]:list-disc [&_ol]:mb-3 [&_ol]:list-inside [&_ol]:list-decimal [&_a]:text-accent-light [&_a]:underline [&_a]:hover:no-underline dark:[&_a]:text-accent-dark [&_pre]:overflow-x-auto [&_code]:rounded [&_code]:bg-light-bgSecondary [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm dark:[&_code]:bg-dark-bgSecondary [&_blockquote]:border-l-4 [&_blockquote]:border-light-border dark:[&_blockquote]:border-dark-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_table]:w-full [&_table]:my-4 [&_table]:border-collapse [&_th]:border [&_th]:border-light-border dark:[&_th]:border-dark-border [&_th]:px-4 [&_th]:py-2 [&_th]:bg-light-bgSecondary dark:[&_th]:bg-dark-bgSecondary [&_th]:font-semibold [&_td]:border [&_td]:border-light-border dark:[&_td]:border-dark-border [&_td]:px-4 [&_td]:py-2 [&_hr]:my-8 [&_hr]:border-light-border dark:[&_hr]:border-dark-border">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content || ""}</ReactMarkdown>
        </div>

        {/* Share Section */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t lg:border-t-2 border-light-border dark:border-dark-border pt-8 pb-4">
          <p className="font-semibold text-light-textPrimary dark:text-dark-textPrimary">
            Share this article
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={shareTwitter}
              className="flex items-center justify-center rounded-full bg-[#1DA1F2]/10 p-2.5 text-[#1DA1F2] transition-colors hover:bg-[#1DA1F2]/20"
              aria-label="Share on Twitter"
            >
              <Twitter className="h-5 w-5" />
            </button>
            <button
              onClick={shareLinkedIn}
              className="flex items-center justify-center rounded-full bg-[#0A66C2]/10 p-2.5 text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/20"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center rounded-full bg-light-border dark:bg-dark-border p-2.5 text-light-textPrimary dark:text-dark-textPrimary transition-opacity hover:opacity-80"
              aria-label="Copy Link"
            >
              {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <LinkIcon className="h-5 w-5" />}
            </button>
          </div>
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
    </BlogLayout>
  );
};

export default BlogPost;
