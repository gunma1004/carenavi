import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

const SITE_URL = "https://carenavi.netlify.app";

// 시별 데이터 매핑
const regionDetails: Record<string, { name: string; desc: string; districts: Record<string, { name: string; dongs: string[] }> }> = {
  seoul: {
    name: "서울특별시",
    desc: "서울 25개 구 전 지역 프리미엄 힐링 테라피 및 제휴 샵 안내",
    districts: {
      gangnam: { name: "강남구", dongs: ["역삼1동", "역삼2동", "청담동", "삼성1동", "삼성2동", "대치1동", "대치2동", "신사동", "논현1동", "논현2동", "압구정동"] },
      seocho: { name: "서초구", dongs: ["서초1동", "서초2동", "서초3동", "잠원동", "반포1동", "방배본동", "방배1동", "양재1동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "서교동", "합정동", "망원1동", "연남동", "상암동"] },
      songpa: { name: "송파구", dongs: ["잠실본동", "잠실2동", "잠실3동", "방이1동", "방이2동", "오금동", "석촌동", "가락1동", "문정1동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "청파동", "원효로1동", "이촌1동", "이태원1동", "한남동", "보광동"] }
    }
  },
  gyeonggi: {
    name: "경기도",
    desc: "경기 권역별 시·군·구 맞춤형 힐링 테라피 안내",
    districts: {
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자1동", "정자2동", "영화동", "송죽동", "조원1동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내1동", "정자동", "서현1동", "이매1동", "야탑1동", "삼평동", "백현동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산1동", "정발산동", "백석1동", "마두1동", "장항1동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천1동", "신봉동", "죽전1동", "동천동", "상현1동", "성복동"] }
    }
  },
  incheon: {
    name: "인천광역시",
    desc: "인천 주요 구·군 맞춤형 프리미엄 테라피 안내",
    districts: {
      namdong: { name: "남동구", dongs: ["구월1동", "구월2동", "간석1동", "만수1동", "서창2동", "논현1동"] },
      bupyeong: { name: "부평구", dongs: ["부평1동", "부평2동", "산곡1동", "청천1동", "갈산1동", "삼산1동"] },
      seogu: { name: "서구", dongs: ["검암경서동", "연희동", "청라1동", "가정1동", "석남1동", "검단동"] },
      yeonsu: { name: "연수구", dongs: ["옥련1동", "선학동", "연수1동", "청학동", "동춘1동", "송도1동", "송도2동"] }
    }
  }
};

// 🌟 1단: '출장' 배제한 수식어 풀 (35개)
const prefixAdjectives = [
  "소프트", "프리미엄", "릴렉스", "감성", "프라이빗",
  "스페셜", "힐링", "딥티슈", "명품", "맞춤형",
  "안심", "쾌적한", "정성", "토탈", "순환",
  "포근한", "전신", "실속형", "프로페셔널", "럭셔리",
  "시그니처", "활력", "바디케어", "클래식", "컴포트",
  "디톡스", "정통", "체형맞춤", "차분한", "피로해소",
  "노련한", "깔끔한", "산뜻한", "탁월한", "안락한"
];

// 🌟 1단: '마사지' 앞에 붙는 테크닉 풀 (16개)
const coreTechniques = [
  "스웨디시", "아로마", "타이", "바디",
  "릴렉싱", "테라피", "웰니스", "홈케어",
  "림프케어", "컨디셔닝", "스트레칭", "이완",
  "에스테틱", "오일", "건식", "감성케어"
];

// 🌟 2단: '안마'를 완전히 배제한 50개 풀
const secondaryActions = [
  "전지역 실시간 방문예약", "테라피 코스 예약", "힐링 테라피 추천예약", "바디케어 코스예약",
  "웰니스 케어 방문안내", "구·동 전지역 방문안내", "스웨디시 통합예약", "안심 방문케어 안내",
  "맞춤 테라피 예약", "전신 릴렉스 케어예약", "홈케어 실시간 빠른예약", "힐링 바디 프로그램",
  "전문 테라피 1:1 예약", "바디 관리 코스안내", "프리미엄 테라피 예약", "쾌적한 방문케어 접수",
  "야간 힐링 실시간예약", "명품 에스테틱 코스안내", "감성 테라피 예약", "당일 1:1 방문예약",
  "정찰제 테라피 예약안내", "후불제 안심 코스접수", "전신 릴렉싱 케어안내", "전문 힐러진 추천예약",
  "피로회복 웰니스 예약", "토탈 바디케어 방문예약", "심야 힐링 방문안내", "스파 테라피 코스예약",
  "1:1 프라이빗 케어예약", "순환 림프 테라피안내", "체형맞춤 케어 코스예약", "아로마 바디 방문예약",
  "정통 테라피 실시간예약", "VIP 힐링 코스접수", "안심방문 테라피 예약", "바디 밸런스 케어안내",
  "도심 속 힐링 방문안내", "프라이빗 테라피 예약", "신속 홈케어 방문예약", "동네 안심 테라피안내",
  "우리동네 힐링케어 예약", "실속 바디 프로그램안내", "클래식 테라피 예약", "집중 이완 케어예약",
  "데일리 리프레시 방문접수", "맞춤형 바디케어 예약", "디톡스 테라피 코스예약", "럭셔리 힐링 방문안내",
  "대표 에스테틱 프로그램예약", "온전한 휴식 힐링안내"
];

// 🌟 3단: 지역 안내 페이지 전용 소구 문구 풀 (8개)
const tertiaryActionPatterns = [
  "1:1 맞춤 방문케어", "프라이빗 힐링 안내", "전신 피로회복 총정리",
  "정직한 정찰제 안심 가이드", "당일 예약 맞춤 코스", "최고급 힐러진 프로그램",
  "안심 후불제 웰니스 안내", "전신 릴렉스 힐링 추천"
];

// 🌟 디스크립션 가격 및 소구점 조합 풀 (10개)
const priceHooks = [
  "건식 6만원부터 심야할증 없이 방문합니다.",
  "건식 7만원부터 추가비용 없이 신속하게 방문합니다.",
  "스웨디시 8만원부터 투명한 정찰제로 방문합니다.",
  "아로마 7만원부터 합리적인 요금으로 방문합니다.",
  "타이 6만원부터 현장 결제 안심 후불제로 방문합니다.",
  "기본 코스 6만원부터 선입금 없이 안전하게 방문합니다.",
  "전신 코스 7만원부터 심야할증 없는 가격으로 방문합니다.",
  "힐링 코스 8만원부터 정직한 정찰제로 방문합니다.",
  "맞춤 코스 7만원부터 투명한 후불제로 방문합니다.",
  "스페셜 코스 9만원부터 추가요금 없이 바로 방문합니다."
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cityKey = resolvedParams.city || "seoul";
  const region = regionDetails[cityKey] || regionDetails["seoul"];

  // 🌟 순차적 인덱스 계산 (출장/안마 배제, 고유 조합 보장)
  const seed = `${cityKey}-${region.name}-carenavi-city-clean-v3`;
  const charSum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const adjIdx = charSum % prefixAdjectives.length;
  const techIdx = (charSum * 3) % coreTechniques.length;
  const actionIdx = (charSum * 5) % secondaryActions.length;
  const tertiaryIdx = (charSum * 7) % tertiaryActionPatterns.length;
  const priceIdx = (charSum * 11) % priceHooks.length;

  const selectedAdj = prefixAdjectives[adjIdx];
  const selectedTech = coreTechniques[techIdx];
  const selectedAction = secondaryActions[actionIdx];
  const selectedTertiary = tertiaryActionPatterns[tertiaryIdx];
  const selectedPriceHook = priceHooks[priceIdx];

  // 💡 [서울특별시] [수식어] [코스] 마사지·홈타이 | [서울특별시] [2단 예약] | [3단 소구점] (약 45~50자)
  const finalTitle = `${region.name} ${selectedAdj} ${selectedTech} 마사지·홈타이 | ${region.name} ${selectedAction} | ${selectedTertiary}`;
  
  // 💡 [시] 전지역 전문 방문 케어. 엄선된 테라피스트 100% 후불제 마사지·홈타이 안내. [가격 훅]
  const finalDescription = `${region.name} 전지역 전문 방문 케어. 엄선된 테라피스트 100% 후불제 마사지·홈타이 안내. ${selectedPriceHook}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${cityKey}/`,
    },
    keywords: [
      `${region.name} 마사지`,
      `${region.name} 홈타이`,
      `${region.name} 스웨디시`,
      `${region.name} 방문예약`,
      "100% 후불제",
      "케어나비"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${cityKey}/`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const cityKey = resolvedParams.city;
  const region = regionDetails[cityKey] || regionDetails["seoul"];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-sky-600">
            케어나비 (CareNavi)
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">
            &larr; 홈으로 돌아가기
          </Link>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200 py-3 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-sky-600 font-semibold hover:underline">홈</Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">{region.name}</span>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-2 inline-block">
            {region.name} 마사지 안내
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            {region.name} 지역별 프리미엄 힐링 마사지
          </h1>
          <p className="text-slate-600 text-sm md:text-base">{region.desc}</p>
        </div>

        <div className="space-y-6">
          {Object.entries(region.districts).map(([distKey, distVal]) => (
            <div key={distKey} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <Link href={`/${cityKey}/${distKey}`} className="text-lg font-bold text-slate-900 hover:text-sky-600 transition flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  {distVal.name} 마사지 샵 전체보기 &rarr;
                </Link>
                <span className="text-xs text-slate-400">세부 동 안내</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {distVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/${cityKey}/${distKey}/${dong}/shop/1`}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition"
                  >
                    {dong} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}