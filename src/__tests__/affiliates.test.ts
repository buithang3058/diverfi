import { describe, it, expect } from "vitest";
import { getAffiliatesForTrack, AFFILIATES, TRACK_AFFILIATES } from "@/config/affiliates";

describe("getAffiliatesForTrack", () => {
  it("returns correct affiliates for defi-basics", () => {
    const result = getAffiliatesForTrack("defi-basics");
    expect(result.map((a) => a.id)).toEqual(["binance", "uniswap", "aave"]);
  });

  it("returns correct affiliates for trading", () => {
    const result = getAffiliatesForTrack("trading");
    expect(result.map((a) => a.id)).toEqual(["binance", "okx", "bybit"]);
  });

  it("falls back to binance+okx for unknown track", () => {
    const result = getAffiliatesForTrack("unknown-track");
    expect(result.map((a) => a.id)).toEqual(["binance", "okx"]);
  });

  it("returns non-empty array for all defined tracks", () => {
    for (const track of Object.keys(TRACK_AFFILIATES)) {
      const result = getAffiliatesForTrack(track);
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it("all returned affiliates have required fields", () => {
    const result = getAffiliatesForTrack("defi-basics");
    for (const a of result) {
      expect(a.id).toBeTruthy();
      expect(a.name).toBeTruthy();
      expect(a.url).toBeTruthy();
      expect(a.cta).toBeTruthy();
    }
  });

  it("all affiliate URLs contain UTM params", () => {
    for (const affiliate of Object.values(AFFILIATES)) {
      expect(affiliate.url).toContain("utm_source=diverfi");
    }
  });
});
