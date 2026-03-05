import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { utils } from "../assets/util/util.js";

const navLinkClasses =
  "text-xs sm:text-sm md:text-base font-medium tracking-wide px-2 sm:px-3 py-1 rounded-full transition-colors relative";

const activeNavLinkClasses =
  "after:absolute after:bottom-0 after:left-0 after:right-0 after:mx-auto after:w-[80%] after:h-0.5 after:bg-black dark:after:bg-white after:origin-center after:animate-slideUnderline";

const Header = ({ isDarkMode, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Skip to Content Link - Accessibility */}
      <a
        href="#main-content"
        className="absolute top-0 left-0 -translate-y-full focus:translate-y-0 focus:z-50 bg-accent-light text-white px-4 py-2 rounded-br-lg transition-transform"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b border-light-border bg-light-bgPrimary/90 backdrop-blur-md dark:border-dark-border dark:bg-black/90">
        <div className="container-custom flex items-center justify-between py-3 sm:py-4">
          {/* Logo / Title */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src={utils.logo}
              alt="Logo"
              className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 p-0.5 rounded-full border-2 sm:border-[3px] md:border-[4px] border-blue-500 border-accent-DEFAULT dark:border-accent-dark shadow-glass-light dark:shadow-glass-dark object-cover"
            />
            <div className="leading-tight">
              <p className="text-sm sm:text-base md:text-lg font-semibold tracking-[0.1em] text-light-textSecondary dark:text-dark-textSecondary">
                Pritiranjan
              </p>
            </div>
          </Link>

          {/* Desktop Navigation + Theme toggle */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4 md:gap-6">
            <nav>
              <ul className="flex items-center gap-2 sm:gap-3 md:gap-5">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
                    }
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                      `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
                    }
                  >
                    Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blogs"
                    className={({ isActive }) =>
                      `${navLinkClasses} ${isActive ? activeNavLinkClasses : ""}`
                    }
                  >
                    Blogs
                  </NavLink>
                </li>
              </ul>
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-light-border p-1.5 sm:p-2 text-light-textPrimary shadow-sm hover:bg-light-bgSecondary dark:border-dark-border dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button + Theme toggle */}
          <div className="md:hidden flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-light-border p-1.5 sm:p-2 text-light-textPrimary shadow-sm hover:bg-light-bgSecondary dark:border-dark-border dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="rounded-full border border-light-border p-1.5 sm:p-2 text-light-textPrimary shadow-sm hover:bg-light-bgSecondary dark:border-dark-border dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-light-border bg-light-bgPrimary dark:border-dark-border dark:bg-black/95 backdrop-blur-sm">
            <nav className="container-custom py-4">
              <ul className="flex flex-col gap-3">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-accent-light text-white dark:bg-accent-dark dark:text-black"
                          : "text-light-textPrimary hover:bg-light-bgSecondary dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary"
                      }`
                    }
                    end
                    onClick={closeMobileMenu}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-accent-light text-white dark:bg-accent-dark dark:text-black"
                          : "text-light-textPrimary hover:bg-light-bgSecondary dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary"
                      }`
                    }
                    onClick={closeMobileMenu}
                  >
                    Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blogs"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-accent-light text-white dark:bg-accent-dark dark:text-black"
                          : "text-light-textPrimary hover:bg-light-bgSecondary dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary"
                      }`
                    }
                    onClick={closeMobileMenu}
                  >
                    Blogs
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
