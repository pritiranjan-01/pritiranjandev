import React from "react";
import { useAppContext } from "../context/AppContext.jsx";

const Marquee = () => {
  const { isDarkMode } = useAppContext();

  return (
    <div
      className={`flex overflow-hidden py-2 text-xs sm:text-sm font-medium ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex animate-marquee">
        <span className="mx-8 whitespace-nowrap">
          New post planned for the blog page · Spring Boot powered
          backend coming soon · Stay tuned for fresh articles and
          project breakdowns
        </span>
        <span className="mx-8 whitespace-nowrap">
          New post planned for the blog page · Spring Boot powered
          backend coming soon · Stay tuned for fresh articles and
          project breakdowns
        </span>
      </div>

      <style>
        {`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: flex;
        width: max-content;
        animation: marquee 20s linear infinite;
      }
    `}
      </style>
    </div>
  );
};

export default Marquee;
