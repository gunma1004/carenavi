import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

export const metadata: Metadata = {
  // 네이버 검색 최적화 규격 준수
  title: "케어나비 (CareNavi) | 서울·경기·인천 프리미엄 힐링 테라피",
  description: "서울·경기·인천 지역의 검증된 프리미엄 힐링 테라피 & 에스테틱 정보 플랫폼! 내 주변 맞춤형 제휴 샵과 쾌적한 휴식 공간 정보를 확인하세요.",
  keywords: [
    "케어나비",
    "CareNavi",
    "힐링테라피플랫폼",
    "바디케어",
    "타이 마사지",
    "아로마 마사지",
    "릴렉스 테라피",
    "서울 마사지",
    "경기 힐링",
    "인천 에스테틱",
    "프리미엄 스파"
  ],
  alternates: {
    canonical: "https://carenavi.netlify.app",
  },
  openGraph: {
    title: "케어나비 (CareNavi) | 서울·경기·인천 힐링 테라피 예약",
    description: "내 주변 검증된 힐링 테라피 샵 정보 총집합! 타이, 아로마, 에스테틱 맞춤 휴식 공간을 케어나비에서 만나보세요.",
    url: "https://carenavi.netlify.app",
    siteName: "케어나비 (CareNavi)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "케어나비 - 프리미엄 힐링 & 바디케어 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "케어나비 (CareNavi) | 서울·경기·인천 프리미엄 테라피",
    description: "서울·경기·인천 검증된 테라피 제휴 정보 및 프리미엄 힐링 가이드",
    images: ["/og-main.png"],
  },
};

export default function Page() {
  return <MainClientUI />;
}