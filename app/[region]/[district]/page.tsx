import type { Metadata } from "next";
import Link from "next/link";
import { ClientTextMixerInline } from "../ClientTextMixerInline";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
  searchParams: Promise<{
    dong?: string;
  }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울" : region === "incheon" ? "인천" : "경기";

  const locationKeyword = `${regionName} ${districtName} ${dongName}`.trim();

  const pageTitle = `${locationKeyword} 프리미엄 힐링 테라피 & 제휴 샵 안내 | 케어나비`;
  const pageDescription = `${locationKeyword} 지역 검증된 프리미엄 힐링 테라피 및 에스테틱 제휴 샵 정보. 투명한 가격과 쾌적한 휴식 공간 정보를 확인하세요.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      "케어나비",
      "CareNavi",
      `${locationKeyword} 힐링 테라피`,
      `${locationKeyword} 바디케어`,
      "제휴 샵 안내",
      "수도권 마사지 플랫폼"
    ],
    alternates: {
      canonical: `https://carenavi.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://carenavi.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
      siteName: "케어나비 (CareNavi)",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: "/og-main.png",
          width: 1200,
          height: 630,
          alt: `${locationKeyword} 케어나비 힐링 플랫폼`,
        },
      ],
    },
  };
}

export default async function RegionalDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울특별시" : region === "incheon" ? "인천광역시" : "경기도";
  
  const fullTitle = dongName 
    ? `${regionName} ${districtName} (${dongName})` 
    : `${regionName} ${districtName}`;

  // 클린 제휴 샵 리스트
  const localShops = [
    {
      id: 1,
      name: `✨ ${fullTitle} 제휴 한국골든테라피`,
      desc: "고품격 릴렉싱 & 딥티슈 피로회복! 전문 테라피스트의 품격 있는 1:1 맞춤 케어",
      phone: "0507-1280-3361",
      price: "맞춤 코스별 상이",
      image: "/shop1.jpg"
    },
    {
      id: 2,
      name: `🌸 ${fullTitle} 제휴 한국미인테라피`,
      desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램",
      phone: "0507-1280-3303",
      price: "맞춤 코스별 상이",
      image: "/shop2.jpg"
    },
    {
      id: 3,
      name: `💎 ${fullTitle} 제휴 주주테라피`,
      desc: "재방문율 높은 만족도! 철저한 위생 관리와 프라이빗 힐링 바디케어 서비스 제공",
      phone: "0507-1280-3193",
      price: "맞춤 코스별 상이",
      image: "/shop3.jpg"
    },
    {
      id: 4,
      name: `👑 ${fullTitle} 제휴 퀸즈홈테라피`,
      desc: "품격 있게 누리는 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 특화 프로그램",
      phone: "0507-1280-3334",
      price: "맞춤 코스별 상이",
      image: "/shop4.jpg"
    },
    {
      id: 5,
      name: `🌙 ${fullTitle} 제휴 오늘밤테라피`,
      desc: "엄선된 우수 제휴점! 수도권 전지역 쾌적하고 편안한 방문 힐링",
      phone: "0507-1280-3223",
      price: "맞춤 코스별 상이",
      image: "/shop5.jpg"
    }
  ];

  const jsonLd = {
    @context: "https://schema.org",
    @type: "LocalBusiness",
    name: `${fullTitle} 힐링 테라피 & 제휴 샵 안내 - 케어나비`,
    description: `${fullTitle} 지역 프리미엄 테라피 및 에스테틱 제휴업체 정보 제공`,
    url: `https://carenavi.netlify.app/${region}/${encodeURIComponent(districtName)}`,
    telephone: "0507-1280-3344",
    address: {
      @type: "PostalAddress",
      addressLocality: districtName,
      addressRegion: regionName,
      addressCountry: "KR"
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        
        {/* 상단 지역 대표 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-sky-400 text-xs font-black tracking-widest uppercase mb-1">
              {regionName.toUpperCase()} · LOCAL HEALING GUIDE
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-sm">
              {fullTitle} 프리미엄 힐링 테라피 안내
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              {fullTitle} 고객님을 위한 엄선된 테라피 및 에스테틱 제휴 샵 안내입니다. 검증된 프로그램과 투명한 정보를 확인해 보세요.
            </p>
          </div>
        </section>

        {/* 클라이언트 사이드 키워드 믹서 영역 */}
        <ClientTextMixerInline locationText={fullTitle} />

        {/* 제휴업체 카드 리스트 */}
        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs text-sky-600 font-bold tracking-widest uppercase">RECOMMENDED PARTNERS</p>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              {fullTitle} 추천 제휴 샵 (총 5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localShops.map((lShop) => (
              <div key={lShop.id} className="bg-white border border-slate-200 hover:border-sky-300 rounded-2xl p-4 flex gap-4 items-center shadow-sm transition-all group relative">
                <Link href={`/shop/${lShop.id}?region=${encodeURIComponent(fullTitle)}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />
                <img 
                  src={lShop.image} 
                  alt={lShop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-slate-100 group-hover:scale-105 transition-transform" 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {lShop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-sky-600">{lShop.price}</span>
                    <a 
                      href={`tel:${lShop.phone}`} 
                      className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm transition-all transform active:scale-95 relative z-20"
                    >
                      전화문의
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 건강 칼럼 섹션 */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>🌿</span> {fullTitle} 힐링 바디케어 & 건강 가이드
          </h3>
          <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
            <p>
              현대 직장인들이 오랫동안 앉아서 일하거나 스마트폰을 지속적으로 사용할 경우, 승모근과 목 주변의 근육이 경직되어 피로감을 유발하기 쉽습니다. 주기적인 스트레칭과 맞춤형 전신 케어는 신체 이완과 일상의 활력을 되찾는 데 큰 도움이 됩니다.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">💡 나에게 맞는 테라피 프로그램 선택 기준</h4>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                <li><strong className="text-slate-800">건식 릴렉싱 케어:</strong> 굳은 부위를 부드럽게 이완하여 신체 긴장을 해소합니다.</li>
                <li><strong className="text-slate-800">아로마 & 스웨디시:</strong> 고급 천연 오일로 피부 보습과 심신 안정, 순환에 도움을 줍니다.</li>
                <li><strong className="text-slate-800">프라이빗 샵:</strong> 쾌적하고 아늑한 공간에서 온전한 휴식을 누립니다.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 이용 방법 4단계 */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">케어나비 제휴 샵 이용 순서</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-sky-600 font-bold">STEP 1</span>
              <h4 className="font-bold text-slate-900 mt-1">지역 확인</h4>
              <p className="text-xs text-slate-500 mt-1">원하시는 지역 및 동을 선택합니다.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-sky-600 font-bold">STEP 2</span>
              <h4 className="font-bold text-slate-900 mt-1">샵 선택</h4>
              <p className="text-xs text-slate-500 mt-1">선호하는 제휴 샵 정보를 살펴봅니다.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-sky-600 font-bold">STEP 3</span>
              <h4 className="font-bold text-slate-900 mt-1">코스 안내</h4>
              <p className="text-xs text-slate-500 mt-1">컨디션에 맞는 프로그램을 확인합니다.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs text-sky-600 font-bold">STEP 4</span>
              <h4 className="font-bold text-slate-900 mt-1">예약 및 방문</h4>
              <p className="text-xs text-slate-500 mt-1">전화 및 예약을 통해 힐링을 누립니다.</p>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 (FAQ) */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">FAQ & GUIDE</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">{fullTitle} 자주 묻는 질문</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-sm">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="text-sky-600">Q.</span> 제휴 샵 예약은 어떻게 진행되나요?
              </div>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                <span className="text-emerald-600 font-bold">A.</span> 안내된 제휴 샵 번호로 연락하셔서 "케어나비 보고 연락드렸어요"라고 말씀하시면 보다 신속한 안내를 받으실 수 있습니다.
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1.5 shadow-sm">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <span className="text-sky-600">Q.</span> 등록된 제휴 샵들은 어떤 곳인가요?
              </div>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                <span className="text-emerald-600 font-bold">A.</span> 엄선된 시설과 깔끔한 환경을 갖춘 수도권(서울·경기·인천) 우수 테라피 및 에스테틱 전문점들입니다.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* 푸터 영역 */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-10 text-center text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a 
              href="tel:0507-1280-3344" 
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold px-4 py-2 rounded-xl border border-slate-700 transition-all text-xs shadow-sm"
            >
              <span>🤝</span> 케어나비 입점 및 제휴문의 (0507-1280-3344)
            </a>
          </div>
          <p className="text-slate-300 font-bold">케어나비(CareNavi)는 건전하고 쾌적한 힐링 테라피 & 에스테틱 정보 안내 플랫폼입니다.</p>
          <p className="text-[11px] text-slate-500">COPYRIGHT &copy; CareNavi ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}