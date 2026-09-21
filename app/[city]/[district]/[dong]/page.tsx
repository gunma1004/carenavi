import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
    dong: string;
  }>;
}

const SITE_URL = "https://carenavi.netlify.app";

// 🌟 경기도 시·군 영문 슬러그를 한글 이름으로 변환해주는 매핑 객체
const gyeonggiNameMap: Record<string, string> = {
  suwon: "수원시",
  seongnam: "성남시",
  uijeongbu: "의정부시",
  anyang: "안양시",
  bucheon: "부천시",
  gwangmyeong: "광명시",
  pyeongtaek: "평택시",
  dongducheon: "동두천시",
  ansan: "안산시",
  goyang: "고양시",
  gwacheon: "과천시",
  guri: "구리시",
  namyangju: "남양주시",
  osan: "오산시",
  siheung: "시흥시",
  gunpo: "군포시",
  uiwang: "의왕시",
  hanam: "하남시",
  yongin: "용인시",
  paju: "파주시",
  icheon: "이천시",
  anseong: "안성시",
  gimpo: "김포시",
  hwaseong: "화성시",
  gwangju: "광주시",
  yangju: "양주시",
  pocheon: "포천시",
  yeoju: "여주시",
  yeoncheon: "연천군",
  gapyeong: "가평군",
  yangpyeong: "양평군"
};

// 🌟 1단: '출장'을 배제한 수식어 풀 (35개)
const prefixAdjectives = [
  "소프트", "프리미엄", "릴렉스", "감성", "프라이빗",
  "스페셜", "힐링", "딥티슈", "명품", "맞춤형",
  "안심", "쾌적한", "정성", "토탈", "순환",
  "포근한", "전신", "실속형", "프로페셔널", "럭셔리",
  "시그니처", "활력", "바디케어", "클래식", "컴포트",
  "디톡스", "정통", "체형맞춤", "차분한", "피로해소",
  "노련한", "깔끔한", "산뜻한", "탁월한", "안락한"
];

// 🌟 1단: '마사지' 앞에 붙는 코스 테크닉 풀 (16개)
const coreTechniques = [
  "스웨디시", "아로마", "타이", "바디",
  "릴렉싱", "테라피", "웰니스", "홈케어",
  "림프케어", "컨디셔닝", "스트레칭", "이완",
  "에스테틱", "오일", "건식", "감성케어"
];

// 🌟 2단: '안마'를 완전히 배제한 방문 케어·테라피·예약 연계 풀 (50개)
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
  const { city, district, dong } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const rawDistrictName = districtInfo ? districtInfo.name : district;
  
  // 💡 경기도일 경우 영문 슬러그를 한글 시·군 이름으로 치환
  const districtName = city.toLowerCase() === "gyeonggi"
    ? (gyeonggiNameMap[district.toLowerCase()] || rawDistrictName)
    : rawDistrictName;

  const decodedDong = decodeURIComponent(dong);
  const locationKeyword = `${cityName} ${districtName} ${decodedDong}`;

  const seed = `${locationKeyword}-carenavi-dong-clean-v3`;
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

  const finalTitle = `${decodedDong} ${selectedAdj} ${selectedTech} 마사지·홈타이 | ${districtName} ${selectedAction} | ${selectedTertiary}`;
  const finalDescription = `${locationKeyword} 전지역 전문 방문 케어. 엄선된 테라피스트 100% 후불제 마사지·홈타이 안내. ${selectedPriceHook}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}/${dong}`,
    },
    keywords: [
      `${locationKeyword} 마사지`,
      `${decodedDong} 홈타이`,
      `${decodedDong} 스웨디시`,
      `${districtName} 방문예약`,
      "100% 후불제",
      "케어나비"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}/${dong}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const rawDistrictName = districtInfo ? districtInfo.name : district;
  const districtName = city.toLowerCase() === "gyeonggi"
    ? (gyeonggiNameMap[district.toLowerCase()] || rawDistrictName)
    : rawDistrictName;

  const decodedDong = decodeURIComponent(dong);
  const fullTitle = `${cityName} ${districtName} ${decodedDong}`;

  // 💡 기본 샵 목록
  const baseShops = [
    { id: 1, name: `골든테라피`, desc: "고품격 릴렉싱 & 딥티슈 피로회복! 전문 테라피스트의 품격 있는 1:1 맞춤 마사지 케어", phone: "0507-1280-3361", price: "맞춤 코스별 상이", image: "/shop1.jpg" },
    { id: 2, name: `미인테라피`, desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디마사지 프로그램", phone: "0507-1280-3303", price: "맞춤 코스별 상이", image: "/shop2.jpg" },
    { id: 3, name: `주주테라피`, desc: "재방문율 높은 만족도! 철저한 위생 관리와 프라이빗 힐링 바디마사지 서비스 제공", phone: "0507-1280-3193", price: "맞춤 코스별 상이", image: "/shop3.jpg" },
    { id: 4, name: `퀸즈테라피`, desc: "품격 있게 누리는 케어! 전문 힐러들의 체형 맞춤형 피로회복 특화 마사지 프로그램", phone: "0507-1280-3334", price: "맞춤 코스별 상이", image: "/shop4.jpg" },
    { id: 5, name: `오늘밤테라피`, desc: "엄선된 우수 제휴점! 수도권 전지역 쾌적하고 편안한 힐링 마사지", phone: "0507-1280-3223", price: "맞춤 코스별 상이", image: "/shop5.jpg" }
  ];

  // 💡 새로고침할 때마다 순서가 랜덤하게 섞이도록 셔플 로직 적용 (Server-side rendering 시점마다 적용)
  const shops = [...baseShops].sort(() => Math.random() - 0.5);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">케어나비 (CareNavi)</Link>
          <Link href={`/${city}/${district}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {districtName} 전체보기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">DONG LEVEL HEALING GUIDE</span>
          <h1 className="text-2xl md:text-4xl font-black">{fullTitle} 마사지 샵 추천 및 이용 안내</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullTitle} 인근 고객님을 위한 맞춤형 테라피 및 에스테틱 마사지 제휴 샵 안내입니다. 투명하고 정확한 정보를 확인해 보세요.
          </p>
        </section>

        {/* 동 단위 추천 제휴 샵 리스트 */}
        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs text-sky-600 font-bold tracking-widest uppercase">RECOMMENDED PARTNERS</p>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              {fullTitle} 추천 제휴 샵 (총 5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shops.map((lShop) => (
              <div key={lShop.id} className="bg-white border border-slate-200 hover:border-sky-300 rounded-2xl p-4 flex gap-4 items-center shadow-sm transition-all group relative">
                <Link href={`/${city}/${district}/${dong}/shop/${lShop.id}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />
                <img 
                  src={lShop.image} 
                  alt={lShop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-slate-100 group-hover:scale-105 transition-transform" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                    {fullTitle} {lShop.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-sky-600">{lShop.price}</span>
                    <span className="bg-sky-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm relative z-20">
                      상세보기
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}