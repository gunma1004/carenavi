import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://carenavi.netlify.app"),
  title: {
    // 네이버 검색 최적화 규격 준수
    default: "케어나비 (CareNavi) | 서울·경기·인천 프리미엄 힐링 테라피 예약",
    template: "%s | 케어나비 (CareNavi)"
  },
  // 스팸 키워드를 배제한 클린하고 신뢰감 주는 디스크립션
  description: "서울, 경기, 인천 지역의 검증된 프리미엄 힐링 테라피 및 에스테틱 정보를 한눈에! 내 주변 맞춤형 휴식 공간과 제휴 샵 정보를 빠르고 편리하게 확인하세요.",
  keywords: [
    "케어나비",
    "CareNavi",
    "서울 마사지",
    "경기 힐링 테라피",
    "인천 에스테틱",
    "수도권 마사지 플랫폼",
    "바디케어 제휴 샵",
    "방문 힐링"
  ],
  alternates: {
    canonical: "https://carenavi.netlify.app",
  },
  verification: {
    other: {
      "naver-site-verification": "f5b08fea69af6b297e2bf76136c8596c95437ade", // 필요시 본인 인증 코드로 변경하세요
    },
  },
  openGraph: {
    title: "케어나비 (CareNavi) | 서울·경기·인천 힐링 테라피 플랫폼",
    description: "서울, 경기, 인천 전 지역의 엄선된 프리미엄 힐링 테라피 및 에스테틱 정보를 간편하게 찾아보세요.",
    url: "https://carenavi.netlify.app",
    siteName: "케어나비",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "케어나비 프리미엄 힐링 플랫폼 안내",
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
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}