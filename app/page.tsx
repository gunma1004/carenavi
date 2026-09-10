import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

export const metadata: Metadata = {
  title: "리추얼 (Ritual) | 서울·경기·인천 프리미엄 방문 힐링 테라피 플랫폼",
  // 네이버 모바일/PC 최적 노출 글자 수 및 클린 키워드 구성
  description: "서울·경기·인천 100% 검증 방문 힐링 테라피 리추얼! 출장 릴렉스, 타이, 아로마 마사지 제휴점 가격비교와 실시간 맞춤 바디케어 정보를 확인하세요.",
  keywords: [
    "리추얼",
    "Ritual",
    "방문테라피플랫폼",
    "바디케어",
    "출장 타이 마사지",
    "출장 아로마 마사지",
    "출장 릴렉스 마사지",
    "서울 방문 테라피",
    "경기 홈케어",
    "인천 바디케어",
    "힐링테라피",
    "프리미엄스파"
  ],
  alternates: {
    canonical: "https://ritual-therapy.netlify.app",
  },
  openGraph: {
    title: "리추얼(Ritual) | 서울·경기·인천 프리미엄 방문 힐링 테라피",
    description: "내 주변 검증된 방문 테라피 샵 정보 총집합! 출장 릴렉스, 타이, 아로마 맞춤 힐링 케어를 리추얼에서 바로 만나보세요.",
    url: "https://ritual-therapy.netlify.app",
    siteName: "리추얼(Ritual)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "리추얼 - 프리미엄 힐링 & 바디케어 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "리추얼 (Ritual) | 서울·경기·인천 프리미엄 방문 테라피",
    description: "서울·경기·인천 검증된 방문 테라피 제휴 정보 및 프리미엄 힐링 가이드",
    images: ["/og-main.png"],
  },
};

export default function Page() {
  return <MainClientUI />;
}