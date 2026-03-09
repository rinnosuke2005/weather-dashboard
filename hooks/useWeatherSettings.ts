// hooks/useWeatherSettings.ts
import { useState, useEffect } from "react";

export const useWeatherSettings = () => {

    const [city, setCity] = useState("tokyo");
  const [metric, setMetric] = useState("temperature_2m");
  const [range, setRange] = useState("48h");
  const [unit, setUnit] = useState<string>("celsius");

  useEffect(() => {
    const savedCity = localStorage.getItem("weather_city");
    const savedMetric = localStorage.getItem("weather_metric");
    const savedRange = localStorage.getItem("weather_range");
    const savedUnit = localStorage.getItem("weather_unit");

    if (savedCity) setCity(savedCity);
    if (savedMetric) setMetric(savedMetric);
    if (savedRange) setRange(savedRange);
    if (savedUnit) setUnit(savedUnit);
  }, []);

  useEffect(() => {
    localStorage.setItem("weather_city", city);
    localStorage.setItem("weather_metric", metric);
    localStorage.setItem("weather_range", range);
    localStorage.setItem("weather_unit", unit);
  }, [city, metric, range, unit]);

  return {
    city, setCity,
    metric, setMetric,
    range, setRange,
    unit, setUnit,
  };
};