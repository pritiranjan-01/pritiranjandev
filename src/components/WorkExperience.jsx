import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { utils } from "../assets/util/util.js";

const WorkExperience = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const points = [
    "Executed over 500 manual test cases (spanning functional, regression, and UI testing) to identify critical bugs and ensure product stability.",
    "Validated backend REST APIs using Postman, ensuring 99% API reliability and proper validation across multiple core modules.",
    "Implemented automated API testing using Playwright, integrated with Allure reports to provide detailed test execution logs and debugging analysis.",
    "Gained hands-on experience in Agile SDLC and STLC workflows, collaborating on requirement analysis, test case design, defect tracking, and end-to-end testing activities.",
  ];

  return (
    <motion.section
      id="experience"
      className="mb-12 sm:mb-14 md:mb-16 lg:mb-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="mb-6 sm:mb-8 text-xl sm:text-2xl md:text-3xl font-bold">
        Work Experience
      </h2>

      <div className="space-y-6">
        <div className="flex flex-col">
          {/* Header Row */}
          <div
            className="flex items-start justify-between gap-4 cursor-pointer select-none group"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-start gap-4">
              {/* Circular Logo Container */}
              <div className="h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 flex items-center justify-center rounded-full bg-white border border-light-border dark:bg-black dark:border-dark-border overflow-hidden transition-colors">
                <img
                  src={utils.iserveu}
                  alt="iServeU Technology Pvt Ltd logo"
                  className="h-full w-full object-contain p-1.5 rounded-full"
                />
              </div>
              
              {/* Text: Company & Title */}
              <div>
                <h3 className="text-base sm:text-lg font-bold flex items-center gap-1.5 text-light-textPrimary dark:text-dark-textPrimary group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors leading-snug">
                  iServeU Technology Pvt Ltd
                  <ChevronRight
                    className={`h-4 w-4 text-light-textSecondary dark:text-dark-textSecondary transition-transform duration-300 flex-shrink-0 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </h3>
                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
                  QA Intern
                </p>
              </div>
            </div>

            {/* Date Range on Far Right */}
            <div className="text-right text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary pt-1 whitespace-normal sm:whitespace-nowrap max-w-[120px] sm:max-w-none leading-normal">
              Jun 2024 - Oct 2024
            </div>
          </div>

          {/* Collapsible Details */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden pl-16 pr-2 sm:pr-8"
              >
                <ul className="mt-4 list-disc space-y-2 text-sm leading-relaxed text-light-textSecondary dark:text-dark-textSecondary pl-4">
                  {points.map((point, index) => (
                    <li key={index} className="pl-1">
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default WorkExperience;
