import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "【AI肌診断】パーソナルスキンケア＆コスメ成分解析 - LUMIÈRE AI SKIN REPORT",
  description: "顔写真とコスメをAIが科学的に分析。肌タイプ、部位別診断、コスメの相性を無料でレポート。最適なパーソナルケアとおすすめ商品を今すぐチェック。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "LUMIÈRE AI SKIN REPORT",
    "description": "AIによる肌診断とコスメ解析サービス",
    "priceRange": "Free",
    "image": "https://example.com/og-image.jpg" // Placeholder
  };

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
