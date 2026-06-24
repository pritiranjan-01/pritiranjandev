import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

const NewsletterCTA = () => {
  return (
    <motion.section
      className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-light-border bg-light-bgSecondary p-6 text-center shadow-glass-light dark:border-dark-border dark:bg-dark-bgSecondary/40 dark:shadow-glass-dark sm:p-8 md:p-10 lg:p-12">
        {/* Subtle decorative background gradient glow */}
        <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-tr from-[#FF6B4A]/10 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-gradient-to-bl from-[#FF6B4A]/10 to-transparent blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Icon Circle */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6B4A]/10 text-[#FF6B4A]">
            <Mail className="h-6 w-6" />
          </div>

          <h2 className="mb-2 text-xl font-bold tracking-tight text-light-textPrimary dark:text-dark-textPrimary sm:text-2xl md:text-3xl font-heading">
            📬 Stay Updated
          </h2>

          <p className="mx-auto mb-6 max-w-lg text-sm text-light-textSecondary dark:text-dark-textSecondary sm:text-base leading-relaxed">
            I write about Java, Spring Boot, Backend Development, and Career Growth. Subscribe to get my latest insights directly in your inbox.
          </p>

          <a
            href="https://pritiranjanmohanty.substack.com/subscribe"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B4A] to-[#E64A19] px-6 sm:px-8 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Subscribe to Newsletter</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterCTA;
