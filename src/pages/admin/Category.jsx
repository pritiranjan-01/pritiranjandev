import { useEffect, useState } from "react";
import { Loader, Trash2, Plus, AlertCircle, LayoutList } from "lucide-react";
import { useBlogContext } from "../../context/BlogContext";

const Category = () => {
  const { categories, loading, error: contextError, createCategoryAction, deleteCategoryAction } = useBlogContext();
  const [localError, setLocalError] = useState("");
  const [isDeleting, setIsDeleting] = useState(null);

  // New category form
  const [newCatName, setNewCatName] = useState("");
  const [creating, setCreating] = useState(false);

  const error = localError || contextError;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      setIsDeleting(id);
      await deleteCategoryAction(id);
    } catch (err) {
      alert(err?.message || "Failed to delete category. It might be in use.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleNameChange = (e) => {
    setNewCatName(e.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCatName) return;

    try {
      setCreating(true);
      setLocalError("");
      await createCategoryAction({ name: newCatName });
      setNewCatName("");
    } catch (err) {
      setLocalError(err?.message || "Failed to create category.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
          Manage Categories
        </h1>
        <p className="text-light-textSecondary dark:text-dark-textSecondary mt-1">
          Organize your blog posts with categories.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/20">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <div className="md:col-span-1">
          <form onSubmit={handleCreate} className="bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-4">
              Add New Category
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-light-border bg-light-bgSecondary/60 py-2.5 px-3 text-sm text-light-textPrimary outline-none transition-all focus:border-accent-light focus:bg-white focus:ring-1 focus:ring-accent-light dark:border-dark-border dark:bg-dark-bgSecondary/60 dark:text-dark-textPrimary dark:focus:border-accent-dark dark:focus:bg-black dark:focus:ring-accent-dark"
                  placeholder="e.g. Technology"
                  value={newCatName}
                  onChange={handleNameChange}
                />
              </div>

              <button
                type="submit"
                disabled={creating || !newCatName}
                className="w-full flex justify-center items-center gap-2 rounded-xl bg-accent-light py-2.5 font-semibold text-white shadow-md transition-all hover:bg-accent-lightHover active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed dark:bg-accent-dark dark:text-black dark:hover:bg-accent-darkHover mt-2"
              >
                {creating ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Category
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Categories List */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-light-border dark:border-dark-border bg-light-bgSecondary/50 dark:bg-dark-bgSecondary/50 flex items-center gap-2">
              <LayoutList className="w-5 h-5 text-light-textSecondary dark:text-dark-textSecondary" />
              <h2 className="font-semibold text-light-textPrimary dark:text-dark-textPrimary">
                Existing Categories
              </h2>
            </div>

            <ul className="divide-y divide-light-border dark:divide-dark-border">
              {loading ? (
                <li className="p-8 text-center">
                  <Loader className="w-6 h-6 animate-spin mx-auto text-accent-light dark:text-accent-dark" />
                </li>
              ) : categories.length === 0 ? (
                <li className="p-8 text-center text-light-textSecondary dark:text-dark-textSecondary">
                  No categories found. Create one to get started.
                </li>
              ) : (
                categories.map((cat) => (
                  <li key={cat.id || cat.slug} className="flex items-center justify-between p-4 hover:bg-light-bgSecondary/30 dark:hover:bg-dark-bgSecondary/20 transition-colors">
                    <div>
                      <p className="font-medium text-light-textPrimary dark:text-dark-textPrimary">
                        {cat.name}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(cat.id || cat.slug)}
                      disabled={isDeleting === (cat.id || cat.slug)}
                      className="p-2 text-light-textSecondary hover:text-red-600 dark:text-dark-textSecondary dark:hover:text-red-400 bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-white dark:hover:bg-black rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-900/30 disabled:opacity-50"
                      title="Delete Category"
                    >
                      {isDeleting === (cat.id || cat.slug) ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;