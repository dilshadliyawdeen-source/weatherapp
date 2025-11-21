export interface CurrentWeather {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  main: { temp: number; feels_like: number; pressure: number; humidity: number };
  wind: { speed: number };
  sys: { country?: string };
  name: string;
  dt: number;
}

export interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: { icon: string; main: string; description: string }[];
}
