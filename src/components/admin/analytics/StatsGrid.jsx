import { Globe, Compass, Link2 } from "lucide-react";
import { getFlagEmoji } from "./analyticsUtils";

const StatsGrid = ({ stats }) => {
  const totalVisits = stats?.totalVisits || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Left Column: Countries & Referrers */}
      <div className="space-y-8">
        
        {/* Top Countries */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border">
          <h3 className="text-lg font-bold text-light-textPrimary dark:text-dark-textPrimary mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent-light dark:text-accent-dark" />
            Top Visitor Locations
          </h3>
          
          <div className="space-y-4">
            {stats?.countries && stats.countries.length > 0 ? (
              stats.countries.slice(0, 5).map((c, idx) => {
                const percentage = totalVisits > 0 ? Math.round((c.count / totalVisits) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-light-textPrimary dark:text-dark-textPrimary flex items-center gap-2">
                        <span className="text-lg">{getFlagEmoji(c.code)}</span>
                        {c.name}
                      </span>
                      <span className="text-light-textSecondary dark:text-dark-textSecondary">
                        {c.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-light-bgSecondary dark:bg-dark-bgSecondary/60 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-accent-light dark:bg-accent-dark h-full rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                No location data resolved yet.
              </p>
            )}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border">
          <h3 className="text-lg font-bold text-light-textPrimary dark:text-dark-textPrimary mb-4 flex items-center gap-2">
            <Compass className="w-5 h-5 text-accent-light dark:text-accent-dark" />
            Traffic Sources
          </h3>
          
          <div className="divide-y divide-light-border dark:divide-dark-border">
            {stats?.referrers && stats.referrers.length > 0 ? (
              stats.referrers.slice(0, 5).map((r, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 text-sm first:pt-0 last:pb-0"
                >
                  <span 
                    className="font-medium text-light-textPrimary dark:text-dark-textPrimary truncate max-w-[280px]" 
                    title={r.referrer}
                  >
                    {r.referrer === "Direct" ? "Direct entry / Saved link" : r.referrer}
                  </span>
                  <span className="px-2.5 py-1 bg-light-bgSecondary dark:bg-dark-bgSecondary text-light-textSecondary dark:text-dark-textSecondary rounded-lg font-bold">
                    {r.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary py-1">
                No referrer logs recorded.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Top Pages */}
      <div className="p-6 rounded-2xl bg-white dark:bg-dark-bgSecondary/40 border border-light-border dark:border-dark-border flex flex-col">
        <h3 className="text-lg font-bold text-light-textPrimary dark:text-dark-textPrimary mb-4 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-accent-light dark:text-accent-dark" />
          Top Visited Pages
        </h3>
        
        <div className="space-y-4 flex-1">
          {stats?.pages && stats.pages.length > 0 ? (
            stats.pages.slice(0, 6).map((p, idx) => {
              const percentage = totalVisits > 0 ? Math.round((p.count / totalVisits) * 100) : 0;
              let parsedPath = "/";
              try {
                const url = new URL(p.pageUrl);
                parsedPath = url.pathname + url.search;
              } catch (e) {
                parsedPath = p.pageUrl || "/";
              }

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span 
                      className="font-semibold text-light-textPrimary dark:text-dark-textPrimary truncate max-w-[250px] sm:max-w-md" 
                      title={p.pageUrl}
                    >
                      {parsedPath}
                    </span>
                    <span className="text-light-textSecondary dark:text-dark-textSecondary">
                      {p.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-light-bgSecondary dark:bg-dark-bgSecondary/60 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#0096ff] dark:bg-[#4facfe] h-full rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
              No page logs recorded.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
