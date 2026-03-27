export const metadata = {
  title: "Chính sách nội dung — diverFi",
  description:
    "diverFi viết nội dung theo tiêu chuẩn nào, có affiliate không, và ai chịu trách nhiệm nếu thông tin sai.",
};

export default function ContentPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-12">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">Chính sách nội dung</h1>
        <p className="text-sm text-muted-foreground">Cập nhật lần cuối: tháng 3/2026</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Trang này để làm gì</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          diverFi xuất bản nội dung về DeFi và crypto. Trang này giải thích tiêu chuẩn
          chúng tôi áp dụng khi viết, cách xử lý affiliate, và bạn có thể kỳ vọng gì
          từ chất lượng nội dung.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Chúng tôi làm gì và không làm gì</h2>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Cam kết làm</p>
          <ul className="space-y-2 text-base text-muted-foreground">
            <li className="flex gap-2"><span>—</span><span>Ghi rõ ngày viết và cập nhật — bạn biết số liệu là của thời điểm nào.</span></li>
            <li className="flex gap-2"><span>—</span><span>Trích dẫn nguồn cho số liệu cụ thể (DeFiLlama, CoinGecko, Ethereum.org...).</span></li>
            <li className="flex gap-2"><span>—</span><span>Ghi rõ khi bài có affiliate link — không giấu.</span></li>
            <li className="flex gap-2"><span>—</span><span>Viết thẳng về rủi ro — không bài viết nào bỏ qua phần rủi ro chỉ để đẹp.</span></li>
            <li className="flex gap-2"><span>—</span><span>Sửa khi phát hiện sai — nội dung sai gây hại thực tế.</span></li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Không làm</p>
          <ul className="space-y-2 text-base text-muted-foreground">
            <li className="flex gap-2"><span>—</span><span>Không viết bài được trả tiền mà không ghi rõ là sponsored.</span></li>
            <li className="flex gap-2"><span>—</span><span>Không đưa ra dự báo giá hay khuyến nghị mua/bán cụ thể.</span></li>
            <li className="flex gap-2"><span>—</span><span>Không thổi phồng APY hay lợi nhuận để hấp dẫn người đọc.</span></li>
            <li className="flex gap-2"><span>—</span><span>Không xóa bài cũ có sai lầm — thêm chú thích "đã cập nhật" thay vì xóa.</span></li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Trách nhiệm thuộc về ai</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          diverFi chịu trách nhiệm về tính chính xác của nội dung tại thời điểm xuất
          bản. Thị trường DeFi thay đổi liên tục — số liệu trong bài có thể đã lỗi thời
          sau vài tuần. Bạn có trách nhiệm kiểm tra lại trước khi ra quyết định thực tế.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Affiliate link không ảnh hưởng đến nội dung chúng tôi viết. Chúng tôi không
          viết tốt hơn về protocol chỉ vì có affiliate với họ.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Bạn nên làm gì</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span>—</span><span>Kiểm tra ngày bài trước khi dùng APY hay TVL cho quyết định thực tế.</span></li>
          <li className="flex gap-2"><span>—</span><span>Nếu thấy thông tin sai hoặc đã lỗi thời, báo qua Telegram — chúng tôi sẽ sửa.</span></li>
          <li className="flex gap-2"><span>—</span><span>Nếu bạn click affiliate link và không hài lòng với platform đó, cho chúng tôi biết.</span></li>
        </ul>
      </section>

    </div>
  );
}
