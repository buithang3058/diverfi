"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { type Term, categoryLabels } from "@/lib/glossary";
import { Search } from "lucide-react";

interface Props {
  terms: Term[];
  groupedTerms: Record<string, Term[]>;
}

export function GlossaryView({ terms, groupedTerms }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = useMemo(() => {
    if (!searchQuery.trim()) {
      return null; // Show grouped view when no search
    }

    const query = searchQuery.toLowerCase();
    return terms.filter(
      (term) =>
        term.term.toLowerCase().includes(query) ||
        term.fullName.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query)
    );
  }, [terms, searchQuery]);

  const categoryOrder = [
    "Basics",
    "DeFi",
    "Trading",
    "Yield",
    "Blockchain",
    "Tokens",
    "Metrics",
    "Security",
    "Risks",
  ];

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm thuật ngữ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>{terms.length} thuật ngữ</span>
        <span>{Object.keys(groupedTerms).length} danh mục</span>
      </div>

      {/* Search Results */}
      {filteredTerms !== null ? (
        <div className="space-y-4">
          {filteredTerms.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Không tìm thấy thuật ngữ phù hợp với &quot;{searchQuery}&quot;
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredTerms.map((term) => (
                <TermCard key={term.term} term={term} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Grouped View */
        <div className="space-y-8">
          {categoryOrder.map((category) => {
            const categoryTerms = groupedTerms[category];
            if (!categoryTerms || categoryTerms.length === 0) return null;

            return (
              <section key={category}>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {categoryLabels[category] || category}
                  <Badge variant="secondary" className="font-normal">
                    {categoryTerms.length}
                  </Badge>
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {categoryTerms.map((term) => (
                    <TermCard key={term.term} term={term} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TermCard({ term }: { term: Term }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-primary font-bold">{term.term}</span>
          {term.term !== term.fullName && (
            <span className="text-sm font-normal text-muted-foreground">
              ({term.fullName})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {term.definition}
        </p>
      </CardContent>
    </Card>
  );
}
