import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loader, Save, ArrowLeft, Image as ImageIcon, FileText, Settings, AlertCircle } from "lucide-react";
import { useBlogContext } from "../../context/BlogContext";
import MarkdownEditor from "../../components/admin/MarkdownEditor";

const CreateBlog = () => {
  const { slug } = useParams();
  const isEditing = Boolean(slug);
  const navigate = useNavigate();

  const { blogs: allBlogs, categories, loading: contextLoading, createBlogAction, updateBlogAction } = useBlogContext();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    categoryId: "",
    thumbnailUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    if (!contextLoading && isEditing) {
      const existingBlog = allBlogs.find((b) => b.slug === slug);
      if (existingBlog) {
        setBlogId(existingBlog.id);

        // The backend provides categorySlug/categoryName, so we find the matching category ID
        const matchedCategory = categories.find(
          (c) => c.name === existingBlog.categoryName
        );
        const resolvedCategoryId = matchedCategory ? matchedCategory.id.toString() : "";

        setFormData({
          title: existingBlog.title || "",
          excerpt: existingBlog.excerpt || "",
          content: existingBlog.content || "",
          categoryId: resolvedCategoryId,
          thumbnailUrl: existingBlog.thumbnailUrl || existingBlog.thumbnailUrl || "",
        });

      } else {
        setError("Blog post not found. It may have been deleted.");
      }
    }
  }, [slug, isEditing, allBlogs, contextLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create nested category object if backend expects it
      // Some Spring backends expect { category: { id: x } }
      const payload = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        thumbnailUrl: formData.thumbnailUrl,
        categoryId: formData.categoryId,
        isPublished: true,

      };

      if (formData.categoryId) {
        // We supply both category nested object and categoryId to satisfy most typical Spring Boot mappings.
        payload.category = { id: formData.categoryId };
        payload.categoryId = formData.categoryId;
      }

      if (isEditing) {
        if (!blogId) throw new Error("Blog ID is missing");
        await updateBlogAction(blogId, payload);
      } else {
        await createBlogAction(payload);
      }

      navigate("/admin/manage-blog");
    } catch (err) {
      setError(err?.message || `Failed to ${isEditing ? "update" : "create"} blog record`);
    } finally {
      setLoading(false);
    }
  };

  if (contextLoading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-light-textSecondary dark:text-dark-textSecondary">
        <Loader className="h-10 w-10 animate-spin text-accent-light dark:text-accent-dark mb-4" />
        <p>Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto min-h-screen">
      <div className="mb-6 sm:mb-8 flex items-start sm:items-center gap-3 sm:gap-4">
        <Link
          to="/admin/manage-blog"
          className="p-2 mt-1 sm:mt-0 flex-shrink-0 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-black text-light-textSecondary hover:text-light-textPrimary dark:text-dark-textSecondary dark:hover:text-dark-textPrimary hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary leading-tight">
            {isEditing ? "Edit Blog Post" : "Create New Post"}
          </h1>
          <p className="text-sm sm:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 leading-snug">
            {isEditing ? `Modifying /${slug}` : "Draft a new interesting article for your portfolio"}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/20">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor Content (2/3 width on LG) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-dark-bgSecondary/40 rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm space-y-5">
            <h2 className="text-xl font-semibold text-light-textPrimary dark:text-dark-textPrimary flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-accent-light dark:text-accent-dark" />
              Content details
            </h2>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">
                Post Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full rounded-xl border border-light-border bg-light-bgSecondary/60 py-3 px-4 text-light-textPrimary outline-none transition-all focus:border-accent-light focus:bg-white focus:ring-1 focus:ring-accent-light dark:border-dark-border dark:bg-dark-bgSecondary/60 dark:text-dark-textPrimary dark:focus:border-accent-dark dark:focus:bg-black dark:focus:ring-accent-dark shadow-sm"
                placeholder="Enter an engaging title..."
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">
                Short Excerpt
              </label>
              <textarea
                name="excerpt"
                rows="3"
                className="w-full hidden-scrollbar resize-none rounded-xl border border-light-border bg-light-bgSecondary/60 py-3 px-4 text-light-textPrimary outline-none transition-all focus:border-accent-light focus:bg-white focus:ring-1 focus:ring-accent-light dark:border-dark-border dark:bg-dark-bgSecondary/60 dark:text-dark-textPrimary dark:focus:border-accent-dark dark:focus:bg-black dark:focus:ring-accent-dark shadow-sm"
                placeholder="A brief summary of your post..."
                value={formData.excerpt}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">
                Main Content (Markdown supported)
              </label>

              <MarkdownEditor 
                value={formData.content} 
                onChange={(val) => setFormData(prev => ({ ...prev, content: val || "" }))} 
                placeholder="Write your amazing post here..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings (1/3 width on LG) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-dark-bgSecondary/40 rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm space-y-5">
            <h2 className="text-xl font-semibold text-light-textPrimary dark:text-dark-textPrimary flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-accent-light dark:text-accent-dark" />
              Settings
            </h2>

            {/* Slug field removed */}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">
                Category
              </label>
              <select
                name="categoryId"
                className="w-full appearance-none rounded-xl border border-light-border bg-light-bgSecondary/60 py-3 px-4 text-light-textPrimary outline-none transition-all focus:border-accent-light focus:bg-white focus:ring-1 focus:ring-accent-light dark:border-dark-border dark:bg-dark-bgSecondary/60 dark:text-dark-textPrimary dark:focus:border-accent-dark dark:focus:bg-black dark:focus:ring-accent-dark shadow-sm"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Cover Image URL
              </label>
              <input
                type="url"
                name="thumbnailUrl"
                className="w-full rounded-xl border border-light-border bg-light-bgSecondary/60 py-3 px-4 text-light-textPrimary outline-none transition-all focus:border-accent-light focus:bg-white focus:ring-1 focus:ring-accent-light dark:border-dark-border dark:bg-dark-bgSecondary/60 dark:text-dark-textPrimary dark:focus:border-accent-dark dark:focus:bg-black dark:focus:ring-accent-dark shadow-sm"
                placeholder="https://example.com/image.png"
                value={formData.thumbnailUrl}
                onChange={handleChange}
              />
            </div>
            {formData.thumbnailUrl && (
              <div className="mt-3 overflow-hidden rounded-xl border border-light-border dark:border-dark-border">
                <img
                  src={formData.thumbnailUrl}
                  alt="Cover preview"
                  className="w-full h-32 object-cover"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex justify-center items-center gap-2 rounded-xl bg-accent-light py-4 font-semibold tracking-wide text-white shadow-lg transition-all hover:bg-accent-lightHover hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed dark:bg-accent-dark dark:text-black dark:hover:bg-accent-darkHover"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? "Save Changes" : "Publish Post"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;