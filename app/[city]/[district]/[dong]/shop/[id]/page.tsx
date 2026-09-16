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

const SITE_URL = "https://carenavi.netlify.app";
const SITE_NAME = "케어나비";

// 구 코드 영문을 한글로 변환하는 맵핑 사전
const districtNameMap: Record<string, string> = {
  // 서울
  jongno: "종로구", jung: "중구", yongsan: "용산구", seongdong: "성동구", gwangjin: "광진구",
  dongdaemun: "동대문구", jungnang: "중랑구", seongbuk: "성북구", gangbuk: "강북구", dobong: "도봉구",
  nowon: "노원구", eunpyeong: "은평구", seodaemun: "서대문구", mapo: "마포구", yangcheon: "양천구",
  gangseo: "강서구", guro: "구로구", geumcheon: "금천구", yeongdeungpo: "영등포구",
  dongjak: "동작구", gwanak: "관악구", seocho: "서초구", gangnam: "강남구", songpa: "송파구", gangdong: "강동구",
  // 경기 / 인천 주요 구 및 신설구
  suwon_jangan: "수원시 장안구", suwon_yeongtong: "수원시 영통구",
  seongnam_bundang: "성남시 분당구", goyang_ilsandong: "고양시 일산동구", yongin_suji: "용인시 수지구",
  anyang: "안양시", bucheon: "부천시", ansan: "안산시", pyeongtaek: "평택시",
  jemulpo: "제물포구", yeongjong: "영종구", michuhol: "미추홀구", yeonsu: "연수구",
  namdong: "남동구", bupyeong: "부평구", seohae: "서해구", geomdan: "검단구"
};

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
  const decodedDistrict = decodeURIComponent(district);
  const districtName = districtNameMap[decodedDistrict.toLowerCase()] || decodedDistrict;
  const dongName = decodeURIComponent(dong);
  const shop = shopDatabase[id] || shopDatabase["1"];
  
  const locationKeyword = `${cityName} ${districtName} ${dongName}`;
  const titleText = `${locationKeyword} 프리미엄 힐링 테라피 - ${shop.name}`;
  const descText = `${locationKeyword} 제휴 샵 ${shop.name}. 100% 안심 후불제 프로그램 및 코스별 가격 정보를 ${SITE_NAME}에서 확인하세요.`;

  return {
    title: titleText,
    description: descText,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}/${dong}/shop/${id}`,
    },
    openGraph: {
      title: titleText,
      description: descText,
      url: `${SITE_URL}/${city}/${district}/${dong}/shop/${id}`,
      siteName: `${SITE_NAME} (CareNavi)`,
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
  const decodedDistrict = decodeURIComponent(district);
  const districtName = districtNameMap[decodedDistrict.toLowerCase()] || decodedDistrict;
  const dongName = decodeURIComponent(dong);
  const shop = shopDatabase[id] || shopDatabase["1"];

  const fullLocation = `${cityName} ${districtName} ${dongName}`;
  const displayShopTitle = `${fullLocation} 프리미엄 힐링 테라피 - ${shop.name}`;

  const allShopsList = Object.entries(shopDatabase).map(([sId, sVal]) => ({
    id: sId,
    name: sVal.name,
    badge: sVal.badge,
    desc: sVal.desc,
    phone: sVal.phone,
    image: sVal.image,
    active: sId === id
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": displayShopTitle,
    "description": shop.desc,
    "telephone": shop.phone,
    "url": `${SITE_URL}/${city}/${district}/${dong}/shop/${id}`,
    "image": `${SITE_URL}${shop.image}`,
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
          <Link href="/" className="text-xl font-bold text-sky-600">{SITE_NAME} (CareNavi)</Link>
          <Link href={`/${city}/${district}/${encodeURIComponent(dongName)}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {dongName} 지역 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
        {/* 상단 현재 선택된 샵 정보 카드 */}
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

        {/* 전체 제휴 샵 목록 보기 카드 섹션 */}
        <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">PARTNER SHOPS IN {dongName}</span>
            <h3 className="text-base md:text-xl font-black text-slate-900 mt-1">
              ✨ {fullLocation} 추천 제휴 샵 (총 5곳)
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {allShopsList.map((s) => (
              <div 
                key={s.id} 
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  s.active 
                    ? "bg-sky-50/60 border-sky-400 shadow-xs" 
                    : "bg-slate-50 border-slate-200 hover:border-sky-300"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img src={s.image} alt={s.name} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 truncate">{s.name}</span>
                      {s.active && <span className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded-full">선택됨</span>}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/${city}/${district}/${dong}/shop/${s.id}`}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      s.active
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-sky-600 hover:text-white hover:border-sky-600"
                    }`}
                  >
                    {s.active ? "안내 보기" : "샵 선택"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 코스 및 가격 안내 */}
        <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-lg md:text-2xl font-black text-slate-900 mt-1">💎 {shop.name} 정규 코스 및 요금</h2>
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