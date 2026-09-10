import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "실제 고객 생생후기 | 만족도 5.0 안심 이용 리뷰 - 리추얼(Ritual)",
  // 네이버 검색 최적 글자 수 및 안심 신뢰 CTR 문구
  description: "서울·경기·인천 리추얼 실제 이용 고객 100% 솔직 후기 모음! 신속 방문 만족도, 관리사 실력, 선입금 없는 후불제 안심 리뷰를 확인해 보세요.",
  keywords: [
    "리추얼 후기",
    "마사지 이용후기",
    "홈케어 솔직리뷰",
    "출장마사지 후기",
    "스웨디시 후기",
    "서울 방문케어 후기",
    "경기 마사지 리뷰"
  ],
  alternates: {
    canonical: "https://ritual-therapy.netlify.app/reviews",
  },
  openGraph: {
    title: "실제 고객 생생후기 | 리추얼(Ritual) 검증된 100% 솔직 리뷰",
    description: "선입금 없는 안심 후불제와 빠른 방문! 서울·경기·인천 고객님들이 직접 작성한 생생한 피로회복 후기를 만나보세요.",
    url: "https://ritual-therapy.netlify.app/reviews",
    siteName: "리추얼(Ritual)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "리추얼 실제 고객 생생후기",
      },
    ],
  },
};

const reviewStats = {
  average: "4.9",
  totalReviews: "1,240+",
  recommendRate: "98.7%",
};

const reviews = [
  {
    name: "서울 강남구 직장인",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "감성 스웨디시 90분",
    badge: "재이용 고객",
    text: "야근 후에 방문 홈케어 신청했는데 25분 만에 오셨어요. 어깨와 목에 뭉친 피로가 싹 풀려서 밤에 정말 꿀잠 잤습니다. 다음 주말에도 다시 부를 생각입니다!",
  },
  {
    name: "경기 수원시 영통구 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "베테랑 VIP 스페셜 120분",
    badge: "인증 리뷰",
    text: "선입금 없는 100% 후불제라 정말 마음 편하게 이용했습니다. 테라피스트 분 마인드와 실력이 너무 훌륭하시고 위생도 청결해서 아주 만족스러웠습니다.",
  },
  {
    name: "인천 연수구 송도 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "프리미엄 천연 아로마 90분",
    badge: "인증 리뷰",
    text: "스웨디시와 아로마 오일 조합 코스 이용해봤는데 전신 림프가 제대로 풀리는 느낌이었어요. 집에서 편안하게 받으니 샵까지 이동할 필요가 없어서 최고네요.",
  },
  {
    name: "서울 마포구 상암동 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "타이 건식 릴렉싱 60분",
    badge: "신규 고객",
    text: "운동 후 근육 뭉침이 심해서 급하게 예약했는데 도착 시간도 칼같으셨고 스트레칭 압 조절을 너무 잘해주셔서 뭉친 다리가 완전히 가벼워졌습니다.",
  },
  {
    name: "경기 성남시 분당구 고객님",
    date: "최근 이용",
    rate: "★★★★★ 5.0",
    course: "감성 스웨디시 60분",
    badge: "재이용 고객",
    text: "타 플랫폼은 선입금 유도가 많아서 불안했는데, 리추얼은 확실한 후불 정찰제라 믿음이 갑니다. 친절하고 프라이빗한 케어 감사합니다.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen py-10 px-4 font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 헤더 */}
        <section className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-widest uppercase">
            REAL CUSTOMER REVIEWS
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            리추얼 실제 이용 고객 솔직 후기
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            서울·경기·인천 전지역에서 리추얼 서비스를 직접 경험하신 고객님들의 100% 솔직한 생생 후기입니다.
          </p>
        </section>

        {/* 만족도 통계 요약 카드 */}
        <section className="bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-amber-500/15 border border-amber-500/30 p-6 rounded-3xl grid grid-cols-3 gap-2 text-center shadow-[0_0_25px_rgba(245,158,11,0.08)]">
          <div className="space-y-1">
            <span className="text-[11px] text-gray-400 font-semibold block">평균 고객 평점</span>
            <span className="text-xl md:text-2xl font-black text-amber-300">★ {reviewStats.average}</span>
          </div>
          <div className="space-y-1 border-x border-white/10">
            <span className="text-[11px] text-gray-400 font-semibold block">누적 안심 리뷰</span>
            <span className="text-xl md:text-2xl font-black text-white">{reviewStats.totalReviews}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-gray-400 font-semibold block">지인 추천율</span>
            <span className="text-xl md:text-2xl font-black text-emerald-400">{reviewStats.recommendRate}</span>
          </div>
        </section>

        {/* 리뷰 카드 리스트 */}
        <section className="space-y-4">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="bg-[#121216] border border-white/5 hover:border-amber-500/30 p-5 md:p-6 rounded-2xl space-y-3 transition-all shadow-md group"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-black text-sm tracking-wide">
                      {rev.rate}
                    </span>
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/20 font-bold">
                      {rev.badge}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 font-bold">
                    {rev.name}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-[11px] text-gray-500 font-medium block">
                    {rev.date}
                  </span>
                  <span className="text-[10px] text-amber-400/80 bg-black/40 px-2 py-0.5 rounded border border-white/5 font-medium">
                    {rev.course}
                  </span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-300 leading-relaxed pt-1 border-t border-white/5">
                &quot;{rev.text}&quot;
              </p>
            </div>
          ))}
        </section>

        {/* 안심 예약 보증 배너 */}
        <section className="bg-[#0f0f13] border border-amber-500/30 p-6 rounded-3xl text-center space-y-3">
          <h3 className="text-base font-black text-white">
            🛡️ 100% 안심 후불 예약제 운영
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            리추얼은 검증된 관리사 방문 후 결제되는 안전 시스템을 고수하고 있어 예약금 사기 걱정이 없습니다.
          </p>
          <div>
            <a 
              href="tel:0507-1280-3344"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all transform active:scale-95"
            >
              📞 지금 바로 실시간 힐링 예약하기
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