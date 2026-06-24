import { Link } from "react-router-dom";
import { Calendar, Smartphone, Eye } from "lucide-react";
import { getFlagEmoji, parseUserAgent, formatDate } from "./analyticsUtils";

const RecentActivityTable = ({ visits }) => {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-bold text-light-textPrimary dark:text-dark-textPrimary flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent-light dark:text-accent-dark" />
          Recent Activity Logs
        </h3>

        <Link
          to="/admin/analytics/detailed"
          className="flex items-center gap-2 px-4 py-2 bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 text-sm font-semibold rounded-xl transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Detailed Report
        </Link>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary font-semibold">
              <th className="pb-3 pr-4 font-bold">Country / City</th>
              <th className="pb-3 pr-4 font-bold">IP Address</th>
              <th className="pb-3 pr-4 font-bold">Device / Browser</th>
              <th className="pb-3 pr-4 font-bold">Initial Landing Page</th>
              <th className="pb-3 pr-4 font-bold">Referrer</th>
              <th className="pb-3 font-bold text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-border dark:divide-dark-border">
            {visits && visits.length > 0 ? (
              visits.slice(0, 10).map((visit) => {
                let parsedPath = "/";
                try {
                  const url = new URL(visit.pageUrl);
                  parsedPath = url.pathname + url.search;
                } catch (e) {
                  parsedPath = visit.pageUrl || "/";
                }

                return (
                  <tr key={visit.id} className="hover:bg-light-bgSecondary/50 dark:hover:bg-dark-bgSecondary/20 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl leading-none flex-shrink-0" title={visit.countryCode || "LH"}>
                          {getFlagEmoji(visit.countryCode)}
                        </span>
                        <div>
                          <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary block">
                            {visit.country || "Localhost"}
                          </span>
                          <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary block">
                            {visit.city && visit.city !== "Unknown" ? `${visit.city}, ` : ""}
                            {visit.region && visit.region !== "Unknown" ? visit.region : ""}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 font-mono font-medium text-light-textPrimary dark:text-dark-textPrimary">
                      {visit.ipAddress}
                      {visit.isp && visit.isp !== "Unknown" && (
                        <span className="block text-[10px] text-light-textSecondary dark:text-dark-textSecondary max-w-[150px] truncate" title={visit.isp}>
                          {visit.isp}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 pr-4 text-light-textPrimary dark:text-dark-textPrimary">
                      <div className="flex items-center gap-2">
                        {visit.userAgent?.includes("Mobi") ? (
                          <Smartphone className="w-3.5 h-3.5 text-light-textSecondary dark:text-dark-textSecondary flex-shrink-0" />
                        ) : (
                          <Smartphone className="w-3.5 h-3.5 text-light-textSecondary dark:text-dark-textSecondary hidden flex-shrink-0" />
                        )}
                        <span className="text-xs" title={visit.userAgent}>
                          {parseUserAgent(visit.userAgent)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 text-xs rounded font-medium truncate max-w-[150px] block" title={visit.pageUrl}>
                        {parsedPath}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-light-textSecondary dark:text-dark-textSecondary max-w-[150px] truncate" title={visit.referrer}>
                      {visit.referrer === "Direct" ? (
                        <span className="px-2 py-0.5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded">
                          Direct entry
                        </span>
                      ) : (
                        visit.referrer
                      )}
                    </td>
                    <td className="py-3.5 text-right font-medium text-light-textPrimary dark:text-dark-textPrimary whitespace-nowrap">
                      {formatDate(visit.visitedAt)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-light-textSecondary dark:text-dark-textSecondary font-medium">
                  No visit logs stored.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivityTable;
