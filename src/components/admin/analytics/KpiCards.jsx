import { Eye, Users, Globe, Link2 } from "lucide-react";
import { motion } from "framer-motion";

const KpiCards = ({ stats }) => {
  const countryCount = stats?.countries?.length || 0;
  const topReferrer = stats?.referrers?.[0]?.referrer || "Direct";
  const topReferrerCount = stats?.referrers?.[0]?.count || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Card 1: Total Visits */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">
            Total Hits
          </span>
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
            <Eye className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-3xl font-extrabold text-light-textPrimary dark:text-dark-textPrimary">
          {stats?.totalVisits || 0}
        </h3>
        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
          Page loads registered
        </p>
      </motion.div>

      {/* Card 2: Unique Visitors */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">
            Unique Visitors
          </span>
          <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-3xl font-extrabold text-light-textPrimary dark:text-dark-textPrimary">
          {stats?.uniqueVisitors || 0}
        </h3>
        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
          Distinct IP addresses
        </p>
      </motion.div>

      {/* Card 3: Top Countries */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">
            Active Regions
          </span>
          <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
            <Globe className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-3xl font-extrabold text-light-textPrimary dark:text-dark-textPrimary">
          {countryCount}
        </h3>
        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
          Countries/networks resolved
        </p>
      </motion.div>

      {/* Card 4: Top Referrer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-light-textSecondary dark:text-dark-textSecondary uppercase tracking-wider">
            Top Referrer
          </span>
          <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
            <Link2 className="w-5 h-5" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-light-textPrimary dark:text-dark-textPrimary truncate" title={topReferrer}>
          {topReferrer === "Direct" ? "Direct / Bookmarked" : topReferrer.replace(/(^\w+:|^)\/\//, "")}
        </h3>
        <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary mt-2">
          {topReferrerCount} visit(s) recorded
        </p>
      </motion.div>
    </div>
  );
};

export default KpiCards;
