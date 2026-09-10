import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "수도권 힐링 여행지 안내 | 서울·경기·인천 추천 명소 - 리추얼(Ritual)",
  // 네이버 검색 최적 글자 수 및 힐링 가이드 CTR 문구
  description: "서울·경기·인천 리추얼 추천 수도권 힐링 여행지! 도심 숲길, 호수 드라이브, 오션뷰 일몰 명소와 여행 후 피로를 푸는 맞춤 테라피 팁을 확인하세요.",
  keywords: [
    "리추얼 여행가이드",
    "수도권 힐링여행",
    "서울 야경명소",
    "경기 드라이브코스",
    "인천 오션뷰",
    "힐링 스팟",
    "여행 피로회복"
  ],
  alternates: {
    canonical: "https://ritual-therapy.netlify.app/travel",
  },
  openGraph: {
    title: "수도권 힐링 여행지 안내 | 리추얼(Ritual) 추천 명소",
    description: "피로를 비워내는 서울·경기·인천 시그니처 힐링 여행 코스! 맑은 자연과 함께하는 웰니스 라이프를 만나보세요.",
    url: "https://ritual-therapy.netlify.app/travel",
    siteName: "리추얼(Ritual)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "리추얼 수도권 힐링 여행지 안내",
      },
    ],
  },
};

const travelSpots = [
  {
    region: "서울 코스",
    tag: "CITY & NIGHT VIEW",
    title: "남산 소나무 숲길 & 한강 야경 드라이브",
    desc: "도심 속 울창한 숲 산책로를 걸으며 맑은 공기를 마시고, 탁 트인 한강 야경을 감상하며 하루의 복잡한 생각을 비워낼 수 있는 도심 힐링 코스입니다.",
    spots: ["남산 둘레길", "반포 한강공원", "북악스카이웨이"],
    tip: "산책 후 뭉친 다리 근육은 가벼운 스트레칭이나 건식 케어로 풀어주면 좋습니다."
  },
  {
    region: "경기 코스",
    tag: "NATURE & FOREST",
    title: "가평 잣나무 숲 & 양평 두물머리 물안개길",
    desc: "피톤치드 가득한 잣나무 숲길에서 산림욕을 즐기고, 고즈넉한 강변을 따라 드라이브하며 지친 몸과 마음에 깊은 휴식을 선물하는 자연 코스입니다.",
    spots: ["아침고요수목원", "양평 두물머리", "포천 국립수목원"],
    tip: "장거리 운전 후에는 굳은 척추와 허리를 이완시키는 림프 순환 케어가 효과적입니다."
  },
  {
    region: "인천 코스",
    tag: "OCEAN & SUNSET",
    title: "영종도 해변 도로 & 송도 센트럴파크",
    desc: "서해의 붉은 노을을 바라보며 시원한 바닷바람을 맞을 수 있는 오션 드라이브 코스로, 이국적인 송도 수변 공원에서 여유로운 야간 산책을 즐기기 좋습니다.",
    spots: ["을왕리 해변", "송도 센트럴파크", "월미도 달빛로드"],
    tip: "바닷바람으로 건조해진 피부에는 천연 아로마 오일 테라피를 추천합니다."
  },
  {
    region: "경기 남부 코스",
    tag: "LAKE & PARK",
    title: "광교 호수공원 & 수원 화성 성곽길",
    desc: "화려한 수변 야경과 성곽 산책로가 조화롭게 어우러진 명소로, 조용하고 편안한 분위기 속에서 사색과 릴렉스를 누릴 수 있는 주말 추천 코스입니다.",
    spots: ["광교 호수공원", "수원 화성행궁", "의왕 백운호수"],
    tip: "산책을 마친 뒤 익숙한 숙소나 집에서 받는 방문 홈케어로 완벽한 마무리가 가능합니다."
  }
];

export default function TravelPage() {
  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase">
            LOCAL HEALING TRAVEL
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            수도권 힐링 여행지 & 드라이브 명소
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            복잡한 일상에서 벗어나 맑은 자연과 야경을 즐기며 온전한 쉼을 누릴 수 있는 서울·경기·인천 추천 코스입니다.
          </p>
        </section>

        {/* 힐링 여행 가이드 카드 그리드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelSpots.map((spot, idx) => (
            <div 
              key={idx} 
              className="bg-[#121216] border border-white/5 hover:border-amber-500/40 p-6 rounded-3xl space-y-4 transition-all shadow-md group relative overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
                  📍 {spot.region}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wider">
                  {spot.tag}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-extrabold text-lg text-white group-hover:text-amber-400 transition-colors">
                  {spot.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {spot.desc}
                </p>
              </div>

              {/* 주요 스팟 태그 */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {spot.spots.map((item, itemIdx) => (
                  <span 
                    key={itemIdx}
                    className="text-[11px] bg-black/40 text-gray-400 px-2.5 py-1 rounded-lg border border-white/5 font-medium"
                  >
                    #{item}
                  </span>
                ))}
              </div>

              {/* 리추얼 웰니스 팁 */}
              <div className="bg-black/50 p-3.5 rounded-2xl border border-white/5 text-[11px] text-gray-400 leading-relaxed">
                <strong className="text-amber-400 font-bold">🌿 리추얼 릴렉스 팁:</strong> {spot.tip}
              </div>
            </div>
          ))}
        </section>

        {/* 여행 후 피로회복 연계 CTA 배너 */}
        <section className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-amber-500/15 border border-amber-500/30 p-6 md:p-8 rounded-3xl text-center space-y-4 shadow-[0_0_25px_rgba(245,158,11,0.08)]">
          <div className="space-y-1">
            <h3 className="text-base md:text-xl font-black text-white">
              🚗 즐거운 드라이브 후 지친 몸, 편안한 공간에서 풀어보세요
            </h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
              수도권 전지역 25분 내 빠른 방문! 100% 안심 후불제로 나만의 아늑한 공간에서 1:1 맞춤 피로회복을 누리실 수 있습니다.
            </p>
          </div>
          <div>
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all transform active:scale-95"
            >
              📞 리추얼 실시간 바디케어 예약하기
            </a>
          </div>
        </section>

        {/* 메인으로 돌아가기 버튼 */}
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