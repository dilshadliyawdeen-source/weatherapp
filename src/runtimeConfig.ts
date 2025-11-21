export function getRuntimeConfig() {
  if (typeof window !== "undefined" && (window as any).__APP_CONFIG__) {
    return (window as any).__APP_CONFIG__;
  }
  return {
    REACT_APP_OWM_API_KEY: process.env.REACT_APP_OWM_API_KEY ?? "",
    APP_NAME: process.env.APP_NAME ?? "Weather Vite TS"
  };
}
