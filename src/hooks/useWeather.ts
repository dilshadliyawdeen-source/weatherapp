import { useState } from "react";
import { fetchCurrentWeather, fetchForecastByCoords } from "../services/weatherApi";
import { CurrentWeather, ForecastItem } from "../types/weather";

export function useWeather() {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  async function getWeatherByCity(city: string, apiKey: string) {
    setLoading(true);
    setError("");
    try {
      const cw = await fetchCurrentWeather(city, apiKey);
      setCurrent(cw);
      const list = await fetchForecastByCoords(cw.coord.lat, cw.coord.lon, apiKey);
      setForecast(list.slice(0, 5 * 8)); // keep up to 5 days of 3h entries
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err.message ?? "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  return { current, forecast, loading, error, getWeatherByCity };
}
