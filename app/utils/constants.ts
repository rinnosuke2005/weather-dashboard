// utils/constants.ts

// 1. 都市名と緯度経度（lat, lon）の変換表
// export をつけることで、他のファイルから呼び出せるようになります
// 札幌（lat: 43.0642, lon: 141.3468）」
// 「那覇（lat: 26.2124, lon: 127.6809）」
export const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  tokyo: { lat: 35.6895, lon: 139.6917 },
  osaka: { lat: 34.6937, lon: 135.5023 },
  nagoya: { lat: 35.1815, lon: 136.9066 },
  fukuoka: { lat: 33.5902, lon: 130.4017 },
  sapporo: {lat: 43.0642, lon: 141.3468},
  naha :{lat: 26.2124, lon: 127.6809},
};

// 2. SWRがデータを取りに行くための「お使い係（fetcher）」関数
// これも色々な場所で使い回せるように切り出しておきます
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
