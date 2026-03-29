import React from "react";
import BlogSidebarLeft from "./BlogSidebarLeft";
import BlogSidebarRight from "./BlogSidebarRight";
import { useBlogContext } from "../context/BlogContext";

const BlogLayout = ({ children, activeBlog }) => {
  const { categories, blogs } = useBlogContext();

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 relative min-h-screen flex flex-col lg:flex-row gap-8 lg:gap-12 transition-all duration-300">
      
      {/* Left Sidebar (Categories & Author) */}
      <aside className="w-full lg:w-64 xl:w-72 shrink-0">
        <BlogSidebarLeft categories={categories || []} activeBlog={activeBlog} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        {children}
      </main>

      {/* Right Sidebar (Recent Posts) */}
      <aside className="w-full lg:w-72 xl:w-80 shrink-0 hidden lg:block">
        <BlogSidebarRight blogs={blogs || []} />
      </aside>
      
      {/* Mobile-only recent Posts (Stack at the bottom) */}
      <aside className="w-full lg:hidden shrink-0 mt-8 border-t border-light-border dark:border-dark-border pt-8">
        <BlogSidebarRight blogs={blogs || []} />
      </aside>
    </div>
  );
};

export default BlogLayout;
