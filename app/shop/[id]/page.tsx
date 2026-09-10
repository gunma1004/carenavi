import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    region?: string;
    keyword?: string;
  }>;
}

const shopData: Record<string, {
  name: string;
  phone: string;
  location: string;
  badge: string;
  image: string;
  desc: string;
  courses: {
    category: string;
    badge?: string;
    desc: string;
    items: { time: string; price: string; recommend?: boolean }[];
  }[];
  features: string[];
}> = {
  "1": {
    name: "한국골든테라피",
    phone: "0507-1280-3361",
    location: "서울 · 경기 · 인천 전지역 25분 내 신속 방문",
    badge: "VIP 골든 힐링 케어",
    image: "/shop1.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 출장 힐링 마사지와 출장 릴렉스 마사지로 일상의 피로를 완벽하게 해소해 드립니다.",
    courses: [
      {
        category: "👑 프리미엄 출장 스웨디시 마사지",
        badge: "BEST 시그니처",
        desc: "최고급 천연 오일과 전문 테라피스트의 수준 높은 1:1 감성 림프 순환 출장 바디케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true }
        ]
      },
      {
        category: "💎 맞춤형 출장 릴렉스 테라피",
        desc: "부드러운 압과 섬세한 테크닉으로 전신의 피로를 완벽하게 풀어주는 인기 출장 힐링 마사지 코스.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ],
    features: ["100% 안심 후불제", "수도권 25분 내 도착", "24시간 상시 운영", "출장 타이 마사지 연계"]
  },
  "2": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    location: "서울 · 경기 · 인천 전지역 신속 방문",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "품격 있는 힐링을 선사하는 프라이빗 방문 테라피! 출장 타이 마사지부터 출장 릴렉스 마사지까지 완벽 구비.",
    courses: [
      {
        category: "泰 아로디시 태국 코스",
        desc: "아로마 오일의 부드러움과 출장 타이 마사지 기법을 조화롭게 결합한 실속 전신 출장 케어.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true }
        ]
      },
      {
        category: "特 프리미엄 출장 힐링 마사지",
        badge: "인기 추천",
        desc: "세련된 감성 터치와 깊이 있는 전신 이완으로 지친 일상의 활력을 되찾아주는 출장 마사지 코스.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ],
    features: ["선입금 ZERO 100% 후불제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 출장 마사지 안내"]
  },
  "3": {
    name: "주주테라피",
    phone: "0507-1280-3193",
    location: "서울 · 경기 · 인천 전지역 신속 도착",
    badge: "만족도 1위 추천",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 출장 타이 마사지부터 올인원 VVIP 출장 힐링 마사지까지 체계적인 프로그램.",
    courses: [
      {
        category: "01 THAI | 전신 출장 타이 마사지",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 출장 타이 마사지 스트레칭 케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분 (추천)", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "02 AROMA | 부드러운 출장 아로마 마사지",
        badge: "인기 코스",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 출장 릴렉스 마사지.",
        items: [
          { time: "60분", price: "80,000원" },
          { time: "90분 (인기)", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      }
    ],
    features: ["선입금 없는 100% 후불제", "평균 25분 빠른 출장 마사지", "24시간 상담 가능", "최고급 오일 사용"]
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    location: "서울 · 경기 · 인천 전지역 방문",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop4.jpg",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 품격 있는 1:1 맞춤 출장 힐링 마사지 서비스.",
    courses: [
      {
        category: "01 DRY | 건식 출장 타이 마사지",
        desc: "오일 없이 건식 지압과 스트레칭으로 굳은 전신 근육을 시원하게 풀어가는 출장 마사지 코스.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "02 AROMA | 아로마 출장 릴렉스 마사지",
        desc: "고급 아로마 오일을 사용하여 뭉친 피로를 부드럽게 이완시키는 방문 릴렉싱 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      }
    ],
    features: ["100% 후불 안심결제", "전문 관리사 상시 대기", "수도권 전지역 출장 마사지", "24시간 예약 가능"]
  },
  "5": {
    name: "오늘밤테라피",
    phone: "0507-1280-3223",
    location: "서울 · 경기 · 인천 전지역 실시간 방문",
    badge: "야간 힐링 만족 1위",
    image: "/shop5.jpg",
    desc: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 출장 힐링 마사지와 출장 릴렉스 마사지로 완벽하게 날려버리세요.",
    courses: [
      {
        category: "01 DRY | 🧠 건식 출장 타이 마사지",
        desc: "오일 없이 정통 건식 지압과 스트레칭으로 굳은 전신 근육과 피로를 시원하게 해소합니다.",
        items: [
          { time: "60분 코스", price: "60,000원" },
          { time: "90분 코스", price: "80,000원", recommend: true },
          { time: "120분 코스", price: "90,000원" }
        ]
      },
      {
        category: "02 SENSUAL | 🧠 감성 출장 스웨디시",
        badge: "감성 릴렉스",
        desc: "감각적이고 섬세한 터치와 부드러운 출장 릴렉스 마사지 기법으로 깊은 이완과 힐링을 선사합니다.",
        items: [
          { time: "60분 코스", price: "90,000원" },
          { time: "90분 코스", price: "110,000원", recommend: true },
          { time: "120분 코스", price: "130,000원" }
        ]
      }
    ],
    features: ["100% 안심 후불제", "수도권 전지역 25분 칼도착 출장 마사지", "심야 24시 상시 운영", "개인 맞춤 압 조절"]
  }
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const shop = shopData[resolvedParams.id] || shopData["1"];
  
  // URL 쿼리로 전달된 지역 키워드가 있다면 조합 (예: ?region=서울 강남구)
  const regionPrefix = resolvedSearchParams.region ? `${decodeURIComponent(resolvedSearchParams.region)} 출장마사지 ` : "서울·경기·인천 출장마사지 ";
  const fullTitleKeyword = `${regionPrefix}${shop.name}`;

  return {
    title: `${fullTitleKeyword} | 리추얼(Ritual) 24시 안심 후불제`,
    description: `${fullTitleKeyword}! 선입금 없는 100% 후불제 시스템, 출장 릴렉스 및 타이 마사지 코스별 가격비교와 신속 예약 정보를 리추얼에서 확인하세요.`,
    alternates: {
      canonical: `https://ritual-therapy.netlify.app/shop/${resolvedParams.id}`,
    },
    openGraph: {
      title: `${fullTitleKeyword} | 리추얼(Ritual)`,
      description: `${fullTitleKeyword} 코스 및 가격 정보 안내. 100% 안심 후불제로 편안하게 이용해 보세요.`,
      url: `https://ritual-therapy.netlify.app/shop/${resolvedParams.id}`,
      siteName: "리추얼(Ritual)",
      locale: "ko_KR",
      type: "website",
      images: [{ url: shop.image, width: 800, height: 600, alt: shop.name }],
    },
  };
}

export default async function ShopDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const shopId = resolvedParams.id;
  const shop = shopData[shopId] || shopData["1"];

  // 동적 지역 키워드 조합 (기본값: 서울·경기·인천 지역별)
  const dynamicRegion = resolvedSearchParams.region ? decodeURIComponent(resolvedSearchParams.region) : "서울·경기·인천";
  const displayShopTitle = `${dynamicRegion} 출장마사지 ${shop.name}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": displayShopTitle,
    "description": shop.desc,
    "telephone": shop.phone,
    "url": `https://ritual-therapy.netlify.app/shop/${shopId}`,
    "image": `https://ritual-therapy.netlify.app${shop.image}`,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": `${dynamicRegion} 출장 마사지 구역`,
      "addressCountry": "KR"
    },
    "priceRange": "$$"
  };

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 bg-[#08080a]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img 
              src="/logo.png" 
              alt="리추얼 로고" 
              className="w-9 h-9 rounded-xl object-cover border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent leading-none">
                리추얼 <span className="text-xs text-amber-300/80 font-semibold">Ritual</span>
              </span>
            </div>
          </Link>
          
          <Link href="/" className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all">
            🏠 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
        {/* 대표 비주얼 카드 */}
        <section className="bg-[#121216] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img 
              src={shop.image} 
              alt={displayShopTitle} 
              className="w-full h-full object-cover filter brightness-[0.55]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/30"></div>
            <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              ✨ {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {shop.location}
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white">
              {displayShopTitle}
            </h1>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/60 p-4 rounded-2xl border border-white/5">
              {shop.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-amber-300">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 상세 코스 및 요금 목록 */}
        <section className="bg-[#0f0f13] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">💎 {displayShopTitle} 정규 코스 및 요금 안내</h2>
          </div>

          <div className="space-y-6">
            {shop.courses.map((courseGroup, idx) => (
              <div 
                key={idx} 
                className="bg-black/60 border border-white/10 hover:border-amber-500/40 p-5 md:p-6 rounded-2xl space-y-4 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-base md:text-lg">
                      {courseGroup.category}
                    </h3>
                    {courseGroup.badge && (
                      <span className="text-[10px] bg-amber-500 text-black font-black px-2 py-0.5 rounded-full">
                        {courseGroup.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {courseGroup.desc}
                </p>

                {/* 시간별 가격 리스트 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                  {courseGroup.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx}
                      className={`p-3.5 rounded-xl border flex justify-between items-center ${
                        item.recommend 
                          ? "bg-amber-500/10 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                          : "bg-[#121216] border-white/5"
                      }`}
                    >
                      <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                        <span className="text-amber-400">⏱️</span> {item.time}
                      </span>
                      <span className="text-sm font-black text-amber-400">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 안내사항 */}
        <section className="bg-black/80 p-5 rounded-2xl border border-white/10">
          <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> 출장 마사지 이용 예약 안내
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>리추얼 제휴업체는 <strong>100% 후불제</strong> 출장 마사지 시스템으로 운영됩니다. 출발 전 선입금을 절대 요구하지 않습니다.</li>
            <li>서울, 경기, 인천 희망하시는 시간 20~30분 전에 미리 예약 문의 주시면 보다 원활한 출장 힐링 마사지 매칭이 가능합니다.</li>
          </ul>
        </section>

      </main>

      {/* 하단 고정 전화/문자 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a 
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> 전화로 즉시예약
          </a>
          <a 
            href={`sms:${shop.phone}?body=${encodeURIComponent(`${displayShopTitle} 예약 문의드립니다. (리추얼 보고 연락드렸습니다)`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 hover:border-amber-500/40 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>

    </div>
  );
}