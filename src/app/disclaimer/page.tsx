export const metadata = {
  title: "Tuyên bố miễn trách nhiệm — diverFi",
  description:
    "diverFi là trang học, không phải tư vấn đầu tư. Mọi quyết định tài chính là của bạn.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-10">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">Tuyên bố miễn trách nhiệm</h1>
        <p className="text-sm text-muted-foreground">Cập nhật: tháng 3/2026</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Không phải lời khuyên tài chính</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Nội dung trên diverFi là để học. Không phải để ra quyết định đầu tư.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Không có bài nào trên diverFi là khuyến nghị mua, bán, hay giữ bất kỳ tài sản nào.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Quyết định là của bạn</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Bạn đọc xong rồi bạn quyết định. Nếu bạn mất tiền, đó là quyết định của bạn — không phải của diverFi.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Chỉ dùng số tiền bạn chấp nhận mất hoàn toàn.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Affiliate</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Một số link trên diverFi là affiliate — Binance, OKX, Uniswap, Aave. Nếu bạn đăng ký qua link đó, diverFi nhận hoa hồng.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Điều đó không làm thay đổi nội dung chúng tôi viết.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Rủi ro</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Crypto có thể về 0. Smart contract có thể bị hack. Protocol có thể sập. Tôi đã mất tiền vì những điều này.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Không có đảm bảo lợi nhuận. Số liệu APY trong bài thay đổi theo ngày.
        </p>
      </section>

    </div>
  );
}
