// components/WeatherChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// 親（page.tsx）から受け取るデータの型（ルール）を決める
interface WeatherChartProps {
  data: any[]; // いったんanyにしておきます
  metric: string;
}

export default function WeatherChart({ data, metric }: WeatherChartProps) {
  // 選ばれている指標に合わせて、グラフの日本語名を変える関数
  const getMetricName = (metricValue: string) => {
    switch (metricValue) {
      case "temperature_2m":
        return "気温";
      case "apparent_temperature":
        return "体感温度";
      case "precipitation":
        return "降水量";
      case "wind_speed_10m":
        return "風速";
      default:
        return metricValue;
    }
  };

  return (
    <div className="mx-8 bg-white p-6 rounded-lg shadow-md border border-gray-200 h-[400px]">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="focus:outline-none"
      >
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, bottom: 20, left: 0 }}
          style={{ outline: "none" }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend
            verticalAlign="top"
            align="left"
            height={40}
            iconType="circle"
            wrapperStyle={{ paddingBottom: "10px" }}
          />
          <Line
            type="monotone"
            dataKey={metric}
            name={getMetricName(metric)}
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
