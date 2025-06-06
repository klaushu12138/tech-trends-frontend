import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const TrendChart = ({
  data = [],
  updatedAt = "",
  period = "",
  loading = false,
}) => {
  const [radius, setRadius] = useState(120);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 500) {
        setRadius(70);
        setShowLabel(false);
      } else if (window.innerWidth < 900) {
        setRadius(100);
        setShowLabel(true);
      } else {
        setRadius(140);
        setShowLabel(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = data.reduce((sum, entry) => sum + (entry.count || 0), 0);

  return (
    <div className="p-4 max-w-[600px] mx-auto">
      {updatedAt && !loading && (
        <p className="text-sm text-gray-500 text-center mb-4">
          Last updated at:{" "}
          {(() => {
            const date = new Date(updatedAt);
            return date.toLocaleDateString();
          })()}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-[280px]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" aspect={1}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="language"
              cx="50%"
              cy="50%"
              outerRadius={radius}
              fill="#4f46e5"
              label={showLabel ? ({ language }) => language : false}
              labelLine={showLabel}
              isAnimationActive
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}

      {!loading && (
        <p className="text-base text-blue-600 text-center mt-4 font-semibold p-10">
          Number of trending repos: {total}
        </p>
      )}
    </div>
  );
};

export default TrendChart;
