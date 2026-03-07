// app/page.tsx
"use client";

import { useState } from "react";
import useSWR from "swr";
import ControlPanel from "./components/ControlPanel";
import WeatherChart from "./components/WeatherChart";
import { CITY_COORDINATES, fetcher } from "@/app/utils/constants";

// const dummyData = [
//   { time: "12:00", temperature_2m: 20 },
//   { time: "15:00", temperature_2m: 22 },
//   { time: "18:00", temperature_2m: 19 },
//   { time: "21:00", temperature_2m: 16 },
//   { time: "00:00", temperature_2m: 15 },
//   { time: "03:00", temperature_2m: 14 },
// ];

export default function Home() {
  const [city, setCity] = useState("tokyo");
  const [metric, setMetric] = useState("temperature_2m");
  const [range, setRange] = useState("48h");
  const [unit, setUnit] = useState<string>("celsius");

  // 1. 選ばれている都市の「緯度・経度」を取得
  const { lat, lon } = CITY_COORDINATES[city];

  // 2. 期間（48時間 or 7日間）から、APIに渡す日数を決定
  const forecastDays = range === "48h" ? 2 : 7;

  // 3. APIのURLを動的に組み立てる（Stateが変わるたびにここも変わります！）
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=${unit}&timezone=auto&forecast_days=${forecastDays}`;
  // 4. SWRの魔法！URLとfetcherを渡すだけで、データの取得・キャッシュ・ローディング状態を全部やってくれる
  const { data, error, isLoading } = useSWR(apiUrl, fetcher);

  // 5. Open-Meteoのデータを、Rechartsが読める形に整形（フォーマット）する
  let chartData = [];
  if (data && data.hourly) {
    // data.hourly.time の配列をぐるぐる回して、Recharts用の配列を作る
    chartData = data.hourly.time.map((timeStr: string, index: number) => {
      // 日付の文字列（"2026-03-07T12:00"）を「3月7日 12時」のように読みやすくする
      const date = new Date(timeStr);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      const formattedTime = `${month}/${day} ${hour}:${minute}`;
      return {
        time: formattedTime,
        // ここが重要！今選ばれている指標（metric）の数値をセットする
        [metric]: data.hourly[metric][index],
      };
    });
  }

  // ... (StateやSWRのロジックは一切変更なし！) ...

  return (
    // ★大枠1: 背景をただのグレーから、美しい「空」を思わせるグラデーションに変更！
    // 画面全体に広がるように `min-h-screen` と `bg-gradient-to-br` を使用
    <main className="min-h-screen bg-linear-to-br from-blue-100 via-blue-50 to-indigo-200 pb-12 overflow-x-hidden font-sans text-gray-800">
      {/* ★大枠2: ヘッダー部分に余白を持たせ、タイトルをアプリ風に */}
      <div className="w-full max-w-7xl mx-auto pt-10 px-4 md:px-8">
        {/* ★大枠3: タイトルを「ただの文字」から「グラデーションテキスト」にして一気に垢抜けさせる */}
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-500">
            Weather Forecast
          </span>
        </h1>

        <h2 className="text-center text-sm md:text-base mb-10 text-gray-500 font-medium tracking-wide">
          リアルタイム天気予報ダッシュボード
        </h2>

        {/* ーーー ここから下がコンポーネントエリア ーーー */}

        {/* ControlPanelを少し浮かせるための余白調整 */}
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
            <p className="text-red-500 font-bold mb-2">
              データの取得に失敗しました
            </p>
            <p className="text-sm text-red-400">
              しばらく経ってから再度お試しください
            </p>
          </div>
        ) : (
          <WeatherChart data={chartData} metric={metric} unit={unit} />
        )}
      </div>
    </main>
  );
}
