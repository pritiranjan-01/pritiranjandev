/**
 * API client for Portfolio Blog CMS Backend (pritiranjandev-cms) using Axios.
 * Base URL: set VITE_API_BASE_URL in .env (e.g. http://localhost:8080).
 */

import axios from "axios";

const getBaseUrl = () => import.meta.env.VITE_API_BASE_URL || "";

const TOKEN_STORAGE_KEY = "blogcms_token";

export function getAuthToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function setAuthToken(token) {
  try {
    if (!token) localStorage.removeItem(TOKEN_STORAGE_KEY);
    else localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // ignore storage errors (private mode, blocked storage, etc.)
  }
}

export function logout() {
  setAuthToken("");
}

const api = axios.create({
  baseURL: getBaseUrl().replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

async function request(method, url, { params, data } = {}) {
  try {
    const response = await api.request({
      method,
      url,
      params,
      data,
    });
    return response.data;
  } catch (error) {
    const err = new Error(
      error.response?.statusText ||
        error.response?.data?.message ||
        error.message ||
        "Request failed",
    );
    err.status = error.response?.status;
    err.body = error.response?.data ?? null;
    throw err;
  }
}

// ——— Auth ———
export async function login({ username, password }) {
  const data = await request("POST", "/api/auth/login", {
    data: { username, password },
  });
  if (data?.token) setAuthToken(data.token);
  return data;
}

// ——— Blogs ———
export async function getBlogs(params = {}) {
  const {
    page = 0,
    size = 6,
    sortBy = "createdAt",
    direction = "desc",
  } = params;
  const q = new URLSearchParams({
    page: String(page),
    size: String(size),
    sortBy,
    direction,
  });
  return request("GET", "/api/blogs", {
    params: Object.fromEntries(q),
  });
}

export async function getBlogBySlug(slug) {
  return request("GET", `/api/blogs/${encodeURIComponent(slug)}`);
}

export async function getBlogsByCategory(categorySlug, params = {}) {
  const { page = 0, size = 6, sortBy, direction } = params;
  const q = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  if (sortBy) q.set("sortBy", sortBy);
  if (direction) q.set("direction", direction);
  return request(
    "GET",
    `/api/blogs/category/${encodeURIComponent(categorySlug)}`,
    {
      params: Object.fromEntries(q),
    },
  );
}

export async function createBlog(payload) {
  return request("POST", "/api/blogs", {
    data: payload,
  });
}

export async function updateBlog(id, payload) {
  return request(
    "PUT",
    `/api/blogs/${encodeURIComponent(String(id))}`,
    {
      data: payload,
    },
  );
}

export async function deleteBlog(id) {
  return request(
    "DELETE",
    `/api/blogs/${encodeURIComponent(String(id))}`,
  );
}

// ——— Categories ———
export async function getCategories() {
  return request("GET", "/api/categories");
}

export async function createCategory(payload) {
  return request("POST", "/api/categories", {
    data: payload,
  });
}

export async function deleteCategory(id) {
  return request(
    "DELETE",
    `/api/categories/${encodeURIComponent(String(id))}`,
  );
}
