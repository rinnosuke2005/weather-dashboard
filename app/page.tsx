"use client";

import { useEffect, useState } from "react";
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

// ★APIから取得するまでの「仮の天気データ」
const dummyData = [
  { time: "12:00", temperature_2m: 20 },
  { time: "15:00", temperature_2m: 22 },
  { time: "18:00", temperature_2m: 19 },
  { time: "21:00", temperature_2m: 16 },
  { time: "00:00", temperature_2m: 15 },
  { time: "03:00", temperature_2m: 14 },
];

export default function Home() {
  const [city, setCity] = useState("tokyo");
  const [metric, setMetric] = useState("temperature_2m");
  const [range, setRange] = useState("48h");
  const [unit, setUnit] = useState<string>("celsius");

  return (
    <main>
      <h1 className="text-center text-5xl container mx-auto my-5">
        Weather Forecast
      </h1>
      <h2 className="text-center container mx-auto">
        リアルタイム天気予報ダッシュボード
      </h2>

      {/* {UIコンポーネント} */}
      <div className="flex gap-4 mx-8 bg-blue-200/50 p-4 rounded-lg my-5">
        {/* {1. 都市の選択} */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="city-select"
            className="text-sm font-medium text-gray-700 text-center mb-1"
          >
            都市を選択
          </label>
          <select
            id="city-select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-10 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="tokyo">東京</option>
            <option value="osaka">大阪</option>
            <option value="nagoya">名古屋</option>
            <option value="fukuoka">福岡</option>
          </select>
        </div>

        {/* {2. 指標を選択} */}
        <div className="flex flex-col flex-1">
          <label
            htmlFor="metric-select"
            className="text-sm font-medium text-gray-700 text-center mb-1"
          >
            表示指標を選択
          </label>
          <select
            id="metric-select"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="w-full h-10 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="temperature_2m">気温</option>
            <option value="apparent_temperature">体感温度</option>
            <option value="precipitation">降水量</option>
            <option value="wind_speed_10m">風速</option>
          </select>
        </div>

        {/* {3. 期間を選択} */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-gray-700 text-center mb-1">
            表示期間
          </label>
          <div className="flex bg-gray-100 p-1 rounded-md border border-gray-300 h-10">
            <label
              className={`cursor-pointer flex-1 flex items-center justify-center rounded-md text-sm transition-colors ${range === "48h" ? "bg-white shadow-sm text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}
            >
              <input
                type="radio"
                value="48h"
                checked={range === "48h"}
                onChange={(e) => setRange(e.target.value)}
                className="hidden"
              />
              48時間
            </label>
            <label
              className={`cursor-pointer flex-1 flex items-center justify-center rounded-md text-sm transition-colors ${range === "7days" ? "bg-white shadow-sm text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}
            >
              <input
                type="radio"
                value="7days"
                checked={range === "7days"}
                onChange={(e) => setRange(e.target.value)}
                className="hidden"
              />
              7日間
            </label>
          </div>
        </div>

        {/* {4. 単位} */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium text-gray-700 text-center mb-1">
            単位
          </label>
          <div className="flex bg-gray-100 p-1 rounded-md border border-gray-300 h-10">
            <label
              className={`cursor-pointer flex-1 flex items-center justify-center rounded-md text-sm transition-colors ${unit === "celsius" ? "bg-white shadow-sm text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}
            >
              <input
                type="radio"
                value="celsius"
                checked={unit === "celsius"}
                onChange={(e) => setUnit(e.target.value)}
                className="hidden"
              />
              °C
            </label>
            <label
              className={`cursor-pointer flex-1 flex items-center justify-center rounded-md text-sm transition-colors ${unit === "fahrenheit" ? "bg-white shadow-sm text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}
            >
              <input
                type="radio"
                value="fahrenheit"
                checked={unit === "fahrenheit"}
                onChange={(e) => setUnit(e.target.value)}
                className="hidden"
              />
              °F
            </label>
          </div>
        </div>
      </div>

      {/* {グラフ表示} */}
      <div className="mx-8 bg-white p-6 rounded-lg shadow-md border border-gray-200 h-[400px]">
        {/* レスポンシブ対応のグラフコンテナ */}
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="focus:outline-none"
        >
          {/* ★修正：style={{ outline: "none" }} を追加して黒い枠線を消す */}
          <LineChart
            data={dummyData}
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
            {/* ★修正：align="left" を追加して左上に配置。おまけで iconType="circle" で丸いアイコンにして可愛くしました */}
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
              name={
                metric === "temperature_2m"
                  ? "気温"
                  : metric === "apparent_temperature"
                    ? "体感温度"
                    : metric === "precipitation"
                      ? "降水量"
                      : "風速"
              }
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
