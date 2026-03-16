import termsData from "@/../content/glossary/terms.json";

export interface Term {
  term: string;
  fullName: string;
  definition: string;
  category: string;
}

export function getAllTerms(): Term[] {
  return termsData as Term[];
}

export function getTermsByCategory(): Record<string, Term[]> {
  const terms = getAllTerms();
  const grouped: Record<string, Term[]> = {};

  for (const term of terms) {
    if (!grouped[term.category]) {
      grouped[term.category] = [];
    }
    grouped[term.category].push(term);
  }

  // Sort terms within each category
  for (const category of Object.keys(grouped)) {
    grouped[category].sort((a, b) => a.term.localeCompare(b.term));
  }

  return grouped;
}

export function searchTerms(query: string): Term[] {
  const terms = getAllTerms();
  const lowerQuery = query.toLowerCase();

  return terms.filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.fullName.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery)
  );
}

export const categoryLabels: Record<string, string> = {
  Basics: "Cơ bản",
  DeFi: "DeFi",
  Trading: "Giao dịch",
  Yield: "Lãi suất",
  Blockchain: "Blockchain",
  Tokens: "Token",
  Metrics: "Chỉ số",
  Security: "Bảo mật",
  Risks: "Rủi ro",
};
