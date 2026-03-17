"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, AlertTriangle } from "lucide-react";

// APY Calculator
function APYCalculator() {
  const [principal, setPrincipal] = useState<string>("1000");
  const [apy, setApy] = useState<string>("10");
  const [days, setDays] = useState<string>("365");
  const [compoundFreq, setCompoundFreq] = useState<string>("365");

  const results = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(apy) / 100 || 0;
    const t = parseFloat(days) / 365 || 0;
    const n = parseFloat(compoundFreq) || 365;

    // Simple interest
    const simpleInterest = p * r * t;
    const simpleTotal = p + simpleInterest;

    // Compound interest
    const compoundTotal = p * Math.pow(1 + r / n, n * t);
    const compoundInterest = compoundTotal - p;

    // Effective APY
    const effectiveAPY = (Math.pow(1 + r / n, n) - 1) * 100;

    return {
      simpleInterest: simpleInterest.toFixed(2),
      simpleTotal: simpleTotal.toFixed(2),
      compoundInterest: compoundInterest.toFixed(2),
      compoundTotal: compoundTotal.toFixed(2),
      effectiveAPY: effectiveAPY.toFixed(2),
      difference: (compoundInterest - simpleInterest).toFixed(2),
    };
  }, [principal, apy, days, compoundFreq]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="principal">Số vốn ban đầu (USD)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="1000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apy">APY (%)</Label>
          <Input
            id="apy"
            type="number"
            value={apy}
            onChange={(e) => setApy(e.target.value)}
            placeholder="10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="days">Số ngày đầu tư</Label>
          <Input
            id="days"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="365"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="compound">Số lần compound/năm</Label>
          <Input
            id="compound"
            type="number"
            value={compoundFreq}
            onChange={(e) => setCompoundFreq(e.target.value)}
            placeholder="365"
          />
          <p className="text-xs text-muted-foreground">
            365 = hàng ngày, 52 = hàng tuần, 12 = hàng tháng
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lãi đơn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">
              ${results.simpleTotal}
            </div>
            <p className="text-sm text-muted-foreground">
              Lãi: ${results.simpleInterest}
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Lãi kép (Compound)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${results.compoundTotal}
            </div>
            <p className="text-sm text-muted-foreground">
              Lãi: ${results.compoundInterest}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span>Chênh lệch (compound vs simple):</span>
          <span className="font-medium text-green-600">
            +${results.difference}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>APY hiệu quả (với compound):</span>
          <span className="font-medium">{results.effectiveAPY}%</span>
        </div>
      </div>
    </div>
  );
}

// Impermanent Loss Calculator
function ImpermanentLossCalculator() {
  const [initialPrice, setInitialPrice] = useState<string>("1000");
  const [currentPrice, setCurrentPrice] = useState<string>("1500");
  const [lpValue, setLpValue] = useState<string>("1000");

  const results = useMemo(() => {
    const p0 = parseFloat(initialPrice) || 1;
    const p1 = parseFloat(currentPrice) || 1;
    const lp = parseFloat(lpValue) || 0;

    // Price ratio
    const priceRatio = p1 / p0;

    // IL formula: 2 * sqrt(price_ratio) / (1 + price_ratio) - 1
    const ilPercent =
      (2 * Math.sqrt(priceRatio)) / (1 + priceRatio) - 1;
    const ilPercentAbs = Math.abs(ilPercent) * 100;

    // If just held (50/50 split)
    const holdValue = lp * (1 + (priceRatio - 1) / 2);

    // LP value after IL
    const lpValueAfter = holdValue * (1 + ilPercent);

    // IL in USD
    const ilUsd = holdValue - lpValueAfter;

    return {
      priceChange: ((priceRatio - 1) * 100).toFixed(2),
      ilPercent: ilPercentAbs.toFixed(2),
      holdValue: holdValue.toFixed(2),
      lpValueAfter: lpValueAfter.toFixed(2),
      ilUsd: ilUsd.toFixed(2),
    };
  }, [initialPrice, currentPrice, lpValue]);

  const priceChangeNum = parseFloat(results.priceChange);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="initialPrice">Giá ban đầu (USD)</Label>
          <Input
            id="initialPrice"
            type="number"
            value={initialPrice}
            onChange={(e) => setInitialPrice(e.target.value)}
            placeholder="1000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentPrice">Giá hiện tại (USD)</Label>
          <Input
            id="currentPrice"
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            placeholder="1500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lpValue">Giá trị LP ban đầu (USD)</Label>
          <Input
            id="lpValue"
            type="number"
            value={lpValue}
            onChange={(e) => setLpValue(e.target.value)}
            placeholder="1000"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Nếu chỉ HODL (không LP)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${results.holdValue}</div>
            <p className="text-sm text-muted-foreground">
              Thay đổi giá:{" "}
              <span
                className={
                  priceChangeNum >= 0 ? "text-green-600" : "text-red-600"
                }
              >
                {priceChangeNum >= 0 ? "+" : ""}
                {results.priceChange}%
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-500/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Giá trị LP sau IL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${results.lpValueAfter}</div>
            <p className="text-sm text-orange-600 dark:text-orange-400">
              IL: -{results.ilPercent}% (${results.ilUsd})
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
        <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
          Hiểu về Impermanent Loss
        </h4>
        <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
          <li>
            • IL xảy ra khi giá của token trong pool thay đổi so với lúc deposit
          </li>
          <li>• Giá thay đổi càng nhiều (lên hoặc xuống), IL càng lớn</li>
          <li>• IL được bù đắp bởi trading fees thu được từ LP</li>
          <li>• IL chỉ thực sự "mất" khi bạn rút LP</li>
        </ul>
      </div>

      {/* IL Reference Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Thay đổi giá</th>
              <th className="text-right py-2">IL</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td className="py-1.5">1.25x (tăng 25%)</td>
              <td className="text-right">0.6%</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5">1.5x (tăng 50%)</td>
              <td className="text-right">2.0%</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5">2x (tăng 100%)</td>
              <td className="text-right">5.7%</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5">3x (tăng 200%)</td>
              <td className="text-right">13.4%</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5">4x (tăng 300%)</td>
              <td className="text-right">20.0%</td>
            </tr>
            <tr>
              <td className="py-1.5">5x (tăng 400%)</td>
              <td className="text-right">25.5%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Gas Estimator
function GasEstimator() {
  const [gasPrice, setGasPrice] = useState<string>("30");
  const [ethPrice, setEthPrice] = useState<string>("3000");

  const gasAmounts = [
    { action: "ETH Transfer", gas: 21000 },
    { action: "ERC20 Transfer", gas: 65000 },
    { action: "ERC20 Approve", gas: 45000 },
    { action: "Uniswap Swap", gas: 150000 },
    { action: "Add Liquidity", gas: 200000 },
    { action: "Remove Liquidity", gas: 180000 },
    { action: "NFT Mint", gas: 120000 },
    { action: "NFT Transfer", gas: 85000 },
    { action: "Smart Contract Deploy", gas: 1500000 },
  ];

  const calculateCost = (gasUnits: number) => {
    const gp = parseFloat(gasPrice) || 0;
    const ep = parseFloat(ethPrice) || 0;
    const costEth = (gasUnits * gp) / 1e9;
    const costUsd = costEth * ep;
    return {
      eth: costEth.toFixed(6),
      usd: costUsd.toFixed(2),
    };
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="gasPrice">Gas Price (Gwei)</Label>
          <Input
            id="gasPrice"
            type="number"
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
            placeholder="30"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ethPrice">Giá ETH (USD)</Label>
          <Input
            id="ethPrice"
            type="number"
            value={ethPrice}
            onChange={(e) => setEthPrice(e.target.value)}
            placeholder="3000"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Loại giao dịch</th>
              <th className="text-right py-2">Gas (units)</th>
              <th className="text-right py-2">Chi phí (ETH)</th>
              <th className="text-right py-2">Chi phí (USD)</th>
            </tr>
          </thead>
          <tbody>
            {gasAmounts.map(({ action, gas }) => {
              const cost = calculateCost(gas);
              return (
                <tr key={action} className="border-b">
                  <td className="py-2">{action}</td>
                  <td className="text-right text-muted-foreground">
                    {gas.toLocaleString()}
                  </td>
                  <td className="text-right">{cost.eth}</td>
                  <td className="text-right font-medium">${cost.usd}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        * Gas thực tế có thể khác tùy thuộc vào độ phức tạp của smart contract
        và tình trạng mạng.
      </p>
    </div>
  );
}

export function DefiCalculators() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Máy tính DeFi
        </CardTitle>
        <CardDescription>
          Công cụ tính toán lợi nhuận, Impermanent Loss và phí gas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="apy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="apy">APY</TabsTrigger>
            <TabsTrigger value="il">Impermanent Loss</TabsTrigger>
            <TabsTrigger value="gas">Gas</TabsTrigger>
          </TabsList>
          <TabsContent value="apy" className="mt-4">
            <APYCalculator />
          </TabsContent>
          <TabsContent value="il" className="mt-4">
            <ImpermanentLossCalculator />
          </TabsContent>
          <TabsContent value="gas" className="mt-4">
            <GasEstimator />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
