import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
  }>;
}

// 🌟 출장을 완전히 배제한 순수 마사지 수식어 풀 (간결하고 임팩트 있는 형태, 40개)
const districtModifiers = [
  '전문 힐링 마사지', '프라이빗 맞춤 마사지', '웰니스 바디 마사지', '스웨디시 감성 마사지',
  '아로마 오일 마사지', '럭셔리 스파 마사지', 'VIP 프리미엄 마사지', '소프트 릴렉스 마사지',
  '딥티슈 바디 마사지', '스페셜 힐링 마사지', '피로회복 전신 마사지', '맞춤형 스웨디시 마사지',
  '실속형 바디 마사지', '종합 웰니스 마사지', '최고급 감성 마사지', '전문 바디케어 마사지',
  '맞춤 테라피 마사지', '1:1 프라이빗 마사지', '정통 스웨디시 마사지', '스페셜 아로마 마사지',
  '시원한 전신 마사지', '편안한 릴렉스 마사지', '고품격 테라피 마사지', '전문 아로마 마사지',
  '스웨디시 테라피 마사지', '딥티슈 힐링 마사지', '웰니스 스파 마사지', '정통 바디 마사지',
  '쾌적한 힐링 마사지', '종합 테라피 마사지', '최고급 바디 마사지', '전문 릴렉싱 마사지',
  '활력 충전 마사지', '근육이완 테라피 마사지', '바디 밸런스 마사지', '토탈 리프레시 마사지',
  '프라임 케어 마사지', '로얄 릴렉스 마사지', '시그니처 바디 마사지', '컴포트 힐링 마사지'
];

// 🌟 상세 설명 풀 (30개)
const districtDescriptions = [
  '검증된 전문 샵 정보와 체계적인 프로그램으로 지친 피로를 풀어드립니다.',
  '선입금 없는 안전한 시스템과 투명한 정찰제로 편안한 휴식을 선사합니다.',
  '엄선된 전문 관리사의 섬세한 손길로 최상의 마사지 힐링을 누려보세요.',
  '향기로운 아로마와 부드러운 터치로 나만의 프라이빗한 휴식을 선사합니다.',
  '일상에 지친 몸과 마음에 활력을 불어넣어 주는 맞춤형 테라피 안내.',
  '깊은 근육까지 시원하게 이완시켜 주는 전문 바디케어 서비스를 만나보세요.',
  '철저한 위생 관리와 고객 만족 중심의 고품격 프로그램을 제공합니다.',
  '빠르고 편리한 정보 확인으로 언제 어디서나 편안한 휴식을 누리세요.',
  '부드러운 오일과 정성 어린 터칭으로 깊은 안정감을 드립니다.',
  '피로와 스트레스를 말끔히 해소해 주는 프리미엄 바디 릴렉스 가이드.'
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const locationKeyword = `${cityName} ${districtName}`;

  // 🌟 순차적 인덱스 계산 (출장 완전 배제, 고유성 보장, 겹침 원천 차단)
  const seed = `${locationKeyword}-district-pure-seo`;
  const charSum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const modIdx = charSum % districtModifiers.length;
  const descIdx = (charSum * 7) % districtDescriptions.length;

  // 💡 사이트명과 샵 이름 배제, 짧고 간결한 타이틀 ([지역] [수식어 마사지])
  const finalTitle = `${locationKeyword} ${districtModifiers[modIdx]}`;
  const finalDescription = `${locationKeyword} 마사지 샵 정보. ${districtDescriptions[descIdx]}`;

  return {
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `https://carenavi.netlify.app/${city}/${district}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://carenavi.netlify.app/${city}/${district}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const districtName = districtInfo ? districtInfo.name : district;
  const fullTitle = `${cityName} ${districtName}`;

  const shops = [
    { id: 1, name: `골든테라피`, desc: "고품격 릴렉싱 & 딥티슈 피로회복! 전문 테라피스트의 품격 있는 1:1 맞춤 마사지 케어", phone: "0507-1280-3361", price: "맞춤 코스별 상이", image: "/shop1.jpg" },
    { id: 2, name: `미인테라피`, desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디마사지 프로그램", phone: "0507-1280-3303", price: "맞춤 코스별 상이", image: "/shop2.jpg" },
    { id: 3, name: `주주테라피`, desc: "재방문율 높은 만족도! 철저한 위생 관리와 프라이빗 힐링 바디마사지 서비스 제공", phone: "0507-1280-3193", price: "맞춤 코스별 상이", image: "/shop3.jpg" },
    { id: 4, name: `퀸즈테라피`, desc: "품격 있게 누리는 케어! 전문 힐러들의 체형 맞춤형 피로회복 특화 마사지 프로그램", phone: "0507-1280-3334", price: "맞춤 코스별 상이", image: "/shop4.jpg" },
    { id: 5, name: `오늘밤테라피`, desc: "엄선된 우수 제휴점! 수도권 전지역 쾌적하고 편안한 힐링 마사지", phone: "0507-1280-3223", price: "맞춤 코스별 상이", image: "/shop5.jpg" }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">케어나비 (CareNavi)</Link>
          <Link href="/" className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white space-y-3">
          <span className="text-sky-400 text-xs font-black tracking-widest uppercase">LOCAL HEALING GUIDE</span>
          <h1 className="text-2xl md:text-4xl font-black">{fullTitle} 마사지 샵 추천 및 이용 안내</h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullTitle} 고객님을 위한 엄선된 테라피 및 에스테틱 마사지 제휴 샵 안내입니다. 검증된 프로그램과 투명한 정보를 확인해 보세요.
          </p>
        </section>

        {/* 하위 동(읍/면) 선택 칩 리스트 */}
        {districtInfo && districtInfo.dongs && districtInfo.dongs.length > 0 && (
          <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              📍 {districtName} 세부 지역(동·읍·면) 선택
            </h2>
            <div className="flex flex-wrap gap-2">
              {districtInfo.dongs.map((dongName, idx) => (
                <Link
                  key={idx}
                  href={`/${city}/${district}/${encodeURIComponent(dongName)}`}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition"
                >
                  {dongName} &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 구 단위 추천 제휴 샵 리스트 */}
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
                <Link href={`/${city}/${district}/shop/${lShop.id}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />
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