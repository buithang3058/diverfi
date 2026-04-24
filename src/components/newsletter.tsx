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
        <h3 className="text-xl font-semibold mb-2">You&apos;re in.</h3>
        <p className="text-muted-foreground">
          We&apos;ll notify you when new lessons drop and when the AI tools launch.
        </p>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-primary/5 rounded-lg">
      <div className="max-w-xl mx-auto text-center">
        <Mail className="h-12 w-12 mx-auto text-primary mb-4" />
        <h3 className="text-2xl font-bold mb-2">Get new lessons in your inbox</h3>
        <p className="text-muted-foreground mb-6">
          Subscribe to be notified when new lessons drop and when AI research tools launch.
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
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          Free. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
