import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Câu hỏi thường gặp",
  description: "Các câu hỏi thường gặp về diverFi và DeFi",
};

const faqs = [
  {
    question: "diverFi là gì?",
    answer:
      "diverFi là nền tảng học DeFi và Crypto miễn phí dành cho người Việt. Chúng tôi cung cấp các khóa học từ cơ bản đến nâng cao, từ điển thuật ngữ, và dữ liệu thị trường real-time.",
  },
  {
    question: "Tôi cần gì để bắt đầu học?",
    answer:
      "Bạn không cần bất kỳ kiến thức nào trước đó. Các khóa học được thiết kế cho người mới bắt đầu hoàn toàn. Chỉ cần có máy tính hoặc điện thoại và kết nối internet.",
  },
  {
    question: "Học có mất phí không?",
    answer:
      "Không. Tất cả nội dung trên diverFi đều miễn phí 100%. Chúng tôi tin rằng kiến thức về tài chính nên được tiếp cận bởi tất cả mọi người.",
  },
  {
    question: "DeFi có rủi ro không?",
    answer:
      "Có. DeFi mang lại nhiều cơ hội nhưng cũng đi kèm rủi ro đáng kể: smart contract bugs, rug pulls, impermanent loss, volatility... Bạn nên hiểu rõ rủi ro trước khi tham gia và chỉ đầu tư số tiền sẵn sàng mất.",
  },
  {
    question: "Tôi cần bao nhiêu tiền để bắt đầu DeFi?",
    answer:
      "Về kỹ thuật, bạn có thể bắt đầu với số tiền rất nhỏ. Tuy nhiên, bạn cần tính đến gas fee. Trên Ethereum mainnet, gas có thể tốn $5-50+ cho mỗi giao dịch. Các Layer 2 như Arbitrum, Optimism có phí thấp hơn nhiều ($0.1-1).",
  },
  {
    question: "Làm sao để biết một dự án DeFi có an toàn?",
    answer:
      "Một số yếu tố cần kiểm tra: (1) Đội ngũ có công khai danh tính không, (2) Code có được audit bởi công ty uy tín không, (3) TVL và thời gian hoạt động, (4) Cộng đồng có thực sự không (hay toàn bot), (5) Tokenomics có hợp lý không.",
  },
  {
    question: "Seed phrase bị lộ thì làm sao?",
    answer:
      "Nếu seed phrase bị lộ, bạn nên chuyển NGAY tài sản sang ví mới. Không có cách nào 'đổi' seed phrase - bạn phải tạo ví hoàn toàn mới và chuyển tiền sang.",
  },
  {
    question: "APY cao có phải lừa đảo?",
    answer:
      "Không nhất thiết, nhưng cần cẩn thận. APY cao thường đến từ: (1) Token inflation (bạn kiếm token đang mất giá), (2) Rủi ro cao (impermanent loss, smart contract risk), (3) Scam. APY >100% nên được xem xét kỹ, APY >1000% gần như chắc chắn không bền vững.",
  },
  {
    question: "Dữ liệu thị trường lấy từ đâu?",
    answer:
      "Chúng tôi sử dụng API từ DefiLlama - nguồn dữ liệu DeFi đáng tin cậy và được sử dụng rộng rãi trong ngành. Dữ liệu được cập nhật real-time.",
  },
  {
    question: "Tôi có thể đóng góp nội dung không?",
    answer:
      "Có! diverFi là dự án mã nguồn mở. Bạn có thể đóng góp bằng cách tạo pull request trên GitHub hoặc liên hệ với chúng tôi qua Twitter.",
  },
];

export default function FAQPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Câu hỏi thường gặp</h1>
        <p className="text-muted-foreground mt-2">
          Giải đáp các thắc mắc phổ biến về diverFi và DeFi
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-muted/30 rounded-lg text-center">
        <p className="text-muted-foreground">
          Không tìm thấy câu trả lời bạn cần?{" "}
          <a
            href="https://twitter.com/diverfi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            Liên hệ với chúng tôi
          </a>
        </p>
      </div>
    </div>
  );
}
