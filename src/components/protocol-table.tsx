"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatTvl, formatChange, type Protocol } from "@/lib/defillama";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  protocols: Protocol[];
  totalTvl: number;
  updatedAt: string;
}

type SortField = "tvl" | "change_1d" | "change_7d" | "name";
type SortDirection = "asc" | "desc";

export function ProtocolTable({ protocols, totalTvl, updatedAt }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("tvl");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(protocols.map((p) => p.category))];
    return cats.sort();
  }, [protocols]);

  // Filter and sort protocols
  const filteredProtocols = useMemo(() => {
    let result = protocols;

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower) ||
          p.chains.some((c) => c.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    result = [...result].sort((a, b) => {
      let aVal: number | string;
      let bVal: number | string;

      switch (sortField) {
        case "tvl":
          aVal = a.tvl;
          bVal = b.tvl;
          break;
        case "change_1d":
          aVal = a.change_1d ?? 0;
          bVal = b.change_1d ?? 0;
          break;
        case "change_7d":
          aVal = a.change_7d ?? 0;
          bVal = b.change_7d ?? 0;
          break;
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortDirection === "asc") {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    return result;
  }, [protocols, search, selectedCategory, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng TVL DeFi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatTvl(totalTvl)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Protocols
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{protocols.length}+</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cập nhật
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {new Date(updatedAt).toLocaleString("vi-VN")}
            </p>
            <Badge variant="secondary" className="mt-1">
              Auto refresh 5 phút
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm protocol, category, chain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            Tất cả
          </Badge>
          {categories.slice(0, 6).map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Protocols Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Top DeFi Protocols theo TVL
            {filteredProtocols.length !== protocols.length && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filteredProtocols.length} kết quả)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">#</th>
                  <th className="text-left p-4 font-medium">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center hover:text-foreground"
                    >
                      Protocol
                      <SortIcon field="name" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-right p-4 font-medium">
                    <button
                      onClick={() => handleSort("tvl")}
                      className="flex items-center justify-end w-full hover:text-foreground"
                    >
                      TVL
                      <SortIcon field="tvl" />
                    </button>
                  </th>
                  <th className="text-right p-4 font-medium">
                    <button
                      onClick={() => handleSort("change_1d")}
                      className="flex items-center justify-end w-full hover:text-foreground"
                    >
                      1d %
                      <SortIcon field="change_1d" />
                    </button>
                  </th>
                  <th className="text-right p-4 font-medium">
                    <button
                      onClick={() => handleSort("change_7d")}
                      className="flex items-center justify-end w-full hover:text-foreground"
                    >
                      7d %
                      <SortIcon field="change_7d" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProtocols.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      Không tìm thấy protocol nào
                    </td>
                  </tr>
                ) : (
                  filteredProtocols.map((protocol, index) => {
                    const change1d = formatChange(protocol.change_1d);
                    const change7d = formatChange(protocol.change_7d);

                    return (
                      <tr
                        key={protocol.id}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-4 text-muted-foreground">{index + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {protocol.logo && (
                              <img
                                src={protocol.logo}
                                alt={protocol.name}
                                className="w-6 h-6 rounded-full"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display =
                                    "none";
                                }}
                              />
                            )}
                            <div>
                              <p className="font-medium">{protocol.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {protocol.chains.slice(0, 3).join(", ")}
                                {protocol.chains.length > 3 &&
                                  ` +${protocol.chains.length - 3}`}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{protocol.category}</Badge>
                        </td>
                        <td className="p-4 text-right font-medium">
                          {formatTvl(protocol.tvl)}
                        </td>
                        <td
                          className={`p-4 text-right ${
                            change1d.isPositive
                              ? "text-green-600 dark:text-green-400"
                              : change1d.isNegative
                              ? "text-red-600 dark:text-red-400"
                              : ""
                          }`}
                        >
                          {change1d.text}
                        </td>
                        <td
                          className={`p-4 text-right ${
                            change7d.isPositive
                              ? "text-green-600 dark:text-green-400"
                              : change7d.isNegative
                              ? "text-red-600 dark:text-red-400"
                              : ""
                          }`}
                        >
                          {change7d.text}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Data source */}
      <p className="text-sm text-muted-foreground text-center">
        Dữ liệu từ{" "}
        <a
          href="https://defillama.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          DefiLlama
        </a>
      </p>
    </div>
  );
}
