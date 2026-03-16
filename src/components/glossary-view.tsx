"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Term, categoryLabels } from "@/lib/glossary";
import { Search } from "lucide-react";

interface Props {
  terms: Term[];
  groupedTerms: Record<string, Term[]>;
}

export function GlossaryView({ terms, groupedTerms }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  // Available categories (only those with terms)
  const availableCategories = categoryOrder.filter(
    (cat) => groupedTerms[cat] && groupedTerms[cat].length > 0
  );

  const filteredTerms = useMemo(() => {
    let result = terms;

    // Filter by category first
    if (selectedCategory) {
      result = result.filter((term) => term.category === selectedCategory);
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (term) =>
          term.term.toLowerCase().includes(query) ||
          term.fullName.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query)
      );
    }

    return result;
  }, [terms, searchQuery, selectedCategory]);

  const showGroupedView = !searchQuery.trim() && !selectedCategory;

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

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          Tất cả ({terms.length})
        </Button>
        {availableCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {categoryLabels[category] || category} ({groupedTerms[category].length})
          </Button>
        ))}
      </div>

      {/* Results count */}
      {(searchQuery.trim() || selectedCategory) && (
        <p className="text-sm text-muted-foreground">
          {filteredTerms.length} kết quả
          {selectedCategory && ` trong ${categoryLabels[selectedCategory]}`}
          {searchQuery.trim() && ` cho "${searchQuery}"`}
        </p>
      )}

      {/* Results */}
      {showGroupedView ? (
        /* Grouped View */
        <div className="space-y-8">
          {categoryOrder.map((category) => {
            const categoryTerms = groupedTerms[category];
            if (!categoryTerms || categoryTerms.length === 0) return null;

            return (
              <section key={category} id={category.toLowerCase()}>
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
      ) : (
        /* Filtered View */
        <div className="space-y-4">
          {filteredTerms.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Không tìm thấy thuật ngữ phù hợp
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredTerms.map((term) => (
                <TermCard key={term.term} term={term} showCategory />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TermCard({ term, showCategory = false }: { term: Term; showCategory?: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex flex-wrap items-center gap-2">
          <span className="text-primary font-bold">{term.term}</span>
          {term.term !== term.fullName && (
            <span className="text-sm font-normal text-muted-foreground">
              ({term.fullName})
            </span>
          )}
          {showCategory && (
            <Badge variant="outline" className="text-xs font-normal">
              {categoryLabels[term.category] || term.category}
            </Badge>
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
