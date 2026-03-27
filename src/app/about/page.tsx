import Link from "next/link";

export const metadata = {
  title: "Về diverFi",
  description:
    "diverFi được xây dựng bởi người đã mất tiền nhiều lần trong crypto — và vẫn ở lại. Đây là câu chuyện thật.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-16">

      {/* 1. Hook */}
      <section>
        <p className="text-2xl font-semibold leading-snug mb-3">
          Tháng 9/2018, tôi mất hơn 50% tiền tiết kiệm trong 2 tháng.
        </p>
        <p className="text-xl text-muted-foreground">
          Tôi không phải người mới.
        </p>
      </section>

      {/* 2. Timeline */}
      <section>
        <div className="space-y-5">
          {[
            { year: "2018", text: "Tôi mất tiền vì Ponzi.", danger: false },
            { year: "2019–2020", text: "Tôi DCA và giữ kỷ luật.", danger: false },
            { year: "2020", text: "Tôi có thể dừng. Tôi không dừng.", danger: false },
            { year: "2022", text: "Tôi thấy LUNA sập. Tôi không thoát.", danger: true },
            { year: "2025", text: "Tôi tiếp tục mất tiền vì FOMO.", danger: true },
          ].map((item) => (
            <div key={item.year} className="flex gap-6 items-baseline">
              <span className={`font-mono text-sm font-semibold min-w-[72px] ${item.danger ? "text-red-600" : "text-primary"}`}>
                {item.year}
              </span>
              <p className="text-base text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2.5 Credibility — RISK C: confession > credentials */}
      <section className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Tôi học IT, sau đó chuyển sang marketing. Tôi có nhiều năm làm trong lĩnh vực đầu tư và tài chính.
        </p>
        <p className="text-2xl font-semibold leading-snug">
          Tôi không thiếu thông tin.
        </p>
        <p className="text-base text-muted-foreground">
          Tôi chỉ nhiều lần không làm theo điều mình đã biết là đúng.
        </p>
      </section>

      {/* IMAGE: Ảnh thật của founder — candid, không phải headshot
           Kích thước: 640×400px, tỷ lệ 16:9 hoặc 4:3
           Style: trắng đen hoặc màu tự nhiên, không filter
           Alt: "Bui Thang — founder diverFi"
           Đặt: sau block credibility, trước Core Truth
           → Thêm <Image> khi có ảnh thật: src="/images/founder.jpg" className="w-full rounded-sm grayscale" />
      */}

      {/* 3. Core Truth — RISK A: poster moment, no border */}
      <section className="space-y-4">
        <p className="text-base text-muted-foreground">
          Bạn không mất tiền vì thiếu thông tin.
        </p>
        <p className="text-[28px] font-bold leading-tight">
          Bạn mất tiền vì bạn không làm theo những gì bạn đã biết là đúng.
        </p>
      </section>

      {/* 4. Why diverFi */}
      <section className="space-y-3">
        <p className="text-base leading-relaxed text-muted-foreground">
          diverFi không giúp bạn biết thêm.
        </p>
        <p className="text-base leading-relaxed font-semibold">
          diverFi giúp bạn không phá vỡ những gì bạn đã biết là đúng.
        </p>
      </section>

      {/* 5. Filter */}
      <section className="bg-muted/40 rounded-lg p-5">
        <p className="text-base leading-relaxed text-muted-foreground">
          Nếu bạn đang tìm cách làm giàu nhanh từ crypto, bạn không phù hợp với diverFi.
        </p>
      </section>

      {/* 6. CTA */}
      <section className="text-center space-y-4">
        <Link
          href="/learn"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-base font-medium hover:bg-primary/90 transition-colors"
        >
          Bắt đầu học
        </Link>
        <p className="text-sm text-muted-foreground">Miễn phí. Không cần đăng ký.</p>
      </section>

    </div>
  );
}
