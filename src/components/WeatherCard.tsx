import React from "react";
import { CurrentWeather } from "../types/weather";

export default function WeatherCard({ data }: { data: CurrentWeather }) {
  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const icon = data.weather?.[0]?.icon;
  return (
    <div style={{ padding: 16, borderRadius: 12, background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather" />
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{data.name} {data.sys?.country ? `, ${data.sys.country}` : ""}</div>
          <div style={{ fontSize: 28 }}>{temp}°C</div>
          <div style={{ color: "#666" }}>Feels like {feels}°C • Humidity {data.main.humidity}%</div>
        </div>
      </div>
    </div>
  );
}