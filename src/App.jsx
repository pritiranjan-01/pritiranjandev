import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import { BlogProvider } from "./context/BlogContext";
import ErrorBoundary from "./components/ErrorBoundary";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

// Lazy load heavy pages
const Projects = lazy(() => import("./pages/Projects"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashbord"));
const Category = lazy(() => import("./pages/admin/Category"));
const CreateBlog = lazy(() => import("./pages/admin/CreateBlog"));
const ManageBlog = lazy(() => import("./pages/admin/ManageBlog"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-light border-t-transparent dark:border-accent-dark" />
  </div>
);

function AppLayout() {
  const { isDarkMode, toggleTheme } = useAppContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const isBlogRoute = location.pathname.startsWith("/blogs");

  // Dynamic document title based on current route
  useEffect(() => {
    const path = location.pathname;
    let title = "Pritiranjan Mohanty | Java & Spring Boot Developer";

    if (path === "/") title = "Home | Pritiranjan Mohanty";
    else if (path === "/projects") title = "Projects | Pritiranjan Mohanty";
    else if (path === "/blogs") title = "Blogs | Pritiranjan Mohanty";
    else if (path.startsWith("/blogs/")) title = "Blog | Pritiranjan Mohanty";
    else if (path === "/sitemap") title = "Sitemap | Pritiranjan Mohanty";
    else if (path.startsWith("/admin")) {
      if (path.includes("dashboard")) title = "Dashboard | Admin";
      else if (path.includes("category")) title = "Categories | Admin";
      else if (path.includes("create-blog")) title = "Create Blog | Admin";
      else if (path.includes("manage-blog")) title = "Manage Blogs | Admin";
      else if (path.includes("edit-blog")) title = "Edit Blog | Admin";
      else if (path.includes("signin")) title = "Login | Admin";
      else title = "Admin Portal";
    }

    document.title = title;
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdminRoute && !isBlogRoute && <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}

      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin/auth/signin" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="category" element={<Category />} />
              <Route path="create-blog" element={<CreateBlog />} />
              <Route path="edit-blog/:slug" element={<CreateBlog />} />
              <Route path="manage-blog" element={<ManageBlog />} />
            </Route>
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function AppContent() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BlogProvider>
          <AppContent />
        </BlogProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
