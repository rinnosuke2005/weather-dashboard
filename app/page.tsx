// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import ControlPanel from "../components/ControlPanel";
import WeatherChart from "../components/WeatherChart";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useWeatherSettings } from "@/hooks/useWeatherSettings";

export default function Home() {
  const { city, setCity, metric, setMetric, range, setRange, unit, setUnit } = useWeatherSettings();

  const { chartData, error, isLoading, mutate } = useWeatherData(city, range, unit, metric);

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-100 via-blue-50 to-indigo-200 pb-12 overflow-x-hidden font-sans text-gray-800">
      <div className="w-full max-w-7xl mx-auto pt-10 px-4 md:px-8">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-500">
            Weather Forecast
          </span>
        </h1>

        <h2 className="text-center text-sm md:text-base mb-10 text-gray-500 font-medium tracking-wide">
          リアルタイム天気予報ダッシュボード
        </h2>


        {/* ControlPanel */}
        <div className="mb-8">
          <ControlPanel
            city={city}
            setCity={setCity}
            metric={metric}
            setMetric={setMetric}
            range={range}
            setRange={setRange}
            unit={unit}
            setUnit={setUnit}
          />
        </div>

        {/* グラフエリア */}
        {isLoading ? (
          <div className="w-full bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/50 h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-600 font-bold animate-pulse">
                データを取得中...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full bg-red-50/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-red-100 h-[400px] flex flex-col items-center justify-center">
            <p className="text-red-500 font-bold mb-4">
              データの取得に失敗しました
            </p>
            <button
              onClick={() => mutate()}
              className="px-6 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-md active:scale-95"
            >
              再読み込みを試す
            </button>
          </div>
        ) : (
          <WeatherChart data={chartData} metric={metric} unit={unit} />
        )}
      </div>
    </main>
  );
}
