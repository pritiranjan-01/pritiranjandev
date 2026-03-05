import React from "react";
import {
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Github,
} from "lucide-react";

const socials = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/pritiranjan-01",
    icon: Github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pritiranjan-mohanty/",
    icon: Linkedin,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/curious_capturer",
    icon: Instagram,
  },
  {
    id: "x",
    label: "X (Twitter)",
    href: "https://twitter.com/CuriousRanjan",
    icon: Twitter,
  },
];

const SocialFeed = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-16 sm:h-20 items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-black px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:opacity-80 dark:bg-white dark:text-black transition-opacity"
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="text-white dark:text-black truncate">
              {social.label}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialFeed;
