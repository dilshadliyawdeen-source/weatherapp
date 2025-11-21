import React, { useState, useEffect } from "react";
import { getRuntimeConfig } from "./runtimeConfig";
import { useWeather } from "./hooks/useWeather";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";

export default function App() {
  const cfg = getRuntimeConfig();
  const apiKey = cfg.REACT_APP_OWM_API_KEY;
  const { current, forecast, loading, error, getWeatherByCity } = useWeather();
  const [city, setCity] = useState("Colombo");

  useEffect(() => {
    if (apiKey) getWeatherByCity(city, apiKey);
  }, []); // eslint-disable-line

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!city || !apiKey) return;
    getWeatherByCity(city, apiKey);
  }

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1>{cfg.APP_NAME}</h1>

      <form onSubmit={onSearch} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City name, e.g. London" />
        <button disabled={!apiKey}>Search</button>
      </form>

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: "crimson" }}>Error: {error}</div>}

      {current && <WeatherCard data={current} />}

      <ForecastList items={forecast} />
    </div>
  );
}
