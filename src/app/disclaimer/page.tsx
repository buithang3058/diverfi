export const metadata = {
  title: "Tuyên bố miễn trách nhiệm — diverFi",
  description:
    "diverFi cung cấp nội dung giáo dục về DeFi và crypto. Không phải lời khuyên tài chính. Mọi quyết định đầu tư là của bạn.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-12">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">
          Tuyên bố miễn trách nhiệm
        </h1>
        <p className="text-sm text-muted-foreground">
          Cập nhật lần cuối: tháng 3/2026
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Không phải lời khuyên tài chính</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Toàn bộ nội dung trên diverFi — bài học, thuật ngữ, phân tích, tin tức — chỉ
          mang tính chất giáo dục và tham khảo. Không có nội dung nào là lời khuyên
          đầu tư, tư vấn tài chính, hoặc khuyến nghị mua/bán bất kỳ tài sản nào.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Nếu bạn cần tư vấn tài chính cá nhân, hãy liên hệ chuyên gia có chứng chỉ.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Bạn tự chịu trách nhiệm</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Mọi quyết định đầu tư là của bạn. diverFi không chịu trách nhiệm về bất kỳ
          kết quả tài chính nào phát sinh từ quyết định đó — dù lãi hay lỗ.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Trước khi tham gia bất kỳ protocol hay sàn giao dịch nào, hãy tự nghiên cứu
          (DYOR) và chỉ dùng số tiền bạn chấp nhận mất hoàn toàn.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Liên kết affiliate</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Một số liên kết trong bài viết là affiliate link — diverFi có thể nhận hoa
          hồng khi bạn đăng ký hoặc sử dụng dịch vụ qua những link đó (Binance, OKX,
          Uniswap, Aave và các platform khác).
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Điều này không ảnh hưởng đến nội dung chúng tôi viết và không làm tăng chi
          phí của bạn. Chúng tôi chỉ đề xuất những platform đã được nghiên cứu kỹ.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Rủi ro của crypto và DeFi</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Crypto và DeFi có rủi ro rất cao. Giá trị tài sản có thể giảm về 0. Smart
          contract có thể bị hack. Protocol có thể sập. Bạn có thể mất toàn bộ số
          tiền đầu tư.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Các số liệu APY, TVL, và lợi nhuận trong bài viết phản ánh thời điểm được
          ghi lại và có thể thay đổi đáng kể. Không có đảm bảo lợi nhuận trong tương
          lai.
        </p>
      </section>

      <section className="border-l-4 border-primary pl-5">
        <p className="text-base leading-relaxed">
          diverFi được xây dựng bởi người đã mất tiền trong crypto và hiểu rõ rủi ro.
          Mục tiêu duy nhất là giúp bạn hiểu đúng — không phải giúp bạn kiếm tiền nhanh.
        </p>
      </section>

    </div>
  );
}
