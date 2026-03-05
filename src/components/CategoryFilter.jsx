import React from "react";
import { ChevronDown } from "lucide-react";

const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
      <div className="relative">
        <select
          value={activeCategory ?? ""}
          onChange={(e) =>
            onCategoryChange(
              e.target.value === "" ? null : e.target.value,
            )
          }
          className="appearance-none bg-light-bgSecondary dark:bg-dark-bgSecondary text-light-textPrimary dark:text-dark-textPrimary text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 pr-8 sm:pr-10 rounded-lg border border-light-border dark:border-dark-border focus:outline-none focus:border-accent-light dark:focus:border-accent-dark transition-colors cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option
              key={cat.id ?? cat.slug ?? cat.name}
              value={cat.slug ?? cat.name}
            >
              {cat.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 pointer-events-none text-light-textSecondary dark:text-dark-textSecondary" />
      </div>
    </div>
  );
};

export default CategoryFilter;
