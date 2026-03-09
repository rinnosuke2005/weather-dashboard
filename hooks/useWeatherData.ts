import useSWR from "swr";
import { CITY_COORDINATES, fetcher } from "@/utils/constants";

// 外部から都市、期間、単位、指標を受け取る関数を作ります
export const useWeatherData = (city: string, range: string, unit: string, metric: string) => {
  // 1. 選ばれている都市の「緯度・経度」を取得
  const { lat, lon } = CITY_COORDINATES[city];

  // 2. 期間（48時間 or 7日間）から、APIに渡す日数を決定
  const forecastDays = range === "48h" ? 2 : 7;

  // 3. APIのURLを動的に組み立てる
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=${unit}&timezone=auto&forecast_days=${forecastDays}`;
  
  // 4. SWRでデータを取得
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  // 5. データをグラフ用に整形
  let chartData: any[] = [];
  if (data && data.hourly) {
    chartData = data.hourly.time.map((timeStr: string, index: number) => {
      const date = new Date(timeStr);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      const formattedTime = `${month}/${day} ${hour}:${minute}`;
      
      return {
        time: formattedTime,
        [metric]: data.hourly[metric][index],
      };
    });
  }

  // 6. page.tsx で使いたいものだけを「おまとめセット」にして返す
  return {
    chartData,
    error,
    isLoading,
    mutate,
  };
};