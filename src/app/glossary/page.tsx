import { getAllTerms, getTermsByCategory } from "@/lib/glossary";
import { GlossaryView } from "@/components/glossary-view";

export const metadata = {
  title: "Thuật ngữ Crypto & DeFi",
  description:
    "Từ điển thuật ngữ crypto và DeFi tiếng Việt. Giải thích dễ hiểu APY, TVL, Liquidity Pool, Smart Contract và nhiều hơn nữa.",
};

export default function GlossaryPage() {
  const terms = getAllTerms();
  const groupedTerms = getTermsByCategory();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Thuật ngữ Crypto & DeFi
        </h1>
        <p className="text-muted-foreground mt-2">
          Từ điển các thuật ngữ phổ biến — giải thích đơn giản, dễ hiểu cho người
          mới bắt đầu
        </p>
      </div>

      <GlossaryView terms={terms} groupedTerms={groupedTerms} />
    </div>
  );
}
