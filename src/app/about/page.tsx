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
            { year: "2018", text: "Tôi mất tiền vì Ponzi." },
            { year: "2019–2020", text: "Tôi DCA và giữ kỷ luật." },
            { year: "2020", text: "Tôi có thể dừng. Tôi không dừng." },
            { year: "2022", text: "Tôi thiếu cảnh giác khi sự kiện LUNA xảy ra." },
            { year: "2025", text: "Tôi tiếp tục mất tiền vì FOMO." },
          ].map((item) => (
            <div key={item.year} className="flex gap-6 items-baseline">
              <span className="font-mono text-sm font-semibold text-primary min-w-[72px]">
                {item.year}
              </span>
              <p className="text-base text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Truth */}
      <section className="border-l-4 border-primary pl-5 space-y-3">
        <p className="text-base leading-relaxed">
          Bạn không mất tiền vì thiếu thông tin.
        </p>
        <p className="text-base leading-relaxed font-semibold">
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
