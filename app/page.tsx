// app/page.tsx
"use client";

import { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import WeatherChart from "./components/WeatherChart";
// 仮のデータ
const dummyData = [
  { time: "12:00", temperature_2m: 20 },
  { time: "15:00", temperature_2m: 22 },
  { time: "18:00", temperature_2m: 19 },
  { time: "21:00", temperature_2m: 16 },
  { time: "00:00", temperature_2m: 15 },
  { time: "03:00", temperature_2m: 14 },
];

export default function Home() {
  // すべての状態（State）はここで一元管理する
  const [city, setCity] = useState("tokyo");
  const [metric, setMetric] = useState("temperature_2m");
  const [range, setRange] = useState("48h");
  const [unit, setUnit] = useState<string>("celsius");

  return (
    <main className="pb-10">
      <h1 className="text-center text-5xl container mx-auto my-5">
        Weather Forecast
      </h1>
      <h2 className="text-center container mx-auto mb-8">
        リアルタイム天気予報ダッシュボード
      </h2>

      {/* 切り出した操作パネルを呼び出し、Propsを渡す */}
      <ControlPanel 
        city={city} setCity={setCity}
        metric={metric} setMetric={setMetric}
        range={range} setRange={setRange}
        unit={unit} setUnit={setUnit}
      />

      {/* 切り出したグラフを呼び出し、Propsを渡す */}
      <WeatherChart 
        data={dummyData} 
        metric={metric} 
      />
    </main>
  );
}