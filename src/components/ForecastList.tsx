import React from "react";
import { ForecastItem } from "../types/weather";

function timeFromDT(dt: number) {
  return new Date(dt * 1000).toLocaleString(undefined, { weekday: "short", hour: "numeric" });
}

export default function ForecastList({ items }: { items: ForecastItem[] }) {
  if (!items.length) return null;
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 12, overflowX: "auto" }}>
      {items.map((it) => (
        <div key={it.dt} style={{ minWidth: 120, padding: 8, borderRadius: 8, background: "#f8fafc", textAlign: "center" }}>
          <div style={{ fontSize: 12 }}>{timeFromDT(it.dt)}</div>
          <img src={`https://openweathermap.org/img/wn/${it.weather[0].icon}.png`} alt="" />
          <div style={{ fontWeight: 600 }}>{Math.round(it.main.temp)}°C</div>
          <div style={{ fontSize: 12, color: "#666" }}>{it.weather[0].main}</div>
        </div>
      ))}
    </div>
  );
}
