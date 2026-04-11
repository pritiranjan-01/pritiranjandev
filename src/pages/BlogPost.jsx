import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
/* Single unified code theme: Atom One Dark.
   Code blocks always use a dark background in BOTH light and dark mode —
   same vivid token colors everywhere, consistent across the whole portfolio. */
import "highlight.js/styles/atom-one-dark.css";
import { useAppContext } from "../context/AppContext";
import {
  ArrowLeft,
  Linkedin,
  Twitter,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react";
import { getBlogBySlug } from "../services/api";
import BlogErrorState from "../components/BlogErrorState";
import BlogLayout from "../components/BlogLayout";

const BlogPost = () => {
  const { isDarkMode } = useAppContext();
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
    const text = encodeURIComponent(
      `${blog?.title}. Posted By @CuriousRanjan\n\n`,
    );
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
    );
  };

  const shareLinkedIn = () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    const url = encodeURIComponent(window.location.href);

    if (isMobile) {
      // LinkedIn Mobile App actively strips text parameters, so we revert to the generic URL share approach
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank",
      );
    } else {
      // Desktop browsers support pre-filling text via the feed API
      const text = encodeURIComponent(`${blog?.title}\n\n${url}`);
      window.open(
        `https://www.linkedin.com/feed/?shareActive=true&text=${text}`,
        "_blank",
      );
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
        setError(err?.body?.message || err?.message || "Post not found");
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
        {/* <button
          onClick={handleBackToBlogs}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-light-textSecondary transition-colors hover:text-accent-light dark:text-dark-textSecondary dark:hover:text-accent-dark cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </button> */}

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

        <div className="markdown-body prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              [rehypeHighlight, { detect: true, ignoreMissing: true }],
              rehypeRaw,
              // Sanitize AFTER rehype-raw to strip <script>, onerror=, javascript:
              // links and other XSS vectors. We merge defaultSchema to also allow
              // className attributes — without this, hljs-* token classes get stripped
              // and all syntax highlighting breaks.
              [
                rehypeSanitize,
                {
                  ...defaultSchema,
                  attributes: {
                    ...defaultSchema.attributes,
                    "*": [
                      ...(defaultSchema.attributes?.["*"] ?? []),
                      "className",
                    ],
                  },
                },
              ],
            ]}
            components={{
              // Headings
              h1: ({ node, ...props }) => (
                <h1
                  className="text-3xl font-bold mt-8 mb-4 text-light-textPrimary dark:text-dark-textPrimary border-b border-light-border dark:border-dark-border pb-2"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-bold mt-8 mb-3 text-light-textPrimary dark:text-dark-textPrimary border-b border-light-border dark:border-dark-border pb-2"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl font-semibold mt-6 mb-3 text-light-textPrimary dark:text-dark-textPrimary"
                  {...props}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  className="text-lg font-semibold mt-5 mb-2 text-light-textPrimary dark:text-dark-textPrimary"
                  {...props}
                />
              ),
              h5: ({ node, ...props }) => (
                <h5
                  className="text-base font-semibold mt-4 mb-2 text-light-textPrimary dark:text-dark-textPrimary"
                  {...props}
                />
              ),
              h6: ({ node, ...props }) => (
                <h6
                  className="text-sm font-semibold mt-4 mb-2 text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wide"
                  {...props}
                />
              ),
              // Paragraph
              p: ({ node, ...props }) => (
                <p
                  className="my-4 leading-7 text-light-textSecondary dark:text-dark-textSecondary"
                  {...props}
                />
              ),
              // Links
              a: ({ node, href, children, ...props }) => (
                <a
                  href={href}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href?.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="text-blue-600 dark:text-blue-400 underline underline-offset-2 decoration-blue-300 dark:decoration-blue-700 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  {...props}
                >
                  {children}
                </a>
              ),
              // Blockquote
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="my-6 border-l-4 border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/30 px-5 py-3 rounded-r-lg text-light-textSecondary dark:text-dark-textSecondary italic"
                  {...props}
                />
              ),
              // Horizontal rule
              hr: ({ node, ...props }) => (
                <hr
                  className="my-8 border-light-border dark:border-dark-border"
                  {...props}
                />
              ),
              // Strong / Bold
              strong: ({ node, ...props }) => (
                <strong
                  className="font-semibold text-light-textPrimary dark:text-dark-textPrimary"
                  {...props}
                />
              ),
              // Emphasis / Italic
              em: ({ node, ...props }) => (
                <em
                  className="italic text-light-textSecondary dark:text-dark-textSecondary"
                  {...props}
                />
              ),
              // Unordered list
              ul: ({ node, ...props }) => (
                <ul
                  className="my-4 ml-6 list-disc space-y-1.5 text-light-textSecondary dark:text-dark-textSecondary"
                  {...props}
                />
              ),
              // Ordered list
              ol: ({ node, ...props }) => (
                <ol
                  className="my-4 ml-6 list-decimal space-y-1.5 text-light-textSecondary dark:text-dark-textSecondary"
                  {...props}
                />
              ),
              // List item
              li: ({ node, ...props }) => (
                <li className="leading-7" {...props} />
              ),
              // Image
              img: ({ node, src, alt, ...props }) => (
                <figure className="my-6">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full rounded-xl border border-light-border dark:border-dark-border shadow-sm object-cover"
                    loading="lazy"
                    {...props}
                  />
                  {alt && (
                    <figcaption className="mt-2 text-center text-xs text-light-textTertiary dark:text-dark-textTertiary">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              ),
              // Table
              table: ({ node, ...props }) => (
                <div className="my-6 overflow-x-auto rounded-xl border border-light-border dark:border-dark-border">
                  <table
                    className="min-w-full divide-y divide-light-border dark:divide-dark-border text-sm"
                    {...props}
                  />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead
                  className="bg-light-bgSecondary dark:bg-dark-bgSecondary"
                  {...props}
                />
              ),
              tbody: ({ node, ...props }) => (
                <tbody
                  className="divide-y divide-light-border dark:divide-dark-border"
                  {...props}
                />
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-4 py-3 text-left font-semibold text-light-textPrimary dark:text-dark-textPrimary"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className="px-4 py-3 text-light-textSecondary dark:text-dark-textSecondary"
                  {...props}
                />
              ),
              // Inline code
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                if (inline) {
                  return (
                    <code className="inline-code" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              // Pre (code block wrapper)
              pre: ({ node, children, ...props }) => (
                <div className="code-block-wrapper">
                  <pre {...props}>{children}</pre>
                </div>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
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
              {copied ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <LinkIcon className="h-5 w-5" />
              )}
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
