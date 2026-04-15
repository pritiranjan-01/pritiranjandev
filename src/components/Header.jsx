import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { utils } from "../assets/util/util.js";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinkClasses =
  "text-xs sm:text-sm md:text-base font-medium tracking-wide px-2 sm:px-3 py-1 rounded-full transition-colors relative";

const menuVariants = {
  closed: {
    height: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  closed: { y: -15, opacity: 0, filter: "blur(4px)" },
  open: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.3 } }
};

const Header = ({ isDarkMode, toggleTheme }) => {
  const { theme, cycleTheme } = useAppContext();
  // prefer cycleTheme from context; fall back to prop for legacy usage
  const handleThemeClick = cycleTheme || toggleTheme;
  const currentTheme = theme || (isDarkMode ? "dark" : "light");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const themeConfig = {
    light: { icon: <Moon className="h-4 w-4 sm:h-5 sm:w-5" />, label: "Dim mode"   },
    dim:   { icon: <span style={{fontSize:"1.1rem",lineHeight:1}}>🌑</span>,         label: "Dark mode"  },
    dark:  { icon: <Sun  className="h-4 w-4 sm:h-5 sm:w-5" />, label: "Light mode" },
  };
  const { icon: themeIcon, label: themeLabel } = themeConfig[currentTheme] || themeConfig.light;
  return (
    <>
      {/* Skip to Content Link - Accessibility */}
      <a
        href="#main-content"
        className="absolute top-0 left-0 -translate-y-full focus:translate-y-0 focus:z-50 bg-accent-light text-white px-4 py-2 rounded-br-lg transition-transform"
      >
        Skip to main content
      </a>

      {/* Mobile Navigation Blur Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-light-bgPrimary/40 dark:bg-black/40 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.header
        className="sticky top-0 z-[100] border-b border-light-border bg-light-bgPrimary/90 backdrop-blur-md dark:border-dark-border dark:bg-black/90"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
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
                    className={navLinkClasses}
                    end
                  >
                    {({ isActive }) => (
                      <>
                        Home
                        {isActive && (
                          <motion.div
                            layoutId="underline"
                            className="absolute bottom-0 left-0 right-0 mx-auto w-[80%] h-0.5 bg-black dark:bg-white"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/projects"
                    className={navLinkClasses}
                  >
                    {({ isActive }) => (
                      <>
                        Projects
                        {isActive && (
                          <motion.div
                            layoutId="underline"
                            className="absolute bottom-0 left-0 right-0 mx-auto w-[80%] h-0.5 bg-black dark:bg-white"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blogs"
                    className={navLinkClasses}
                  >
                    {({ isActive }) => (
                      <>
                        Blogs
                        {isActive && (
                          <motion.div
                            layoutId="underline"
                            className="absolute bottom-0 left-0 right-0 mx-auto w-[80%] h-0.5 bg-black dark:bg-white"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </nav>

            <button
              type="button"
              onClick={handleThemeClick}
              title={themeLabel}
              className="rounded-full border border-light-border p-1.5 sm:p-2 text-light-textPrimary shadow-sm hover:bg-light-bgSecondary dark:border-dark-border dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary transition-colors"
              aria-label={themeLabel}
            >
              {themeIcon}
            </button>
          </div>

          {/* Mobile Menu Button + Theme toggle */}
          <div className="md:hidden flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleThemeClick}
              title={themeLabel}
              className="rounded-full border border-light-border p-1.5 sm:p-2 text-light-textPrimary shadow-sm hover:bg-light-bgSecondary dark:border-dark-border dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary transition-colors"
              aria-label={themeLabel}
            >
              {themeIcon}
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden border-t border-light-border bg-light-bgPrimary dark:border-dark-border dark:bg-black/95 backdrop-blur-sm overflow-hidden"
            >
              <nav className="container-custom py-4">
                <motion.ul className="flex flex-col gap-3">
                  <motion.li variants={itemVariants}>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `block py-2 px-3 rounded-lg transition-colors ${isActive
                          ? "bg-accent-light text-white dark:bg-accent-dark dark:text-black"
                          : "text-light-textPrimary hover:bg-light-bgSecondary dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary"
                        }`
                      }
                      end
                      onClick={closeMobileMenu}
                    >
                      Home
                    </NavLink>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <NavLink
                      to="/projects"
                      className={({ isActive }) =>
                        `block py-2 px-3 rounded-lg transition-colors ${isActive
                          ? "bg-accent-light text-white dark:bg-accent-dark dark:text-black"
                          : "text-light-textPrimary hover:bg-light-bgSecondary dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary"
                        }`
                      }
                      onClick={closeMobileMenu}
                    >
                      Projects
                    </NavLink>
                  </motion.li>
                  <motion.li variants={itemVariants}>
                    <NavLink
                      to="/blogs"
                      className={({ isActive }) =>
                        `block py-2 px-3 rounded-lg transition-colors ${isActive
                          ? "bg-accent-light text-white dark:bg-accent-dark dark:text-black"
                          : "text-light-textPrimary hover:bg-light-bgSecondary dark:text-dark-textPrimary dark:hover:bg-dark-bgSecondary"
                        }`
                      }
                      onClick={closeMobileMenu}
                    >
                      Blogs
                    </NavLink>
                  </motion.li>
                </motion.ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
