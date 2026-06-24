import React from "react";
import { socials } from "../context/AppContext";

const brandStyles = {
  github: {
    bg: "bg-gradient-to-br from-[#2b3137] to-[#1a1e22] hover:shadow-[0_0_20px_rgba(26,30,34,0.4)] border border-neutral-700/50",
    text: "text-white/85 group-hover:text-white",
    icon: "text-white/85 group-hover:text-white",
  },
  linkedin: {
    bg: "bg-gradient-to-br from-[#0A66C2] to-[#004B7C] hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] border border-blue-500/30",
    text: "text-white/85 group-hover:text-white",
    icon: "text-white/85 group-hover:text-white",
  },
  instagram: {
    bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:shadow-[0_0_20px_rgba(238,42,123,0.4)] border border-[#ee2a7b]/30",
    text: "text-white/85 group-hover:text-white",
    icon: "text-white/85 group-hover:text-white",
  },
  x: {
    bg: "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] border border-neutral-800",
    text: "text-white/85 group-hover:text-white",
    icon: "text-white/85 group-hover:text-white",
  },
};

const SocialFeed = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {socials.map((social) => {
        const Icon = social.icon;
        const style = brandStyles[social.id] || {
          bg: "bg-black dark:bg-white hover:opacity-80",
          text: "text-white dark:text-black",
          icon: "text-white dark:text-black",
        };
        const labelText = social.id === "x" ? "X" : social.label;
        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className={`group relative overflow-hidden flex h-16 sm:h-20 flex-1 min-w-[130px] sm:min-w-[155px] max-w-[200px] items-center justify-center gap-2 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-1 ${style.bg} ${style.text}`}
          >
            {/* Glossy sheen overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <Icon className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${style.icon}`} />
            <span className="truncate">
              {labelText}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialFeed;
