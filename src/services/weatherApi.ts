import axios from "axios";
import { CurrentWeather, ForecastItem } from "../types/weather";

const OWM_BASE = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrentWeather(city: string, apiKey: string): Promise<CurrentWeather> {
  const res = await axios.get(`${OWM_BASE}/weather`, {
    params: { q: city, appid: apiKey, units: "metric" }
  });
  return res.data;
}

export async function fetchForecastByCoords(lat: number, lon: number, apiKey: string): Promise<ForecastItem[]> {
  const res = await axios.get(`${OWM_BASE}/forecast`, {
    params: { lat, lon, appid: apiKey, units: "metric" }
  });
  return res.data.list;
}
