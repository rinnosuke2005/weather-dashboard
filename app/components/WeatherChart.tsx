// components/WeatherChart.tsx
"use client";

import {
  AreaChart,
  Area,
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
  unit: string;
}

export default function WeatherChart({
  data,
  metric,
  unit,
}: WeatherChartProps) {
  const getMetricName = (metricValue: string) => {
    switch (metricValue) {
      case "temperature_2m": return "気温";
      case "apparent_temperature": return "体感温度";
      case "precipitation": return "降水量";
      case "wind_speed_10m": return "風速";
      default: return metricValue;
    }
  };

  const getUnitSymbol = (metricValue: string) => {
    switch (metricValue) {
      case "temperature_2m":
      case "apparent_temperature":
        return unit === "celsius" ? "℃" : "℉";
      case "precipitation": return "mm";
      case "wind_speed_10m": return "km/h";
      default: return "";
    }
  };

  const getLineColor = (metricValue: string) => {
    switch (metricValue) {
      case "temperature_2m": return "#ff6b6b"; 
      case "apparent_temperature": return "#ee5253"; 
      case "precipitation": return "#2e86de"; 
      case "wind_speed_10m": return "#1dd1a1"; 
      default: return "#9c88ff"; 
    }
  };

  const unitSymbol = getUnitSymbol(metric);
  const displayName = `${getMetricName(metric)} (${unitSymbol})`;
  const lineColor = getLineColor(metric);
  const gradientId = `gradient-${metric}`;

  // ==========================================
  // ★ 新機能：12時間ごとだけ表示するためのカスタム関数
  // ==========================================
// 1. カスタムドット
  const renderCustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    
    // データが50個（約48時間分）より多い＝「7日間」と判断
    const isLongTerm = data.length > 50;

    if (isLongTerm) {
      // 7日間の時は 00:00 と 12:00 だけドットを表示
      if (payload.time.endsWith("00:00") || payload.time.endsWith("12:00")) {
        return <circle key={`dot-${payload.time}`} cx={cx} cy={cy} r={4} stroke={lineColor} strokeWidth={2} fill="#ffffff" />;
      }
      return null;
    }

    // 48時間の時はすべてのポイントにドットを表示（以前のいい感じのスタイル）
    return <circle key={`dot-${payload.time}`} cx={cx} cy={cy} r={4} stroke={lineColor} strokeWidth={2} fill="#ffffff" />;
  };

  // 2. カスタムX軸ラベル
const renderCustomAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const isLongTerm = data.length > 50;

    // 表示条件の判定（7日間なら12hおき、48hなら6hおき）
    const shouldShow = isLongTerm 
      ? (payload.value.endsWith("00:00") || payload.value.endsWith("12:00"))
      : (payload.value.endsWith("00:00") || payload.value.endsWith("06:00") || payload.value.endsWith("12:00") || payload.value.endsWith("18:00"));

    if (shouldShow) {
      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            dy={10}
            textAnchor="end" // 右端を軸に合わせる
            fill="#374151"
            fontSize={11}
            fontWeight={600}
            transform="rotate(-35)" // ★ ここで35度斜めにする
          >
            {payload.value}
          </text>
        </g>
      );
    }
    return null;
  };


  return (
    <div className="w-full bg-white/30 backdrop-blur-2xl p-4 md:p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/50 h-[350px] md:h-[400px] flex flex-col transition-all duration-500">
      
      <div className="text-xl font-extrabold text-gray-700 mb-6 pl-2 tracking-wide drop-shadow-sm">
        {displayName}
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%" className="focus:outline-none">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, bottom: 25, left: 10 }}
            style={{ outline: "none" }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff"
              opacity={0.6}
              vertical={false}
            />

            {/* ★ 修正: カスタムラベル関数を適用。interval={0} で間引きをRecharts任せにせず自分で制御！ */}
            <XAxis
              dataKey="time"
              tick={renderCustomAxisTick} 
              interval={0} 
              axisLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
              tickLine={false}
            />

            <YAxis
              stroke="#374151"
              tick={{ fontSize: 12, fontWeight: 600 }}
              tickFormatter={(value) => `${value}${unitSymbol}`}
              tickMargin={10}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.6)", 
                backdropFilter: "blur(16px)",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.6)",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                color: "#1f2937",
                fontWeight: "bold"
              }}
              itemStyle={{ color: lineColor }}
              formatter={(value: any) => [
                `${value} ${unitSymbol}`,
                getMetricName(metric),
              ]}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              height={40}
              iconType="circle"
              wrapperStyle={{ paddingTop: "40px" }}
            />

            {/* ★ 修正: カスタムドット関数を適用 */}
            <Area
              type="monotone" 
              dataKey={metric}
              name={displayName}
              stroke={lineColor} 
              strokeWidth={4} 
              strokeOpacity={0.9} 
              fill={`url(#${gradientId})`} 
              dot={renderCustomDot} 
              activeDot={{ r: 7, strokeWidth: 0, fill: lineColor }} 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}