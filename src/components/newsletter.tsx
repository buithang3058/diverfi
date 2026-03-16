"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send to an API
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section className="py-12 px-4 bg-primary/5 rounded-lg text-center">
        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Cảm ơn bạn đã đăng ký!</h3>
        <p className="text-muted-foreground">
          Chúng tôi sẽ gửi các bài học mới nhất đến email của bạn.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-primary/5 rounded-lg">
      <div className="max-w-xl mx-auto text-center">
        <Mail className="h-12 w-12 mx-auto text-primary mb-4" />
        <h3 className="text-2xl font-bold mb-2">Nhận bài học mới qua email</h3>
        <p className="text-muted-foreground mb-6">
          Đăng ký để nhận thông báo khi có bài học mới và các tips về DeFi mỗi tuần.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit">
            Đăng ký
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          Miễn phí. Không spam. Hủy đăng ký bất cứ lúc nào.
        </p>
      </div>
    </section>
  );
}
