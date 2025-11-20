export function getRuntimeConfig() {
  if (typeof window !== "undefined" && window.__APP_CONFIG__) {
    return window.__APP_CONFIG__;
  }
  return {
    REACT_APP_OWM_API_KEY: process.env.REACT_APP_OWM_API_KEY || ""
  };
}
