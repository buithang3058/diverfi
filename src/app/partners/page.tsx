import type { Metadata } from "next";
import { Mail, Users, BookOpen, BarChart2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Đối tác & Tài trợ",
  description:
    "Tiếp cận hàng nghìn người dùng DeFi Việt Nam. Tài trợ bài học, banner hoặc email newsletter.",
};

const STATS = [
  { icon: Users, value: "10,000+", label: "Người học mỗi tháng" },
  { icon: BookOpen, value: "40+", label: "Bài học chuyên sâu" },
  { icon: BarChart2, value: "Top 3", label: "Vietnam DeFi adoption" },
];

const PACKAGES = [
  {
    name: "Bronze",
    price: "$500",
    period: "/ tháng",
    badge: null,
    description: "Phù hợp để thử nghiệm thị trường Việt Nam",
    features: [
      "Logo + link trong 1 bài học liên quan",
      "Mention trong newsletter (nếu có)",
      "Affiliate link tracking báo cáo hàng tháng",
    ],
  },
  {
    name: "Silver",
    price: "$1,500",
    period: "/ tháng",
    badge: "Phổ biến",
    description: "Hiện diện rõ ràng trên toàn nền tảng",
    features: [
      "Logo + link trong tất cả bài học của 1 track",
      "1 bài học sponsored (do diverFi viết, gắn nhãn tài trợ)",
      "Banner trên trang chủ",
      "Shoutout trên Telegram community",
      "Báo cáo click hàng tuần",
    ],
  },
  {
    name: "Gold",
    price: "$3,000",
    period: "/ tháng",
    badge: "Premium",
    description: "Đối tác chiến lược — tối đa visibility",
    features: [
      "Logo + link trên toàn bộ nền tảng",
      "3 bài học sponsored mỗi tháng",
      "Co-branded content (video, infographic)",
      "Featured trong Telegram Mini App",
      "Dedicated landing page trên diverFi",
      "Báo cáo analytics đầy đủ",
      "Quyền review nội dung trước khi đăng",
    ],
  },
];

const CONTACT_EMAIL = "hello@diverfi.app";

function buildMailtoLink(packageName: string) {
  const subject = encodeURIComponent(`[Đối tác] ${packageName} Package — Yêu cầu thông tin`);
  const body = encodeURIComponent(
    `Xin chào diverFi team,\n\nTôi quan tâm đến gói ${packageName}.\n\nThông tin liên hệ:\n- Tên công ty / protocol: \n- Website: \n- Người liên hệ: \n- Ngân sách dự kiến: \n- Mục tiêu tài trợ: \n\nVui lòng liên hệ lại với tôi.\n\nTrân trọng`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export default function PartnersPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Đối tác & Tài trợ
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Tiếp cận cộng đồng DeFi Việt Nam
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          diverFi là nền tảng học DeFi hàng đầu tại Việt Nam — quốc gia nằm trong top 3 thế giới về
          mức độ áp dụng crypto. Đưa protocol của bạn đến tay người dùng đang sẵn sàng tham gia DeFi.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-16">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="text-center p-6 rounded-xl border bg-muted/30">
            <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-muted-foreground mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Why diverFi */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Tại sao tài trợ diverFi?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: "Người dùng có intent cao",
              desc: "Học viên đang chủ động học DeFi — họ sẵn sàng dùng protocol ngay sau khi hiểu cách hoạt động.",
            },
            {
              title: "Thị trường ngách chưa bão hòa",
              desc: "Ít đối thủ cạnh tranh hơn so với thị trường tiếng Anh. Chi phí mỗi người dùng thấp hơn nhiều.",
            },
            {
              title: "Nội dung giáo dục = tin tưởng",
              desc: "Sponsored content trong bối cảnh học tập có tỉ lệ chuyển đổi cao hơn quảng cáo banner thông thường.",
            },
            {
              title: "Tracking rõ ràng",
              desc: "Mỗi affiliate link có UTM tracking riêng. Bạn biết chính xác bao nhiêu người dùng đến từ diverFi.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="p-4 rounded-lg border">
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Gói tài trợ</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-xl border p-6 ${
                pkg.badge === "Phổ biến"
                  ? "border-primary shadow-sm ring-1 ring-primary"
                  : ""
              }`}
            >
              {pkg.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {pkg.badge}
                </Badge>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground text-sm">{pkg.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={pkg.badge === "Phổ biến" ? "default" : "outline"}
                className="w-full"
                nativeButton={false}
                render={
                  <Link
                    href={buildMailtoLink(pkg.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Liên hệ ngay
              </Button>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center mt-6">
          Giá trên tính bằng USD. Có thể thương lượng cho hợp đồng dài hạn (3-6 tháng).
        </p>
      </div>

      {/* Custom inquiry */}
      <div className="rounded-xl border bg-muted/30 p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Cần gói tùy chỉnh?</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Nếu bạn có yêu cầu đặc biệt hoặc muốn thảo luận về hợp tác dài hạn, hãy liên hệ trực tiếp.
          Chúng tôi sẽ phản hồi trong vòng 24 giờ.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={
            <Link
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("[Đối tác] Yêu cầu gói tùy chỉnh")}`}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <Mail className="mr-2 h-4 w-4" />
          {CONTACT_EMAIL}
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          Hoặc tìm hiểu thêm về{" "}
          <Link href="/learn" className="underline underline-offset-2">
            nội dung học
          </Link>{" "}
          và{" "}
          <Link href="/markets" className="underline underline-offset-2">
            dữ liệu thị trường
          </Link>{" "}
          trên diverFi.
        </p>
      </div>
    </div>
  );
}
