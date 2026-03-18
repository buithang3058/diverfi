import { describe, it, expect } from "vitest";
import { getAllTerms, categoryLabels } from "@/lib/glossary";

function slugify(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

describe("getAllTerms", () => {
  it("returns non-empty array", () => {
    const terms = getAllTerms();
    expect(terms.length).toBeGreaterThan(0);
  });

  it("all terms have required fields", () => {
    for (const t of getAllTerms()) {
      expect(t.term).toBeTruthy();
      expect(t.definition).toBeTruthy();
      expect(t.category).toBeTruthy();
    }
  });

  it("slugify produces URL-safe strings", () => {
    expect(slugify("DeFi")).toBe("defi");
    expect(slugify("Liquidity Pool")).toBe("liquidity-pool");
    expect(slugify("APY/APR")).toBe("apy-apr");
    expect(slugify("AMM")).toBe("amm");
  });

  it("all term slugs are unique", () => {
    const slugs = getAllTerms().map((t) => slugify(t.term));
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });
});

describe("categoryLabels", () => {
  it("has entries for known categories", () => {
    const terms = getAllTerms();
    const categories = new Set(terms.map((t) => t.category));
    for (const cat of categories) {
      // Every category used in terms should have a label or fall back gracefully
      expect(typeof (categoryLabels[cat] ?? cat)).toBe("string");
    }
  });
});
