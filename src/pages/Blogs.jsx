import React from "react";
import { Clock } from "lucide-react";

const Blogs = () => {
  return (
    <div className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-8 sm:py-12 md:py-16 text-center">
      <div className="glass w-full max-w-2xl rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-14 animate-[blogs-pop-in_0.6s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="mb-4 sm:mb-5 md:mb-6 flex justify-center">
          <Clock className="h-10 sm:h-12 md:h-14 w-10 sm:w-12 md:w-14 text-accent-DEFAULT animate-pulse dark:text-accent-dark" />
        </div>
        <p className="mb-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-light-textSecondary dark:text-dark-textSecondary">
          Explore posts
        </p>
        <h1 className="gradient-text mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
          Blog section coming soon
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-light-textSecondary dark:text-dark-textSecondary">
          A dedicated Spring Boot backend is being prepared for this
          page. Once it is ready, you will find technical write‑ups,
          project breakdowns, and learning notes here.
        </p>
      </div>

      <style>{`
        @keyframes blogs-pop-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Blogs;
