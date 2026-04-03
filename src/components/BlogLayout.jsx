import React from "react";
import { motion } from "framer-motion";
import BlogSidebarLeft from "./BlogSidebarLeft";
import BlogSidebarRight from "./BlogSidebarRight";
import { useBlogContext } from "../context/BlogContext";

const layoutVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const BlogLayout = ({ children, activeBlog }) => {
  const { categories, blogs } = useBlogContext();

  return (
    <motion.div
      className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 relative min-h-screen flex flex-col lg:flex-row gap-8 lg:gap-12 transition-all duration-300"
      variants={layoutVariants}
      initial="hidden"
      animate="visible"
    >

      {/* Left Sidebar (Categories & Author) */}
      <motion.aside variants={itemVariants} className="w-full lg:w-64 xl:w-72 shrink-0">
        <BlogSidebarLeft categories={categories || []} activeBlog={activeBlog} />
      </motion.aside>

      {/* Main Content Area */}
      <motion.main variants={itemVariants} className="flex-1 min-w-0">
        {children}
      </motion.main>

      {/* Right Sidebar (Recent Posts) */}
      <motion.aside variants={itemVariants} className="w-full lg:w-72 xl:w-80 shrink-0 hidden lg:block">
        <BlogSidebarRight blogs={blogs || []} />
      </motion.aside>

      {/* Mobile-only recent Posts (Stack at the bottom) */}
      <motion.aside variants={itemVariants} className="w-full lg:hidden shrink-0 mt-8 border-t border-light-border dark:border-dark-border pt-8">
        <BlogSidebarRight blogs={blogs || []} />
      </motion.aside>
    </motion.div>
  );
};

export default BlogLayout;
