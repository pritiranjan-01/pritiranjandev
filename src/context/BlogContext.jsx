import { createContext, useState, useEffect, useContext } from "react";
import {
  getBlogs,
  getCategories,
  createBlog,
  updateBlog,
  deleteBlog,
  createCategory,
  deleteCategory,
} from "../services/api";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch a large number of blogs to hold in context (acting as our global store)
      // and fetch all categories.
      const [blogsRes, categoriesRes] = await Promise.all([
        getBlogs({ page: 0, size: 1000, sortBy: "createdAt", direction: "desc" }),
        getCategories(),
      ]);

      // Extract arrays based on potential API wrappers
      const extractedBlogs = blogsRes.data || [];
      const extractedCategories = categoriesRes.data || [];

      setBlogs(extractedBlogs);
      setCategories(extractedCategories);
    } catch (err) {
      setError(err?.message || "Failed to load blog data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const createBlogAction = async (payload) => {
    const res = await createBlog(payload);
    const newBlog = res.data;
    setBlogs((prev) => [newBlog, ...prev]);
    return newBlog;
  };

  const updateBlogAction = async (id, payload) => {
    const res = await updateBlog(id, payload);
    const updatedBlog = res?.data || res;
    setBlogs((prev) =>
      prev.map((b) => (String(b.id) === String(id) || b.slug === id ? updatedBlog : b))
    );
    return updatedBlog;
  };

  const deleteBlogAction = async (id) => {
    // Optimistic delete
    const previousBlogs = [...blogs];
    setBlogs((prev) => prev.filter((b) => String(b.id) !== String(id) && b.slug !== id));
    try {
      await deleteBlog(id);
    } catch (err) {
      // Revert if API fails
      setBlogs(previousBlogs);
      throw err;
    }
  };

  const createCategoryAction = async (payload) => {
    const res = await createCategory(payload);
    const newCategory = res?.data || res;
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  const deleteCategoryAction = async (id) => {
    const previousCategories = [...categories];
    setCategories((prev) => prev.filter((c) => String(c.id) !== String(id) && c.slug !== id));
    try {
      await deleteCategory(id);
    } catch (err) {
      setCategories(previousCategories);
      throw err;
    }
  };

  const value = {
    blogs,
    categories,
    loading,
    error,
    refreshData: fetchInitialData,
    createBlogAction,
    updateBlogAction,
    deleteBlogAction,
    createCategoryAction,
    deleteCategoryAction,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
