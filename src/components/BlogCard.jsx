import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "lucide-react";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/* ─────────────────────────────────────────────
   GRID CARD  (thumbnail → title → category)
───────────────────────────────────────────── */
const GridCard = ({ blog, index }) => {
  const thumbnail =
    blog.thumbnailUrl ||
    blog.thumbnail ||
    blog.imageUrl ||
    blog.image ||
    blog.coverImage ||
    null;

  const categoryName =
    blog.categoryName ||
    blog.category?.name ||
    (typeof blog.category === "string" ? blog.category : null);

  return (
    <Link
      to={`/blog/${blog.slug ?? ""}`}
      className="group flex flex-col rounded-2xl overflow-hidden
                 bg-light-bgSecondary dark:bg-dark-bgSecondary
                 border border-light-border dark:border-white/8
                 hover:border-light-textTertiary dark:hover:border-white/20
                 shadow-sm hover:shadow-md
                 transition-all duration-300"
      style={{ animation: `blogs-fade-in 0.5s ease-out ${index * 0.06}s both` }}
    >
      {/* ── Thumbnail ── */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-light-border dark:bg-dark-bgSecondary/60">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Gradient placeholder when no image */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
            <svg
              className="w-10 h-10 text-slate-400 dark:text-slate-500 opacity-60"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5a1.5 1.5 0 001.5 1.5z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {/* Date */}
        <p className="text-xs text-light-textTertiary dark:text-dark-textSecondary">
          {formatDate(blog.createdAt)}
        </p>

        {/* Title */}
        <h3
          className="text-base font-bold leading-snug text-light-textPrimary dark:text-dark-textPrimary
                       group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors line-clamp-3"
        >
          {blog.title}
        </h3>

        {/* Category */}
        {categoryName && (
          <div className="mt-auto pt-2 flex items-center gap-1.5 text-xs text-light-textTertiary dark:text-dark-textSecondary">
            <Tag className="w-3 h-3 shrink-0" strokeWidth={2} />
            <span>{categoryName}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

/* ─────────────────────────────────────────────
   LIST ROW  (title | category)
───────────────────────────────────────────── */
const ListRow = ({ blog, index, isFirst }) => {
  const categoryName =
    blog.categoryName ||
    blog.category?.name ||
    (typeof blog.category === "string" ? blog.category : "—");

  return (
    <Link
      to={`/blog/${blog.slug ?? ""}`}
      className="group grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_200px] items-center
                 gap-4 py-5 px-1
                 border-b border-light-border dark:border-white/8
                 transition-colors duration-200"
      style={{
        borderTop: isFirst ? "1px solid" : undefined,
        borderTopColor: isFirst ? undefined : undefined,
        animation: `blogs-fade-in 0.45s ease-out ${index * 0.05}s both`,
      }}
    >
      {/* Title */}
      <h3
        className="text-base font-semibold text-light-textPrimary dark:text-dark-textPrimary
                     group-hover:text-accent-light dark:group-hover:text-accent-dark
                     transition-colors leading-snug line-clamp-2"
      >
        {blog.title}
      </h3>

      {/* Category */}
      <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary whitespace-nowrap text-right sm:text-left">
        {categoryName}
      </span>
    </Link>
  );
};

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
const BlogCard = ({ blog, index = 0, viewMode = "grid" }) => {
  if (viewMode === "list") {
    return <ListRow blog={blog} index={index} isFirst={index === 0} />;
  }
  return <GridCard blog={blog} index={index} />;
};

export default React.memo(BlogCard);
