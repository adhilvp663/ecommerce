import type { Metadata } from "next";
import { CartClient } from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "Your Bag",
  description:
    "Review your SOLE STORE allocation, apply a private client code and complete your order via WhatsApp concierge.",
};

export default function CartPage() {
  return <CartClient />;
}
