import Link from "next/link";

export const metadata = {
  title: "Về diverFi",
  description:
    "diverFi được xây dựng bởi người đã mất tiền 3 lần trong crypto — và vẫn ở lại. Đây là câu chuyện thật và lý do tại sao nền tảng này tồn tại.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">

      {/* Hook */}
      <section className="mb-12">
        <p className="text-2xl font-semibold leading-snug mb-3">
          Tháng 9/2018, tôi mất hơn 50% tiền tiết kiệm trong hơn 2 tháng.
        </p>
        <p className="text-xl text-muted-foreground font-medium">
          Tôi không phải người mới.
        </p>
      </section>

      {/* Reality Mirror */}
      <section className="mb-12">
        <p className="text-base leading-relaxed mb-4">
          Nếu bạn nghĩ mất tiền trong crypto là vì <strong>thiếu hiểu biết</strong>, bạn đang sai.
        </p>
        <p className="text-base leading-relaxed mb-4">
          Tôi đọc whitepaper. Tôi hiểu blockchain. Tôi biết cách phân tích dự án.
          Tôi vẫn mất tiền — không phải một lần.
        </p>
        <p className="text-base leading-relaxed">
          Và có lẽ bạn cũng đang ở đâu đó trên hành trình đó.
        </p>
      </section>

      {/* Decision Timeline */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-5 text-muted-foreground uppercase tracking-wider text-sm">
          Những quyết định thật
        </h2>
        <div className="space-y-4">
          {[
            {
              year: "2018",
              text: "Tôi đổ tiền vào các dự án Ponzi vì tin rằng mình hiểu thị trường hơn người khác.",
            },
            {
              year: "2019–2020",
              text: "Tôi DCA kỷ luật, dành hơn 50% thu nhập mỗi tháng. Lần đầu tiên portfolio tăng vượt sức tưởng tượng.",
            },
            {
              year: "2020",
              text: "Tôi có thể dừng. Đủ để nghỉ hưu sống an nhàn. Tôi không dừng.",
            },
            {
              year: "2022",
              text: "LUNA sụp đổ. Tôi mất rất nhiều vì FOMO và không giữ được kỷ luật.",
            },
            {
              year: "2025",
              text: "Thị trường đang lên. Tôi lại FOMO. Lại mất — vì không chịu tìm hiểu kỹ và không giữ vững nguyên tắc.",
            },
          ].map((item) => (
            <div key={item.year} className="flex gap-5">
              <span className="text-sm font-mono font-semibold text-primary min-w-[60px] pt-0.5">
                {item.year}
              </span>
              <p className="text-base text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Real Problem */}
      <section className="mb-12 border-l-4 border-primary pl-5 py-1">
        <p className="text-base leading-relaxed mb-3">
          Vấn đề không phải là bạn thiếu thông tin.
        </p>
        <p className="text-base leading-relaxed font-medium">
          Vấn đề là thông tin đúng vẫn không đủ khi thị trường bắt đầu kéo bạn ngược chiều.
        </p>
      </section>

      {/* Why diverFi exists */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Tại sao diverFi tồn tại</h2>
        <p className="text-base leading-relaxed mb-4">
          Tôi mất 7 năm để hiểu một điều: <strong>biết đúng không đủ — phải giữ được khi mọi thứ đang sai.</strong>
        </p>
        <p className="text-base leading-relaxed mb-4">
          diverFi không được xây dựng bởi một editorial team không có skin in the game.
          Không phải bởi một công ty muốn bán khóa học.
        </p>
        <p className="text-base leading-relaxed">
          Nó được xây dựng bởi người đã trải qua — mất tiền, học bài, thắng, lại mất, vẫn ở lại —
          vì không muốn bạn mất 7 năm mới hiểu ra những điều này.
        </p>
      </section>

      {/* What diverFi does */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">diverFi làm gì</h2>
        <p className="text-base leading-relaxed mb-4 text-muted-foreground">
          diverFi không dạy bạn kiếm tiền nhanh.
        </p>
        <div className="space-y-3">
          {[
            "Hiểu bạn đang đánh đổi cái gì — không phải chỉ lợi nhuận",
            "Nhìn thấy rủi ro trước khi quá muộn — không phải sau khi mất tiền",
            "Giữ được quyết định đúng khi thị trường đang kéo bạn — đây mới là thứ khó nhất",
          ].map((item, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-primary font-semibold mt-0.5">→</span>
              <p className="text-base leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who this is NOT for */}
      <section className="mb-12 bg-muted/40 rounded-lg p-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Không dành cho bạn nếu
        </p>
        <p className="text-base leading-relaxed">
          Nếu bạn đang tìm cách làm giàu nhanh từ crypto, diverFi không phải nơi bạn cần.
          Có rất nhiều nơi khác sẽ cho bạn thấy những con số APY 1000% và câu chuyện x100.
        </p>
        <p className="text-base leading-relaxed mt-3 text-muted-foreground">
          Ở đây, chúng tôi nói thật — kể cả khi sự thật không hấp dẫn.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center py-4">
        <p className="text-base text-muted-foreground mb-5">
          Nếu bạn muốn hiểu DeFi đủ để dùng thực tế — không bị lừa, không bị mất tiền oan —
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-base font-medium hover:bg-primary/90 transition-colors"
        >
          Bắt đầu học
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          Miễn phí. Không cần đăng ký.
        </p>
      </section>

    </div>
  );
}
