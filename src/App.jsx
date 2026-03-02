import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";

function AppLayout() {
  const { isDarkMode, toggleTheme } = useAppContext();
  const location = useLocation();
  const isBlogPage = location.pathname === "/blogs";

  return (
    <div className="flex min-h-screen flex-col">
      {!isBlogPage && <Marquee />}
      {!isBlogPage && (
        <hr className="border-light-border dark:border-dark-border" />
      )}

      {/* {!isBlogPage && ( */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      {/* )} */}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
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
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
