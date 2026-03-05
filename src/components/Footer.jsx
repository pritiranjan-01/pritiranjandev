import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Map } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(
          "https://api.counterapi.dev/v1/pritiranjan.dev/visits/up",
        );
        const data = await response.json();
        setVisitorCount(data.count);
      } catch {
        // Silently fail if visitor count unavailable
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <footer className="mt-10 sm:mt-12 md:mt-16 border-t border-light-border py-6 sm:py-8 text-sm text-light-textSecondary dark:border-dark-border dark:text-dark-textSecondary">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 md:grid-cols-3 md:items-center">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm sm:text-base font-medium text-light-textPrimary dark:text-dark-textPrimary">
              ©{year} Pritiranjan Mohanty
            </p>
            <p className="text-xs sm:text-sm">All rights reserved.</p>
          </div>

          {/* Middle: Contact + Visitors */}
          <div className="flex flex-col items-center gap-2 text-xs sm:text-sm">
            <p className="text-center">
              Contact:{" "}
              <span className="font-medium text-light-textPrimary dark:text-dark-textPrimary">
                pritiranjan.mohanty2003@gmail.com
              </span>
            </p>
            <p className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.2em]">
              Visitors{" "}
              <span className="ml-1 rounded-full bg-light-bgSecondary px-2 py-[1px] text-[0.6rem] sm:text-[0.65rem] dark:bg-dark-bgSecondary">
                {visitorCount > 0
                  ? visitorCount.toLocaleString()
                  : "Loading..."}
              </span>
            </p>
          </div>

          {/* Right: Sitemap */}
          <div className="flex flex-col items-center gap-1 sm:gap-2 md:items-end">
            <Link
              to="/sitemap"
              className="group flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors hover:text-accent-light dark:hover:text-accent-dark"
            >
              <Map className="h-3.5 sm:h-4 w-3.5 sm:w-4 transition-transform group-hover:scale-110" />
              <span>Sitemap</span>
            </Link>
            <p className="text-xs sm:text-sm">Navigate the site</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
