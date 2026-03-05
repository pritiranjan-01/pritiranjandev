import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs }) => {
  return (
    <div className="space-y-3">
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog.id ?? blog.slug ?? blog.title}
          blog={blog}
          index={index}
        />
      ))}
    </div>
  );
};

export default React.memo(BlogList);
