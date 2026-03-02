import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Sitemap = () => {
  const sitemapData = [
    {
      category: "Main Pages",
      links: [
        { name: "Home", path: "/", description: "Main landing page" },
        {
          name: "Projects",
          path: "/projects",
          description: "View all projects",
        },
        {
          name: "Blogs",
          path: "/blogs",
          description: "Read blog posts",
        },
      ],
    },
    {
      category: "Information",
      links: [
        {
          name: "About",
          path: "/#about",
          description: "About me section",
        },
        {
          name: "Skills",
          path: "/#skills",
          description: "Technical skills",
        },
        {
          name: "Experience",
          path: "/#experience",
          description: "Work experience",
        },
      ],
    },
    {
      category: "Resources",
      links: [
        {
          name: "Contact",
          path: "/#contact",
          description: "Get in touch",
        },
        {
          name: "Sitemap",
          path: "/sitemap",
          description: "This page",
        },
      ],
    },
  ];

  return (
    <div className="container-custom py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
            Sitemap
          </h1>
          <p className="text-base sm:text-lg text-light-textSecondary dark:text-dark-textSecondary">
            Find your way around the website
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sitemapData.map((section, index) => (
            <div
              key={index}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-accent-light dark:text-accent-dark">
                {section.category}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="group block transition-colors"
                    >
                      <div className="font-medium text-light-textPrimary transition-colors group-hover:text-accent-light dark:text-dark-textPrimary dark:group-hover:text-accent-dark">
                        {link.name}
                      </div>
                      <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        {link.description}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="glass mt-8 sm:mt-10 md:mt-12 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-light-textPrimary dark:text-dark-textPrimary">
            Need Help?
          </h3>
          <p className="mb-4 text-sm sm:text-base text-light-textSecondary dark:text-dark-textSecondary">
            If you can't find what you're looking for, feel free to
            reach out.
          </p>
          <a
            href="mailto:pritiranjan.mohanty2003@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-light px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white transition-colors hover:bg-accent-lightHover dark:bg-accent-dark dark:text-black dark:hover:bg-accent-darkHover"
          >
            <Mail className="h-4 sm:h-5 w-4 sm:w-5" />
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
