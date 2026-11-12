import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { StoreProvider } from "@/lib/store";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700"],
});

const space = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SOLE STORE — Architectural Footwear Archive",
    template: "%s — SOLE STORE",
  },
  description:
    "Architectural footwear, hand-finished in limited allocations. Shop sneakers, casual loafers, performance runners and formal derbies at SOLE STORE.",
  keywords: [
    "sole store",
    "luxury sneakers",
    "architectural footwear",
    "limited edition shoes",
    "handcrafted loafers",
    "performance running",
    "formal derby",
  ],
  openGraph: {
    title: "SOLE STORE — Architectural Footwear Archive",
    description:
      "Limited-run footwear for the few. Hand-finished in Italy. Dispatched worldwide.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#131316",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${hanken.variable} ${space.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body
        className="bg-background font-body-md text-body-md text-on-surface antialiased"
      >
        <StoreProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-tertiary focus:px-4 focus:py-3 focus:font-label-md focus:text-on-tertiary"
          >
            Skip to content
          </a>
          <Header />
          <main
            id="main-content"
            className="min-h-[70vh] overflow-x-clip pt-24"
          >
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </StoreProvider>
      </body>
    </html>
  );
}
