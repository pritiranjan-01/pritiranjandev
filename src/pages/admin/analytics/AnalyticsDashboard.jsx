import { useState, useEffect } from "react";
import { BarChart3, RefreshCw } from "lucide-react";
import { getVisits, getVisitStats } from "../../../services/api";

import KpiCards from "../../../components/admin/analytics/KpiCards";
import StatsGrid from "../../../components/admin/analytics/StatsGrid";
import RecentActivityTable from "../../../components/admin/analytics/RecentActivityTable";

const AnalyticsDashboard = () => {
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    countries: [],
    referrers: [],
    pages: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatsAndVisits = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true);
    else setLoading(true);
    
    setError(null);
    try {
      const [statsRes, visitsRes] = await Promise.all([
        getVisitStats(),
        getVisits({ page: 0, size: 10 })
      ]);

      if (statsRes && statsRes.data) {
        setStats(statsRes.data);
      }
      
      if (visitsRes && visitsRes.data) {
        setVisits(visitsRes.data.content || []);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load visitor analytics data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatsAndVisits();
  }, []);

  const handleRefresh = () => {
    fetchStatsAndVisits(true);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-light-bgPrimary dark:bg-dark-bgPrimary">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-light border-t-transparent dark:border-accent-dark" />
          <p className="text-light-textSecondary dark:text-dark-textSecondary font-medium">
            Loading intelligence data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent-light/10 dark:bg-accent-dark/10 rounded-xl">
              <BarChart3 className="w-6 h-6 text-accent-light dark:text-accent-dark" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary leading-tight">
                Visitor Analytics
              </h1>
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mt-0.5">
                Real-time traffic and location intelligence
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

      {/* KPI Cards */}
      <KpiCards stats={stats} />

      {/* Charts & Splits */}
      <StatsGrid stats={stats} />

      {/* Recent Visits Table */}
      <RecentActivityTable visits={visits} />
    </div>
  );
};

export default AnalyticsDashboard;
