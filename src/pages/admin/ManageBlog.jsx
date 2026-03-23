import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Edit, Trash2, Plus, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useBlogContext } from "../../context/BlogContext";

const ManageBlog = () => {
  const { blogs: allBlogs, loading, error, deleteBlogAction } = useBlogContext();
  const [page, setPage] = useState(0);
  const [isDeleting, setIsDeleting] = useState(null);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(allBlogs.length / pageSize));


  // Make sure page doesn't exceed totalPages
  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [totalPages, page]);

  const validPage = Math.max(0, Math.min(page, totalPages - 1));
  const blogs = allBlogs.slice(validPage * pageSize, (validPage + 1) * pageSize);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      setIsDeleting(id);
      await deleteBlogAction(id);
    } catch (err) {
      alert(err?.message || "Failed to delete the blog.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
            Manage Blogs
          </h1>
          <p className="text-light-textSecondary dark:text-dark-textSecondary mt-1">
            Create, edit, and manage your portfolio blog posts.
          </p>
        </div>
        <Link
          to="/admin/create-blog"
          className="flex items-center gap-2 px-4 py-2 bg-accent-light dark:bg-accent-dark text-white dark:text-black font-semibold rounded-xl hover:bg-accent-lightHover dark:hover:bg-accent-darkHover transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Create New Post
        </Link>
      </div>

      {error ? (
        <div className="flex items-center gap-2 p-4 mb-6 text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/20">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      ) : null}

      <div className="bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-light-bgSecondary dark:bg-dark-bgSecondary/60 border-b border-light-border dark:border-dark-border">
                <th className="px-6 py-4 font-semibold text-sm text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 font-semibold text-sm text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 font-semibold text-sm text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-4 font-semibold text-sm text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">
                  Updated At
                </th>
                <th className="px-6 py-4 font-semibold text-sm text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <Loader className="w-8 h-8 animate-spin mx-auto text-accent-light dark:text-accent-dark" />
                    <p className="text-light-textSecondary dark:text-dark-textSecondary mt-2">
                      Loading blogs...
                    </p>
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-light-textSecondary dark:text-dark-textSecondary">
                    No blogs found. Start by creating a new post!
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-light-bgSecondary/50 dark:hover:bg-dark-bgSecondary/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/blogs/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-light-textPrimary hover:text-accent-light dark:text-dark-textPrimary dark:hover:text-accent-dark transition-colors line-clamp-1"
                      >
                        {blog.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-light-bgSecondary dark:bg-dark-bgSecondary text-light-textSecondary dark:text-dark-textSecondary border border-light-border dark:border-dark-border">
                        {blog.categoryName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                      {blog.updatedAt
                        ? new Date(blog.updatedAt).toLocaleDateString()
                        : "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/edit-blog/${blog.slug}`}
                          className="p-2 text-light-textSecondary hover:text-accent-light dark:text-dark-textSecondary dark:hover:text-accent-dark bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-white dark:hover:bg-black rounded-lg transition-colors border border-transparent hover:border-light-border dark:hover:border-dark-border"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          disabled={isDeleting === blog.id}
                          className="p-2 text-light-textSecondary hover:text-red-600 dark:text-dark-textSecondary dark:hover:text-red-400 bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-white dark:hover:bg-black rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-900/30 disabled:opacity-50"
                          title="Delete"
                        >
                          {isDeleting === blog.id ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-light-border dark:border-dark-border bg-light-bgSecondary/30 dark:bg-dark-bgSecondary/20">
            <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              Page <span className="font-medium text-light-textPrimary dark:text-dark-textPrimary">{page + 1}</span> of{" "}
              <span className="font-medium text-light-textPrimary dark:text-dark-textPrimary">{totalPages}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-black text-light-textPrimary dark:text-dark-textPrimary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="p-2 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-black text-light-textPrimary dark:text-dark-textPrimary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBlog;