"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTvl, formatChange, type Protocol } from "@/lib/defillama";

interface Props {
  protocols: Protocol[];
  totalTvl: number;
  updatedAt: string;
}

export function ProtocolTable({ protocols, totalTvl, updatedAt }: Props) {
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

      {/* Protocols Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Top DeFi Protocols theo TVL</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">#</th>
                  <th className="text-left p-4 font-medium">Protocol</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-right p-4 font-medium">TVL</th>
                  <th className="text-right p-4 font-medium">1d %</th>
                  <th className="text-right p-4 font-medium">7d %</th>
                </tr>
              </thead>
              <tbody>
                {protocols.map((protocol, index) => {
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
                })}
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
