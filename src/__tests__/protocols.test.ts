import { describe, it, expect } from "vitest";
import { getProtocol, PROTOCOLS } from "@/config/protocols";

describe("getProtocol", () => {
  it("returns protocol for valid slug", () => {
    const result = getProtocol("uniswap");
    expect(result).toBeDefined();
    expect(result?.name).toBe("Uniswap");
  });

  it("returns undefined for unknown slug", () => {
    expect(getProtocol("nonexistent")).toBeUndefined();
  });

  it("all protocols have required fields", () => {
    for (const p of PROTOCOLS) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.pros.length).toBeGreaterThan(0);
      expect(p.risks.length).toBeGreaterThan(0);
      expect(p.chain.length).toBeGreaterThan(0);
      expect(p.url).toContain("utm_source=diverfi");
    }
  });

  it("slug matches entry slug", () => {
    for (const p of PROTOCOLS) {
      expect(getProtocol(p.slug)).toBe(p);
    }
  });
});
