import { getRuntimeConfig } from "../runtimeConfig";

describe("runtimeConfig", () => {
  it("falls back to process.env when window config missing", () => {
    const config = getRuntimeConfig();
    expect(config).toHaveProperty("REACT_APP_OWM_API_KEY");
  });
});
