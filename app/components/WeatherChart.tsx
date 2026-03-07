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

interface WeatherChartProps {
  data: any[];
  metric: string;
  unit: string; // ★追加: unit（celsius/fahrenheit）を親から受け取る
}

export default function WeatherChart({
  data,
  metric,
  unit,
}: WeatherChartProps) {
  // 指標名を取得する関数
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

  // ★修正：単位を正確に返すようにしました
  const getUnitSymbol = (metricValue: string) => {
    switch (metricValue) {
      case "temperature_2m":
      case "apparent_temperature":
        return unit === "celsius" ? "℃" : "℉"; // unitの状態を見て切り替え
      case "precipitation":
        return "mm";
      case "wind_speed_10m":
        return "km/h";
      default:
        return "";
    }
  };

  const unitSymbol = getUnitSymbol(metric);
  const displayName = `${getMetricName(metric)} (${unitSymbol})`;

  return (
    <div className="mx-8 bg-white p-6 rounded-lg shadow-md border border-gray-200 h-[400px]">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="focus:outline-none"
      >
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, bottom: 20, left: 10 }}
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

          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            // YAxisの目盛りにも単位を表示
            tickFormatter={(value) => `${value}${unitSymbol}`}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(value: any) => [
              `${value} ${unitSymbol}`,
              getMetricName(metric),
            ]}
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
            // ★ここを displayName にすることで、Legendに「気温 (℃)」のように表示されます
            name={displayName}
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
