import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
    dong: string;
    id: string;
  }>;
}

// 5개의 제휴 샵 데이터베이스
const shopDatabase: Record<string, {
  name: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: {
    category: string;
    badge?: string;
    desc: string;
    items: { time: string; price: string; recommend?: boolean }[];
  }[];
}> = {
  "1": {
    name: "한국골든테라피",
    phone: "0507-1280-3361",
    badge: "VIP 골든 힐링 케어",
    image: "/shop1.jpg",
    desc: "고품격 릴렉싱 & 딥티슈 피로회복! 전문 테라피스트의 품격 있는 1:1 맞춤 케어",
    courses: [
      {
        category: "스웨디시 코스",
        badge: "인기 추천",
        desc: "부드럽고 섬세한 터치로 전신의 피로를 깊이 있게 이완해 주는 프리미엄 스웨디시 케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true }
        ]
      },
      {
        category: "프리미엄 코스",
        badge: "시그니처",
        desc: "만족도 높은 힐링 테크닉으로 전신의 활력을 되찾아주는 맞춤형 바디케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ]
  },
  "2": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램",
    courses: [
      {
        category: "아로마 오일 코스",
        desc: "부드러운 아로마 감성과 힐링 케어를 동시에 즐길 수 있는 실속 프로그램.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true }
        ]
      },
      {
        category: "VIP 스웨디시 코스",
        badge: "인기 추천",
        desc: "고급 오일과 깊은 이완 테크닉으로 최고의 휴식을 선사하는 프리미엄 케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ]
  },
  "3": {
    name: "주주테라피",
    phone: "0507-1280-3193",
    badge: "만족도 1위 추천",
    image: "/shop3.jpg",
    desc: "철저한 위생 관리와 프라이빗 힐링 바디케어 서비스 제공",
    courses: [
      {
        category: "건식 타이 코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 마사지.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "VIP 감성 힐링코스",
        badge: "★추천",
        desc: "섬세하고 감각적인 터치로 깊은 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      }
    ]
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop4.jpg",
    desc: "전문 힐러들의 체형 맞춤형 피로회복 특화 홈케어 프로그램",
    courses: [
      {
        category: "아로마 힐링 코스",
        desc: "고급 아로마 오일을 사용하여 뭉친 피로를 부드럽게 이완시키는 방문 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "VIP 스페셜 코스",
        badge: "★추천",
        desc: "최고의 만족감을 선사하는 고품격 프리미엄 맞춤 스페셜 케어.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ]
  },
  "5": {
    name: "오늘밤테라피",
    phone: "0507-1280-3223",
    badge: "야간 힐링 만족 1위",
    image: "/shop5.jpg",
    desc: "엄선된 우수 제휴점! 수도권 전지역 쾌적하고 편안한 방문 힐링",
    courses: [
      {
        category: "스탠다드 코스",
        desc: "정통 지압과 스트레칭으로 피로를 시원하게 해소하는 기본 프로그램.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true }
        ]
      },
      {
        category: "프리미엄 올인원",
        badge: "BEST",
        desc: "종합적인 테라피를 모두 즐길 수 있는 150분 프리미엄 힐링 코스.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      }
    ]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district, dong, id } = resolvedParams;
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = decodeURIComponent(district);
  const dongName = decodeURIComponent(dong);
  const shop = shopDatabase[id] || shopDatabase["1"];
  
  const locationKeyword = `${cityName} ${districtName} ${dongName}`;

  // -------------------------------------------------------------
  // 🎯 30가지 이상의 신뢰도 높고 깔끔한 웰니스 테라피 타이틀 순환 풀 (키워드 반영)
  // -------------------------------------------------------------
  const charSum = (locationKeyword + shop.name + "carenavi_shop_split").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 30;

  const titleVariants = [
    /* 0 */ `${locationKeyword} 힐링 테라피 & 에스테틱 - ${shop.name}`,
    /* 1 */ `${locationKeyword} 맞춤형 바디케어 프로그램 · ${shop.name}`,
    /* 2 */ `[케어나비] ${locationKeyword} 전문 웰니스 테라피 - ${shop.name}`,
    /* 3 */ `${locationKeyword} 편안한 휴식 공간, 릴렉싱 케어 | ${shop.name}`,
    /* 4 */ `${locationKeyword} 프라이빗 맞춤 테라피 제휴처 - ${shop.name}`,
    /* 5 */ `${locationKeyword} 전신 피로회복 힐링 테라피 안내 · ${shop.name}`,
    /* 6 */ `[케어나비] ${locationKeyword} 방문 바디케어 서비스 - ${shop.name}`,
    /* 7 */ `${locationKeyword} 프리미엄 아로마 및 스웨디시 샵 · ${shop.name}`,
    /* 8 */ `${locationKeyword} 웰니스 프로그램 요금 및 코스 안내 - ${shop.name}`,
    /* 9 */ `${locationKeyword} 베테랑 테라피스트 1:1 맞춤 케어 · ${shop.name}`,
    /* 10 */ `케어나비 | ${locationKeyword} 안심 힐링 테라피 - ${shop.name}`,
    /* 11 */ `${locationKeyword} 릴렉싱 바디케어 및 스파 프로그램 - ${shop.name}`,
    /* 12 */ `${locationKeyword} 도심 속 힐링, 프리미엄 방문 테라피 · ${shop.name}`,
    /* 13 */ `${locationKeyword} 맞춤형 정통 테라피 제휴 샵 - ${shop.name}`,
    /* 14 */ `[추천 제휴] ${locationKeyword} 웰니스 케어 가이드 · ${shop.name}`,
    /* 15 */ `${locationKeyword} 심신 안정을 위한 힐링 테라피 - ${shop.name}`,
    /* 16 */ `${locationKeyword} 전문 에스테틱 및 바디케어 프로그램 · ${shop.name}`,
    /* 17 */ `${locationKeyword} 1:1 맞춤형 컨디션 회복 테라피 - ${shop.name}`,
    /* 18 */ `${locationKeyword} 쾌적하고 아늑한 휴식 테라피 정보 · ${shop.name}`,
    /* 19 */ `케어나비 ${locationKeyword} 프리미엄 테라피 - ${shop.name}`,
    /* 20 */ `${locationKeyword} 전신 순환 및 릴렉스 바디케어 · ${shop.name}`,
    /* 21 */ `${locationKeyword} 맞춤형 감성 테라피 및 힐링 - ${shop.name}`,
    /* 22 */ `[공식 제휴] ${locationKeyword} 안심 방문 케어 - ${shop.name}`,
    /* 23 */ `${locationKeyword} 프리미엄 힐링 테라피 코스 비교 · ${shop.name}`,
    /* 24 */ `${locationKeyword} 컨디션 맞춤형 바디케어 요금표 - ${shop.name}`,
    /* 25 */ `전문 웰니스 샵 제휴 정보 - ${locationKeyword} ${shop.name}`,
    /* 26 */ `${locationKeyword} 릴렉싱 아로마 테라피 프로그램 · ${shop.name}`,
    /* 27 */ `케어나비 추천 ${locationKeyword} 맞춤 힐링 - ${shop.name}`,
    /* 28 */ `${locationKeyword} 편안한 휴식을 위한 전문 바디케어 - ${shop.name}`,
    /* 29 */ `${locationKeyword} 최종 웰니스 테라피 제휴 가이드 · ${shop.name}`
  ];

  const descriptionVariants = [
    /* 0 */ `${locationKeyword} 지역 프리미엄 힐링 테라피 제휴 샵 ${shop.name}! 투명한 가격과 쾌적한 휴식 공간 정보를 케어나비에서 확인하세요.`,
    /* 1 */ `${locationKeyword} 맞춤형 바디케어 프로그램 운영 ${shop.name}. 지친 일상 속 편안한 휴식과 피로 회복을 돕는 전문 제휴처입니다.`,
    /* 2 */ `엄선된 ${locationKeyword} 웰니스 테라피 ${shop.name}. 정찰제 운영으로 편안하고 쾌적한 휴식을 누려보세요.`,
    /* 3 */ `${locationKeyword} 편안한 휴식 공간과 릴렉싱 케어 ${shop.name}. 숙련된 테라피스트의 1:1 맞춤 프로그램을 안내해 드립니다.`,
    /* 4 */ `${locationKeyword} 프라이빗 맞춤 테라피 ${shop.name}. 신뢰할 수 있는 시설과 품격 있는 서비스를 비교해 보세요.`,
    /* 5 */ `${locationKeyword} 전신 피로회복 힐링 테라피 ${shop.name}. 뭉친 근육을 부드럽게 이완하는 전문 바디케어입니다.`,
    /* 6 */ `쾌적한 ${locationKeyword} 방문 바디케어 제휴 정보 ${shop.name}. 투명한 프로그램 구성과 친절한 안내를 만나보세요.`,
    /* 7 */ `${locationKeyword} 프리미엄 아로마 및 스웨디시 제휴 샵 ${shop.name}. 심신 안정을 돕는 고품격 테라피를 확인하세요.`,
    /* 8 */ `${locationKeyword} 웰니스 프로그램 요금 및 코스 안내. ${shop.name}의 투명한 정찰제로 안심하고 이용하실 수 있습니다.`,
    /* 9 */ `베테랑 테라피스트의 ${locationKeyword} 1:1 맞춤 케어 (${shop.name}). 개인별 컨디션에 맞춘 최적의 힐링 솔루션을 제공합니다.`,
    /* 10 */ `케어나비가 엄선한 ${locationKeyword} 안심 힐링 테라피 ${shop.name}. 위생적이고 아늑한 제휴 샵 정보를 전해드립니다.`,
    /* 11 */ `${locationKeyword} 릴렉싱 바디케어 및 스파 프로그램 ${shop.name}. 일상의 스트레스를 편안하게 비워내 보세요.`,
    /* 12 */ `${locationKeyword} 프리미엄 방문 테라피 ${shop.name}. 익숙한 공간에서 온전한 휴식과 재충전을 누려보세요.`,
    /* 13 */ `${locationKeyword} 맞춤형 정통 테라피 제휴 샵 ${shop.name}. 엄선된 파트너들의 전문적인 케어 서비스를 확인하세요.`,
    /* 14 */ `신뢰할 수 있는 ${locationKeyword} 웰니스 케어 ${shop.name}. 투명한 정보 제공으로 편안한 선택을 도와드립니다.`,
    /* 15 */ `${locationKeyword} 심신 안정을 위한 힐링 테라피 ${shop.name}. 부드러운 이완과 웰빙을 위한 맞춤 프로그램.`,
    /* 16 */ `전문 에스테틱 및 바디케어 프로그램 안내. ${locationKeyword} 우수 제휴 샵 ${shop.name}의 상세 정보를 확인하세요.`,
    /* 17 */ `${locationKeyword} 1:1 맞춤형 컨디션 회복 테라피 (${shop.name}). 정성스러운 케어로 활기찬 일상을 되찾아보세요.`,
    /* 18 */ `${locationKeyword} 쾌적하고 아늑한 휴식 테라피 ${shop.name}. 세심하고 품격 있는 바디케어 제휴처 안내.`,
    /* 19 */ `케어나비 ${locationKeyword} 프리미엄 테라피 제휴점 ${shop.name}. 고객 만족도가 검증된 우수 샵 리스트입니다.`,
    /* 20 */ `${locationKeyword} 전신 순환 및 릴렉스 바디케어 ${shop.name}. 건강한 활력을 선사하는 웰니스 프로그램.`,
    /* 21 */ `${locationKeyword} 맞춤형 감성 테라피 및 힐링 프로그램 (${shop.name}). 마음까지 편안해지는 휴식을 경험해 보세요.`,
    /* 22 */ `공식 제휴된 ${locationKeyword} 안심 방문 케어 ${shop.name}. 투명하고 정직한 운영 시스템을 약속드립니다.`,
    /* 23 */ `${locationKeyword} 프리미엄 힐링 테라피 코스 비교 (${shop.name}). 내 몸에 꼭 맞는 프로그램과 가격 정보를 살펴보세요.`,
    /* 24 */ `${locationKeyword} 컨디션 맞춤형 바디케어 요금표 안내 (${shop.name}). 투명한 정찰제로 신뢰를 더합니다.`,
    /* 25 */ `전문 웰니스 샵 제휴 정보 - ${locationKeyword} ${shop.name}. 주민 여러분을 위한 힐링 가이드.`,
    /* 26 */ `${locationKeyword} 릴렉싱 아로마 테라피 프로그램 (${shop.name}). 고급 오일과 함께하는 깊은 이완의 시간.`,
    /* 27 */ `케어나비 추천 ${locationKeyword} 맞춤 힐링 케어 ${shop.name}. 품격 있는 휴식을 누려보세요.`,
    /* 28 */ `${locationKeyword} 편안한 휴식을 위한 전문 바디케어 (${shop.name}). 몸과 마음의 피로를 부드럽게 씻어내 드립니다.`,
    /* 29 */ `${locationKeyword} 최종 웰니스 테라피 제휴 가이드 (${shop.name}). 케어나비가 보증하는 안전하고 쾌적한 휴식 공간.`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: `https://carenavi.netlify.app/${city}/${district}/${dong}/shop/${id}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://carenavi.netlify.app/${city}/${district}/${dong}/shop/${id}`,
      siteName: "케어나비 (CareNavi)",
      locale: "ko_KR",
      type: "website",
      images: [{ url: shop.image, width: 800, height: 600, alt: shop.name }],
    },
  };
}

export default async function DongShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, dong, id } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = decodeURIComponent(district);
  const dongName = decodeURIComponent(dong);
  const shop = shopDatabase[id] || shopDatabase["1"];

  const fullLocation = `${cityName} ${districtName} ${dongName}`;
  const displayShopTitle = `${fullLocation} 제휴 - ${shop.name}`;

  // 다른 제휴 샵들 목록 구성
  const allShops = Object.entries(shopDatabase).map(([sId, sVal]) => ({
    id: sId,
    name: sVal.name,
    badge: sVal.badge,
    image: sVal.image,
    active: sId === id
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": displayShopTitle,
    "description": shop.desc,
    "telephone": shop.phone,
    "url": `https://carenavi.netlify.app/${city}/${district}/${dong}/shop/${id}`,
    "image": `https://carenavi.netlify.app${shop.image}`,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": fullLocation,
      "addressCountry": "KR"
    },
    "priceRange": "$$"
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-sky-600">케어나비 (CareNavi)</Link>
          <Link href={`/${city}/${district}?dong=${encodeURIComponent(dongName)}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {dongName} 목록으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
        {/* 상단 샵 정보 카드 */}
        <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img src={shop.image} alt={displayShopTitle} className="w-full h-full object-cover filter brightness-[0.85]" />
            <span className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">✨ {shop.badge}</span>
          </div>
          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10 bg-white rounded-t-3xl border-t border-slate-100">
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg border border-sky-100">
              📍 {fullLocation} 방문 제휴처
            </span>
            <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">{displayShopTitle}</h1>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{shop.desc}</p>
          </div>
        </section>

        {/* 🌟 다른 제휴 샵 빠르게 전환해서 보기 */}
        <section className="bg-white border border-slate-200 p-5 rounded-3xl space-y-3 shadow-sm">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
            {dongName} 다른 제휴 샵 둘러보기
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {allShops.map((s) => (
              <Link
                key={s.id}
                href={`/${city}/${district}/${dong}/shop/${s.id}`}
                className={`p-2.5 rounded-2xl border text-center text-xs font-bold transition-all ${
                  s.active 
                    ? "bg-sky-600 text-white border-sky-600 shadow-sm" 
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-300"
                }`}
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>

        {/* 코스 및 가격 안내 */}
        <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-lg md:text-2xl font-black text-slate-900 mt-1">💎 정규 코스 및 요금 안내</h2>
          </div>
          <div className="space-y-6">
            {shop.courses.map((courseGroup, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-slate-900 text-base">{courseGroup.category}</h3>
                  {courseGroup.badge && (
                    <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-2.5 py-0.5 rounded-full">
                      {courseGroup.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{courseGroup.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courseGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-3.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center shadow-2xs">
                      <span className="text-xs font-bold text-slate-700">⏱️ {item.time}</span>
                      <span className="text-sm font-black text-sky-600">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 고정 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-3 md:p-4 shadow-lg">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a href={`tel:${shop.phone}`} className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-sm">📞 전화예약 ({shop.phone})</a>
          <a href={`sms:${shop.phone}`} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-3.5 rounded-2xl text-xs md:text-sm">💬 문자상담</a>
        </div>
      </div>
    </div>
  );
}