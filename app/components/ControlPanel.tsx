// components/ControlPanel.tsx
"use client";

// 親から受け取るPropsの型定義（TSの得意技です！）
interface ControlPanelProps {
  city: string;
  setCity: (city: string) => void;
  metric: string;
  setMetric: (metric: string) => void;
  range: string;
  setRange: (range: string) => void;
  unit: string;
  setUnit: (unit: string) => void;
}

export default function ControlPanel({
  city, setCity,
  metric, setMetric,
  range, setRange,
  unit, setUnit
}: ControlPanelProps) {
  return (
    <div className="flex gap-4 mx-8 bg-blue-200/50 p-4 rounded-lg my-5">
      {/* {1. 都市の選択} */}
      <div className="flex flex-col flex-1">
        <label htmlFor="city-select" className="text-sm font-medium text-gray-700 text-center mb-1">都市を選択</label>
        <select id="city-select" value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-10 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
          <option value="tokyo">東京</option>
          <option value="osaka">大阪</option>
          <option value="nagoya">名古屋</option>
          <option value="fukuoka">福岡</option>
        </select>
      </div>

      {/* {2. 指標を選択} */}
      <div className="flex flex-col flex-1">
        <label htmlFor="metric-select" className="text-sm font-medium text-gray-700 text-center mb-1">表示指標を選択</label>
        <select id="metric-select" value={metric} onChange={(e) => setMetric(e.target.value)} className="w-full h-10 px-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
          <option value="temperature_2m">気温</option>
          <option value="apparent_temperature">体感温度</option>
          <option value="precipitation">降水量</option>
          <option value="wind_speed_10m">風速</option>
        </select>
      </div>

      {/* {3. 期間を選択} */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium text-gray-700 text-center mb-1">表示期間</label>
        <div className="flex bg-gray-100 p-1 rounded-md border border-gray-300 h-10">
          <label className={`cursor-pointer flex-1 flex items-center justify-center rounded-md text-sm transition-colors ${range === "48h" ? "bg-white shadow-sm text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}>
            <input type="radio" value="48h" checked={range === "48h"} onChange={(e) => setRange(e.target.value)} className="hidden" /> 48時間
          </label>
          <label className={`cursor-pointer flex-1 flex items-center justify-center rounded-md text-sm transition-colors ${range === "7days" ? "bg-white shadow-sm text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}>
            <input type="radio" value="7days" checked={range === "7days"} onChange={(e) => setRange(e.target.value)} className="hidden" /> 7日間
          </label>
        </div>
      </div>

      {/* {4. 単位} */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium text-gray-700 text-center mb-1">単位</label>
        <div className="flex bg-gray-100 p-1 rounded-md border border-gray-300 h-10">
          <label className={`cursor-pointer flex-1 flex items-center justify-center rounded-md text-sm transition-colors ${unit === "celsius" ? "bg-white shadow-sm text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}>
            <input type="radio" value="celsius" checked={unit === "celsius"} onChange={(e) => setUnit(e.target.value)} className="hidden" /> °C
          </label>
          <label className={`cursor-pointer flex-1 flex items-center justify-center rounded-md text-sm transition-colors ${unit === "fahrenheit" ? "bg-white shadow-sm text-blue-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}>
            <input type="radio" value="fahrenheit" checked={unit === "fahrenheit"} onChange={(e) => setUnit(e.target.value)} className="hidden" /> °F
          </label>
        </div>
      </div>
    </div>
  );
}