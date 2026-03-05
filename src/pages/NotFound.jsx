import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Home, Folder, Map } from "lucide-react";

const NotFound = () => {
  // Scroll to top on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 0);
    });
  }, []);

  return (
    <>
      <div
        className="container-custom flex min-h-[calc(100vh-200px)] items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20"
        style={{ animation: "notfound-fade-in 0.5s ease-out both" }}
      >
        <div className="text-center px-4">
          {/* 404 Icon */}
          <div className="mb-6 sm:mb-8 inline-block">
            <div className="relative inline-flex items-center justify-center">
              <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[150px] font-bold text-transparent bg-gradient-to-br from-accent-light via-accent-dark to-accent-light bg-clip-text">
                404
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="mb-2 text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary">
            Sorry, the page you're looking for doesn't exist.
          </p>

          {/* Navigation Links */}
          <div className="my-4 sm:my-5 sm:flex-row sm:items-center sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-light px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-accent-lightHover dark:bg-accent-dark dark:text-black dark:hover:bg-accent-darkHover"
            >
              <Home className="h-4 sm:h-5 w-4 sm:w-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes notfound-fade-in {
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
    </>
  );
};

export default NotFound;
