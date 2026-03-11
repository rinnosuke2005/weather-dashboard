// components/ControlPanel.tsx
"use client";

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
  city,
  setCity,
  metric,
  setMetric,
  range,
  setRange,
  unit,
  setUnit,
}: ControlPanelProps) {
  // 見出しのスタイル
  const labelClass =
    "text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-2 drop-shadow-sm";

  return (
    //  親枠
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full bg-white/30 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/50">
      {/* {1. 都市の選択} */}
      <div className="flex flex-col flex-1">
        <label htmlFor="city-select" className={labelClass}>
          Location
        </label>
        <select
          id="city-select"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full h-11 pl-4 pr-10 text-gray-700 font-bold tracking-wide bg-white/40 backdrop-blur-md border border-white/60 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer hover:bg-white/50 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_12px_center] bg-[length:16px_16px]"
        >
          {/*  optionに直接 className を当てて文字色をコントロール！ */}
          <option value="tokyo" className="text-gray-600 font-medium">
            東京 (Tokyo)
          </option>
          <option value="osaka" className="text-gray-600 font-medium">
            大阪 (Osaka)
          </option>
          <option value="nagoya" className="text-gray-600 font-medium">
            名古屋 (Nagoya)
          </option>
          <option value="fukuoka" className="text-gray-600 font-medium">
            福岡 (Fukuoka)
          </option>
          <option value="sapporo" className="text-gray-600 font-medium">
            札幌 (Sapporo)
          </option>
          <option value="naha" className="text-gray-600 font-medium">
            那覇 (Naha)
          </option>
        </select>
      </div>

      {/* {2. 指標を選択} */}
      <div className="flex flex-col flex-1">
        <label htmlFor="metric-select" className={labelClass}>
          Metric
        </label>
        <select
          id="metric-select"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="w-full h-11 pl-4 pr-10 text-gray-700 font-bold tracking-wide bg-white/40 backdrop-blur-md border border-white/60 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer hover:bg-white/50 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_12px_center] bg-[length:16px_16px]"
        >
          <option value="temperature_2m" className="text-gray-600 font-medium">
            気温
          </option>
          <option
            value="apparent_temperature"
            className="text-gray-600 font-medium"
          >
            体感温度
          </option>
          <option value="precipitation" className="text-gray-600 font-medium">
            降水量
          </option>
          <option value="wind_speed_10m" className="text-gray-600 font-medium">
            風速
          </option>
        </select>
      </div>

      {/* {3. 期間を選択} */}
      <div className="flex flex-col flex-1 border-none p-0 m-0">
        <div className={labelClass}>Range</div>
        <div className="flex bg-white/20 p-1 rounded-xl h-11 border border-white/40 shadow-inner">
          <label
            className={`cursor-pointer flex-1 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 ${
              range === "48h"
                ? "bg-white/90 shadow-md text-blue-600 scale-[0.98]"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/30"
            } has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400`}
          >
            <input
              type="radio"
              name="range"
              value="48h"
              checked={range === "48h"}
              onChange={(e) => setRange(e.target.value)}
              className="sr-only"
            />
            48時間
          </label>
          <label
            className={`cursor-pointer flex-1 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 ${
              range === "7days"
                ? "bg-white/90 shadow-md text-blue-600 scale-[0.98]"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/30"
            } has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400`}
          >
            <input
              type="radio"
              name="range"
              value="7days"
              checked={range === "7days"}
              onChange={(e) => setRange(e.target.value)}
              className="sr-only"
            />
            7日間
          </label>
        </div>
      </div>

      {/* {4. 単位} */}
      <div className="flex flex-col flex-1 border-none p-0 m-0">
        <div className={labelClass}>Unit</div>
        <div className="flex bg-white/20 p-1 rounded-xl h-11 border border-white/40 shadow-inner">
          <label
            className={`cursor-pointer flex-1 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 ${
              unit === "celsius"
                ? "bg-white/90 shadow-md text-blue-600 scale-[0.98]"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/30"
            } has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400`}
          >
            <input
              type="radio"
              name="unit"
              value="celsius"
              checked={unit === "celsius"}
              onChange={(e) => setUnit(e.target.value)}
              className="sr-only"
            />
            °C
          </label>
          <label
            className={`cursor-pointer flex-1 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-300 ${
              unit === "fahrenheit"
                ? "bg-white/90 shadow-md text-blue-600 scale-[0.98]"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/30"
            } has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400`}
          >
            <input
              type="radio"
              name="unit"
              value="fahrenheit"
              checked={unit === "fahrenheit"}
              onChange={(e) => setUnit(e.target.value)}
              className="sr-only"
            />
            °F
          </label>
        </div>
      </div>
    </div>
  );
}
