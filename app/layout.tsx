import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://ritual-therapy.netlify.app"),
  title: {
    // 🌟 네이버 40자 이내 권장 규격 준수 (32자)
    default: "리추얼(Ritual) | 서울·경기·인천 24시 방문 힐링 테라피",
    template: "%s | 리추얼(Ritual)"
  },
  // 네이버 검색 최적 노출 디스크립션 (스팸 키워드 배제 및 클린 구성)
  description: "서울·경기·인천 24시 방문 힐링 테라피 & 프리미엄 바디케어 전문 리추얼! 100% 안심 후불제, 릴렉스·타이·아로마 제휴업체 정보 및 실시간 빠른 예약을 확인하세요.",
  keywords: [
    "출장 힐링 마사지",
    "출장 릴렉스 마사지",
    "출장 타이 마사지",
    "서울 방문 테라피",
    "경기 홈케어",
    "인천 바디케어",
    "아로마 테라피",
    "후불제 힐링",
    "리추얼",
    "Ritual"
  ],
  alternates: {
    canonical: "https://ritual-therapy.netlify.app",
  },
  openGraph: {
    title: "리추얼(Ritual) | 서울·경기·인천 24시 안심 방문 힐링 테라피",
    description: "선입금 없는 100% 후불제 안심 예약! 수도권 전지역 평균 25분 내 빠른 방문 프리미엄 바디케어.",
    url: "https://ritual-therapy.netlify.app",
    siteName: "리추얼(Ritual)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "리추얼 프리미엄 테라피 안내",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}