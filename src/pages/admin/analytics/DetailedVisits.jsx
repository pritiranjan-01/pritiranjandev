import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Calendar, ChevronLeft, ChevronRight, RefreshCw, Database
} from "lucide-react";
import { getVisits } from "../../../services/api";
import { getFlagEmoji, parseUserAgent, formatDate } from "../../../components/admin/analytics/analyticsUtils";

const DetailedVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size] = useState(15); // Show 15 logs per page for detailed view

  const fetchDetailedLogs = async (pageNumber = 0, showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true);
    else setLoading(true);
    
    setError(null);
    try {
      const res = await getVisits({ page: pageNumber, size });
      if (res && res.data) {
        setVisits(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalElements(res.data.totalElements || 0);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load detailed visit logs");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDetailedLogs(page);
  }, [page]);

  const handleRefresh = () => {
    fetchDetailedLogs(page, true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-light-bgPrimary dark:bg-dark-bgPrimary">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-light border-t-transparent dark:border-accent-dark" />
          <p className="text-light-textSecondary dark:text-dark-textSecondary font-medium">
            Loading activity log records...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-[95%] mx-auto min-h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary">
      {/* Header Navigation */}
      <div className="mb-6">
        <Link
          to="/admin/analytics"
          className="inline-flex items-center gap-2 text-sm text-light-textSecondary dark:text-dark-textSecondary hover:text-accent-light dark:hover:text-accent-dark transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Analytics Summary
        </Link>
      </div>

      {/* Main Title & Action Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent-light/10 dark:bg-accent-dark/10 rounded-xl">
              <Database className="w-6 h-6 text-accent-light dark:text-accent-dark" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary leading-tight">
                Detailed Traffic Logs
              </h1>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
                Displaying {totalElements} visit records captured in your database
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-dark-bgSecondary/80 border border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary font-medium rounded-xl hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary transition-colors shadow-sm text-sm"
        >
          <RefreshCw
            className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 font-medium">
          {error}
        </div>
      )}

      {/* Raw Table Logs */}
      <div className="p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border shadow-sm overflow-hidden">
        
        {/* Horizontal scroll container with scroll indicator */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pr-6 font-bold">ID</th>
                <th className="pb-3 pr-6 font-bold">Time</th>
                <th className="pb-3 pr-6 font-bold">IP Address</th>
                <th className="pb-3 pr-6 font-bold">Country</th>
                <th className="pb-3 pr-6 font-bold">Code</th>
                <th className="pb-3 pr-6 font-bold">Region / State</th>
                <th className="pb-3 pr-6 font-bold">City</th>
                <th className="pb-3 pr-6 font-bold">Zip</th>
                <th className="pb-3 pr-6 font-bold">Coordinates</th>
                <th className="pb-3 pr-6 font-bold">ISP / Network Carrier</th>
                <th className="pb-3 pr-6 font-bold">Initial Landing Page</th>
                <th className="pb-3 pr-6 font-bold">Referrer URL</th>
                <th className="pb-3 pr-6 font-bold">System Details</th>
                <th className="pb-3 font-bold">Raw User Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border font-medium">
              {visits.length > 0 ? (
                visits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-light-bgSecondary/50 dark:hover:bg-dark-bgSecondary/20 transition-colors">
                    <td className="py-4 pr-6 text-light-textSecondary dark:text-dark-textSecondary font-bold">
                      #{visit.id}
                    </td>
                    <td className="py-4 pr-6 text-light-textPrimary dark:text-dark-textPrimary">
                      {formatDate(visit.visitedAt)}
                    </td>
                    <td className="py-4 pr-6 font-mono text-light-textPrimary dark:text-dark-textPrimary">
                      {visit.ipAddress}
                    </td>
                    <td className="py-4 pr-6 text-light-textPrimary dark:text-dark-textPrimary">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-lg leading-none">{getFlagEmoji(visit.countryCode)}</span>
                        {visit.country || "Localhost"}
                      </span>
                    </td>
                    <td className="py-4 pr-6 font-mono text-light-textSecondary dark:text-dark-textSecondary uppercase">
                      {visit.countryCode || "LH"}
                    </td>
                    <td className="py-4 pr-6 text-light-textPrimary dark:text-dark-textPrimary">
                      {visit.region || "Local Network"}
                    </td>
                    <td className="py-4 pr-6 text-light-textPrimary dark:text-dark-textPrimary">
                      {visit.city || "Local Dev"}
                    </td>
                    <td className="py-4 pr-6 font-mono text-light-textSecondary dark:text-dark-textSecondary">
                      {visit.zip || "00000"}
                    </td>
                    <td className="py-4 pr-6 font-mono text-light-textSecondary dark:text-dark-textSecondary">
                      {visit.latitude != null ? visit.latitude.toFixed(4) : "0.0000"}, {visit.longitude != null ? visit.longitude.toFixed(4) : "0.0000"}
                    </td>
                    <td className="py-4 pr-6 text-light-textPrimary dark:text-dark-textPrimary max-w-[200px] truncate" title={visit.isp}>
                      {visit.isp || "Local Development Network"}
                    </td>
                    <td className="py-4 pr-6 font-mono text-blue-600 dark:text-blue-400 max-w-[250px] truncate" title={visit.pageUrl}>
                      {visit.pageUrl}
                    </td>
                    <td className="py-4 pr-6 text-light-textSecondary dark:text-dark-textSecondary max-w-[250px] truncate" title={visit.referrer}>
                      {visit.referrer === "Direct" ? (
                        <span className="px-2 py-0.5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded">
                          Direct Entry
                        </span>
                      ) : (
                        visit.referrer
                      )}
                    </td>
                    <td className="py-4 pr-6 text-light-textPrimary dark:text-dark-textPrimary">
                      {parseUserAgent(visit.userAgent)}
                    </td>
                    <td className="py-4 pr-6 font-mono text-light-textSecondary dark:text-dark-textSecondary text-[10px] max-w-[300px] truncate" title={visit.userAgent}>
                      {visit.userAgent}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="py-12 text-center text-light-textSecondary dark:text-dark-textSecondary font-medium text-sm">
                    No detailed logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Row */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-light-border dark:border-dark-border">
            <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
              Showing logs <span className="font-bold">{page * size + 1}</span> - <span className="font-bold">{Math.min((page + 1) * size, totalElements)}</span> of <span className="font-bold">{totalElements}</span> (Page <span className="font-bold">{page + 1}</span> of <span className="font-bold">{totalPages}</span>)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
                className="p-1.5 border border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary rounded-lg hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary/60 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages - 1}
                className="p-1.5 border border-light-border dark:border-dark-border text-light-textPrimary dark:text-dark-textPrimary rounded-lg hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary/60 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedVisits;
