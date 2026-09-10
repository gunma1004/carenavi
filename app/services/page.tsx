import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 안내 | 맞춤 테라피 & 프리미엄 바디케어 - 리추얼(Ritual)",
  // 네이버 검색 최적 글자 수 및 안심 케어 CTR 문구
  description: "서울·경기·인천 리추얼 서비스 안내! 타이 건식, 천연 아로마, 감성 스웨디시, VIP 맞춤 테라피 코스와 100% 안심 후불제 프로그램을 확인하세요.",
  keywords: [
    "리추얼 서비스",
    "타이마사지 코스",
    "아로마테라피 프로그램",
    "스웨디시 마사지",
    "방문 홈케어 서비스",
    "바디케어 추천",
    "1대1 맞춤 테라피"
  ],
  alternates: {
    canonical: "https://ritual-therapy.netlify.app/services",
  },
  openGraph: {
    title: "서비스 안내 | 리추얼(Ritual) 맞춤 힐링 테라피 코스",
    description: "컨디션과 취향에 맞춘 최상의 힐링 프로그램! 타이, 아로마, 스웨디시 프리미엄 바디케어를 만나보세요.",
    url: "https://ritual-therapy.netlify.app/services",
    siteName: "리추얼(Ritual)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "리추얼 서비스 안내",
      },
    ],
  },
};

const serviceList = [
  {
    num: "01",
    title: "정통 타이 건식 테라피",
    sub: "TRADITIONAL THAI CARE",
    desc: "전신의 뭉친 근육과 스트레스받은 관절을 체계적인 스트레칭과 지압으로 정성스럽게 풀어주는 전통 릴렉싱 코스입니다.",
    tags: ["전신 피로 회복", "관절 스트레칭", "근육 이완"],
    recommend: "오랜 좌식 생활로 어깨와 허리가 결리는 직장인",
  },
  {
    num: "02",
    title: "프리미엄 천연 아로마 케어",
    sub: "ORGANIC AROMA THERAPY",
    desc: "엄선된 최고급 천연 유기농 오일을 블렌딩하여 피부 자극 없이 부드럽게 혈액순환과 심신 안정을 돕는 힐링 코스입니다.",
    tags: ["심신 안정", "피부 보습", "스트레스 완화"],
    recommend: "부드러운 압과 아로마 향으로 깊은 휴식을 원하는 분",
  },
  {
    num: "03",
    title: "감성 딥티슈 스웨디시",
    sub: "LUXURY SWEDISH SPA",
    desc: "체내 림프 순환을 원활하게 촉진하고 섬세한 테크닉으로 묵은 노폐물 배출과 신체 밸런스를 리프레시해 드리는 시그니처 코스입니다.",
    tags: ["림프 순환 촉진", "부종 완화", "VIP 프리미엄"],
    recommend: "만성 피로 해소와 감성적인 힐링 터치를 선호하는 분",
  },
  {
    num: "04",
    title: "베테랑 힐러 VIP 스페셜",
    sub: "SIGNATURE 1:1 CUSTOM CARE",
    desc: "숙련된 전문 테라피스트가 1:1로 고객님의 체형 및 피로도를 정밀 분석하여 건식과 오일을 결합해 진행하는 맞춤형 집중 코스입니다.",
    tags: ["1:1 맞춤 집중", "체형 밸런스", "최고 만족도"],
    recommend: "특별한 날 완벽한 컨디션 회복과 VIP 케어가 필요한 분",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase">
            PREMIUM CARE SERVICE
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            리추얼 코스별 서비스 프로그램 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            고객님의 당일 컨디션과 선호에 맞춰 가장 편안하고 완벽한 피로회복 시간을 선사하는 맞춤 테라피 프로그램입니다.
          </p>
        </section>

        {/* 서비스 4대 핵심 가치 배너 */}
        <section className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 p-6 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center shadow-[0_0_20px_rgba(245,158,11,0.08)]">
          <div className="space-y-1">
            <span className="text-xl">⏱️</span>
            <h4 className="text-xs font-bold text-white">25분 내 빠른 방문</h4>
            <p className="text-[10px] text-gray-400">수도권 전지역 신속 배치</p>
          </div>
          <div className="space-y-1 border-l border-white/5">
            <span className="text-xl">🛡️</span>
            <h4 className="text-xs font-bold text-white">100% 안심 후불제</h4>
            <p className="text-[10px] text-gray-400">도착 전 선입금 0원</p>
          </div>
          <div className="space-y-1 border-l border-white/5">
            <span className="text-xl">🌿</span>
            <h4 className="text-xs font-bold text-white">최고급 천연 오일</h4>
            <p className="text-[10px] text-gray-400">자극 없는 프리미엄 성분</p>
          </div>
          <div className="space-y-1 border-l border-white/5">
            <span className="text-xl">👑</span>
            <h4 className="text-xs font-bold text-white">검증된 전문 힐러</h4>
            <p className="text-[10px] text-gray-400">체계적인 교육 이수 매니저</p>
          </div>
        </section>

        {/* 서비스 카드 그리드 (2x2) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceList.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-[#121216] border border-white/5 hover:border-amber-500/40 p-6 rounded-3xl space-y-4 transition-all shadow-md group relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <span className="text-amber-400 font-black text-2xl tracking-tighter">
                  {service.num}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wider bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                  {service.sub}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-lg text-white group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* 태그 영역 */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {service.tags.map((tag, tagIdx) => (
                  <span 
                    key={tagIdx} 
                    className="text-[11px] bg-amber-500/10 text-amber-300 px-2.5 py-0.5 rounded-lg border border-amber-500/20 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 추천 대상 박스 */}
              <div className="bg-black/50 p-3 rounded-xl border border-white/5 text-[11px] text-gray-400">
                <strong className="text-amber-400/90 font-bold">💡 추천 대상:</strong> {service.recommend}
              </div>
            </div>
          ))}
        </section>

        {/* 하단 CTA 박스 */}
        <section className="bg-[#0f0f13] border border-amber-500/30 p-6 md:p-8 rounded-3xl text-center space-y-3">
          <h3 className="text-base md:text-lg font-black text-white">
            나에게 맞는 맞춤 코스가 고민되시나요?
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            전문 상담원이 현재 고객님의 피로 부위와 컨디션에 가장 최적화된 테라피 프로그램을 친절하게 안내해 드립니다.
          </p>
          <div className="pt-1">
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all transform active:scale-95"
            >
              📞 1:1 맞춤 코스 실시간 상담하기
            </a>
          </div>
        </section>

        {/* 홈으로 돌아가기 */}
        <div className="text-center pt-2">
          <Link 
            href="/"
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-amber-400 transition-colors"
          >
            ← 리추얼 메인 홈으로 이동하기
          </Link>
        </div>

      </div>
    </div>
  );
}