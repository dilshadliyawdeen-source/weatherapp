import React, { useState, useEffect } from "react";
import { getRuntimeConfig } from "./runtimeConfig";

const API_KEY = getRuntimeConfig().REACT_APP_OWM_API_KEY;

function formatTemp(kelvin) {
  if (kelvin == null) return "—";
  return `${Math.round(kelvin - 273.15)}°C`;
}

function dayFromTimestamp(ts) {
  const d = new Date(ts * 1000);
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState(null);
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchByCity("London");
  }, []);

  async function fetchByCity(name) {
    if (!name) return;
    setLoading(true);
    setError("");
    try {
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(name)}&appid=${API_KEY}`
      );
      if (!currentRes.ok) throw new Error("City fetch failed");
      const currentJson = await currentRes.json();
      setCity({ name: `${currentJson.name}, ${currentJson.sys?.country || ""}` });
      setCurrent(currentJson);

      const { coord } = currentJson;
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`
      );
      if (!forecastRes.ok) throw new Error("Forecast fetch failed");
      const forecastJson = await forecastRes.json();
      setForecast(summarizeForecastToDaily(forecastJson.list));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch weather");
      setCity(null);
      setCurrent(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }

  function summarizeForecastToDaily(list) {
    const days = {};
    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toISOString().slice(0, 10);
      if (!days[dayKey]) days[dayKey] = [];
      days[dayKey].push(item);
    });
    return Object.keys(days)
      .slice(0, 5)
      .map((d) => {
        const items = days[d];
        let best = items[0];
        let bestDiff = Math.abs(new Date(best.dt * 1000).getHours() - 12);
        for (const it of items) {
          const diff = Math.abs(new Date(it.dt * 1000).getHours() - 12);
          if (diff < bestDiff) {
            best = it;
            bestDiff = diff;
          }
        }
        return best;
      });
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    fetchByCity(query.trim());
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Weather App</h1>
      </header>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 rounded border"
          placeholder="Enter city (e.g. Tokyo)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="px-3 py-2 rounded bg-blue-600 text-white">
          Search
        </button>
      </form>

      {loading && <div>Loading…</div>}
      {error && <div className="text-red-600">Error: {error}</div>}

      {current && (
        <section className="mb-4">
          <div className="flex items-center gap-4">
            <img
              alt={current.weather?.[0]?.description || "weather"}
              src={`https://openweathermap.org/img/wn/${current.weather?.[0]?.icon}@2x.png`}
              width={80}
              height={80}
            />
            <div>
              <div className="text-2xl font-bold">{city?.name}</div>
              <div className="text-3xl mt-1">{formatTemp(current.main?.temp)}</div>
            </div>
          </div>
        </section>
      )}

      {forecast.length > 0 && (
        <section>
          <h2 className="font-medium mb-2">5-day forecast</h2>
          <div className="grid grid-cols-5 gap-2">
            {forecast.map((f) => (
              <div key={f.dt} className="p-2 rounded bg-gray-50 text-center">
                <div className="text-sm">{dayFromTimestamp(f.dt)}</div>
                <img
                  alt={f.weather?.[0]?.description}
                  src={`https://openweathermap.org/img/wn/${f.weather?.[0]?.icon}.png`}
                  width={50}
                  height={50}
                  className="mx-auto"
                />
                <div className="text-sm mt-1">{formatTemp(f.main?.temp)}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
