import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "주변 제휴명소 & 맛집·숙소 안내 | 리추얼(Ritual)",
  description: "서울·경기·인천 힐링 명소와 검증된 맛집, 편안한 휴식 공간 가이드! 리추얼 테라피 케어와 함께 즐기는 수도권 추천 스팟 정보를 확인하세요.",
  keywords: [
    "리추얼 제휴명소",
    "서울 맛집 숙소",
    "경기 힐링 스팟",
    "인천 휴식 공간",
    "테라피 연계 숙소",
    "웰니스 푸드"
  ],
  alternates: {
    canonical: "https://ritual-therapy.netlify.app/places",
  },
  openGraph: {
    title: "주변 제휴명소 & 맛집·숙소 안내 | 리추얼(Ritual)",
    description: "테라피와 함께 즐기는 서울·경기·인천 핫플레이스! 검증된 맛집과 편안한 휴식처를 한눈에 만나보세요.",
    url: "https://ritual-therapy.netlify.app/places",
    siteName: "리추얼(Ritual)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "리추얼 주변 제휴명소 안내",
      },
    ],
  },
};

const placeCategories = [
  {
    category: "🍵 힐링 티하우스 & 카페",
    tag: "REST & TEA",
    items: [
      {
        name: "도심 속 오가닉 티 라운지",
        region: "서울 강남 / 서초",
        desc: "테라피 전후 심신 안정을 돕는 프리미엄 유기농 허브티 & 블렌딩 티 전문점",
        badge: "리추얼 제휴 추천",
      },
      {
        name: "포레스트 뷰 릴렉스 카페",
        region: "경기 성남 / 분당",
        desc: "자연 채광과 숲 뷰를 즐기며 조용하게 휴식을 취할 수 있는 웰니스 카페",
        badge: "주차 완비",
      },
    ],
  },
  {
    category: "🥗 건강식 & 웰니스 다이닝",
    tag: "HEALTHY FOOD",
    items: [
      {
        name: "정갈한 제철 한정식 다이닝",
        region: "서울 송파 / 잠실",
        desc: "자극적이지 않고 속이 편안한 천연 조미료 기반의 프리미엄 보양 한식 코스",
        badge: "예약 필수",
      },
      {
        name: "오가닉 샐러드 & 단백질 키친",
        region: "인천 송도 / 연수",
        desc: "몸의 독소 배출과 가벼운 식단을 선호하는 분들을 위한 프레시 푸드 전문점",
        badge: "포장/배달 가능",
      },
    ],
  },
  {
    category: "🏨 프라이빗 스테이 & 숙소",
    tag: "STAY & RELAX",
    items: [
      {
        name: "도심형 부티크 스위트 스테이",
        region: "서울 마포 / 용산",
        desc: "방문 홈케어 테라피를 편안하게 누릴 수 있는 쾌적한 위생과 럭셔리 룸 컨디션",
        badge: "프라이빗 보장",
      },
      {
        name: "오션뷰 힐링 레지던스",
        region: "인천 영종 / 중구",
        desc: "탁 트인 바다 전망을 감상하며 완벽한 주말 휴식을 즐길 수 있는 프리미엄 공간",
        badge: "레이트 체크아웃",
      },
    ],
  },
];

export default function PlacesPage() {
  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase">
            HEALING & HOT PLACES
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            내 주변 맛집 & 편안한 휴식 명소
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            서울·경기·인천 지역의 테라피 바디케어와 함께 즐기기 좋은 검증된 맛집, 웰니스 카페, 숙소 가이드입니다.
          </p>
        </section>

        {/* 메인 안내 배너 */}
        <section className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 p-5 md:p-6 rounded-3xl text-center space-y-2 shadow-[0_0_25px_rgba(245,158,11,0.08)]">
          <p className="text-xs md:text-sm font-bold text-amber-300">
            ✨ 리추얼 파트너와 함께하는 품격 있는 휴식 플랜
          </p>
          <p className="text-[11px] md:text-xs text-gray-400">
            리추얼은 이용자분들의 건강한 힐링 라이프스타일을 위해 수도권 거점별 명소를 엄선하여 주기적으로 업데이트하고 있습니다.
          </p>
        </section>

        {/* 카테고리별 명소 리스트 */}
        <div className="space-y-8">
          {placeCategories.map((cat, idx) => (
            <section key={idx} className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  {cat.category}
                </h2>
                <span className="text-[10px] text-amber-400 font-bold tracking-wider">
                  {cat.tag}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="bg-[#121216] border border-white/5 hover:border-amber-500/40 rounded-2xl p-5 space-y-2.5 transition-all shadow-md group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        {item.badge}
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium">
                        📍 {item.region}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 하단 제휴 문의 안내 */}
        <section className="bg-[#0f0f13] border border-amber-500/30 p-6 rounded-3xl text-center space-y-3">
          <h3 className="text-base font-black text-white">
            🤝 리추얼 제휴 명소 등록 및 입점 안내
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            서울·경기·인천 지역의 웰니스 매장, 맛집, 숙박 업주분들의 제휴 신청을 받고 있습니다.
          </p>
          <div>
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-5 py-2.5 rounded-xl shadow transition-all transform active:scale-95"
            >
              📞 명소 제휴 문의하기 (0507-1280-3344)
            </a>
          </div>
        </section>

        {/* 홈으로 돌아가기 버튼 */}
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