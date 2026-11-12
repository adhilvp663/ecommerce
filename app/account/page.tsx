import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountClient } from "@/components/account/AccountClient";

export const metadata: Metadata = {
  title: "Client Account",
  description:
    "Track your SOLE STORE order, review your wishlist, manage addresses and reach the private client concierge.",
};

function AccountFallback() {
  return (
    <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 xl:px-12">
      <div className="h-24 w-2/3 animate-pulse bg-surface-container" />
      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="h-64 animate-pulse bg-surface-container-low" />
        <div className="h-[420px] animate-pulse bg-surface-container-low" />
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<AccountFallback />}>
      <AccountClient />
    </Suspense>
  );
}
