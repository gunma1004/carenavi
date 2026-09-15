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

// 구 코드 영문을 한글로 변환하는 맵핑 사전
const districtNameMap: Record<string, string> = {
  // 서울
  jongno: "종로구", jung: "중구", yongsan: "용산구", seongdong: "성동구", gwangjin: "광진구",
  dongdaemun: "동대문구", jungnang: "중랑구", seongbuk: "성북구", gangbuk: "강북구", dobong: "도봉구",
  nowon: "노원구", eunpyeong: "은평구", seodaemun: "서대문구", mapo: "마포구", yangcheon: "양천구",
  gangseo: "강서구", guro: "구로구", geumcheon: "금천구", yeongdeungpo: "영등포구", 동작구: "동작구",
  dongjak: "동작구", gwanak: "관악구", seocho: "서초구", gangnam: "강남구", songpa: "송파구", gangdong: "강동구",
  // 경기 / 인천 주요 구
  suwon_jangan: "수원시 장안구", suwon_gwonseon: "수원시 권선구", suwon_paldal: "수원시 팔달구", suwon_yeongtong: "수원시 영통구",
  seongnam_sujeong: "성남시 수정구", seongnam_jungwon: "성남시 중원구", seongnam_bundang: "성남시 분당구",
  goyang_deogyang: "고양시 덕양구", goyang_ilsandong: "고양시 일산동구", goyang_ilsanseo: "고양시 일산서구",
  yongin_cheoin: "용인시 처인구",용인시기흥구: "용인시 기흥구", yongin_giheung: "용인시 기흥구", yongin_suji: "용인시 수지구",
  michuhol: "미추홀구", yeonsu: "연수구", namdong: "남동구", bupyeong: "부평구", gyeyang: "계양구", seogu: "서구"
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
  const charSum = (locationKeyword + shop.name + "carenavi_dong_split").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 30;

  const titleVariants = [
    /* 0 */ `${locationKeyword} 출장 타이 마사지 - ${shop.name}`,
    /* 1 */ `${locationKeyword} 출장 아로마 마사지 - ${shop.name}`,
    /* 2 */ `${locationKeyword} 출장 스웨디시 마사지 · ${shop.name}`,
    /* 3 */ `[케어나비] ${locationKeyword} 출장 타이 마사지 24시 - ${shop.name}`,
    /* 4 */ `${locationKeyword} 출장 아로마 마사지 및 릴렉스 케어 | ${shop.name}`,
    /* 5 */ `${locationKeyword} 출장 스웨디시 마사지 전문 가이드 - ${shop.name}`,
    /* 6 */ `[안심후불] ${locationKeyword} 출장 타이 마사지 추천 - ${shop.name}`,
    /* 7 */ `${locationKeyword} 출장 아로마 마사지 & 힐링 케어 · ${shop.name}`,
    /* 8 */ `${locationKeyword} 출장 스웨디시 마사지 가격 및 코스 안내 - ${shop.name}`,
    /* 9 */ `케어나비 | ${locationKeyword} 출장 타이 마사지 제휴 샵 - ${shop.name}`,
    /* 10 */ `${locationKeyword} 출장 아로마 마사지 24시 신속 방문 · ${shop.name}`,
    /* 11 */ `${locationKeyword} 출장 스웨디시 마사지 제휴 정보 - ${shop.name}`,
    /* 12 */ `[추천 제휴] ${locationKeyword} 출장 타이 마사지 - ${shop.name}`,
    /* 13 */ `${locationKeyword} 출장 아로마 마사지 1:1 맞춤 방문 - ${shop.name}`,
    /* 14 */ `케어나비 ${locationKeyword} 출장 스웨디시 마사지 - ${shop.name}`,
    /* 15 */ `${locationKeyword} 출장 타이 마사지 코스별 요금표 - ${shop.name}`,
    /* 16 */ `${locationKeyword} 출장 아로마 마사지 전문 제휴점 - ${shop.name}`,
    /* 17 */ `케어나비 추천 ${locationKeyword} 출장 스웨디시 마사지 - ${shop.name}`,
    /* 18 */ `[24시 후불제] ${locationKeyword} 출장 타이 마사지 - ${shop.name}`,
    /* 19 */ `${locationKeyword} 출장 아로마 마사지 최종 안내 - ${shop.name}`,
    /* 20 */ `${locationKeyword} 출장 타이 마사지 안내 - ${shop.name}`,
    /* 21 */ `${locationKeyword} 출장 아로마 마사지 안내 - ${shop.name}`,
    /* 22 */ `${locationKeyword} 출장 스웨디시 마사지 안내 - ${shop.name}`,
    /* 23 */ `케어나비 ${locationKeyword} 출장 타이 마사지 - ${shop.name}`,
    /* 24 */ `케어나비 ${locationKeyword} 출장 아로마 마사지 - ${shop.name}`,
    /* 25 */ `${locationKeyword} 전문 출장 타이 마사지 샵 - ${shop.name}`,
    /* 26 */ `${locationKeyword} 전문 출장 아로마 마사지 샵 - ${shop.name}`,
    /* 27 */ `${locationKeyword} 프리미엄 출장 타이 마사지 - ${shop.name}`,
    /* 28 */ `${locationKeyword} 프리미엄 출장 아로마 마사지 - ${shop.name}`,
    /* 29 */ `${locationKeyword} 안심 후불제 출장 타이 마사지 - ${shop.name}`
  ];

  const descriptionVariants = [
    /* 0 */ `${locationKeyword} 출장 타이 마사지 전문 ${shop.name}! 선입금 없는 100% 안심 후불제 코스 및 가격 정보를 케어나비에서 확인하세요.`,
    /* 1 */ `${locationKeyword} 출장 아로마 마사지 전문 제휴 샵 ${shop.name}. 24시 신속 방문과 투명한 코스별 가격비교를 제공합니다.`,
    /* 2 */ `선입금 사기 걱정 없는 100% 후불제! ${locationKeyword} 출장 스웨디시 마사지 프로그램과 전문 관리사 맞춤 케어를 ${shop.name}에서 만나보세요.`,
    /* 3 */ `${locationKeyword} 릴렉스 케어 전문 ${shop.name}. 지친 피로를 풀어주는 1:1 맞춤 방문 힐링 서비스를 안내합니다.`,
    /* 4 */ `${locationKeyword} 출장 타이 마사지 24시 예약 가이드. 검증된 ${shop.name} 제휴점에서 편안하고 안심되는 휴식을 누려보세요.`,
    /* 5 */ `${locationKeyword} 출장 아로마 마사지 전문점 ${shop.name}. 25분 내 신속한 방문과 정직한 후불제 시스템을 보장합니다.`,
    /* 6 */ `안심하고 이용하는 ${locationKeyword} 출장 스웨디시 마사지 ${shop.name}! 선입금 0원, 100% 후불제로 쾌적한 전신 바디케어를 경험하세요.`,
    /* 7 */ `${locationKeyword} 특화 제휴 샵 ${shop.name}. 세심한 터치로 일상의 피로를 말끔히 비워내 드립니다.`,
    /* 8 */ `${locationKeyword} 출장 타이 마사지 코스별 상세 요금표 안내. ${shop.name}의 투명하고 합리적인 방문 테라피 프로그램을 확인하세요.`,
    /* 9 */ `${locationKeyword} 출장 아로마 마사지 우수 제휴점 ${shop.name}. 언제나 편리하게 이용할 수 있는 실시간 예약 가이드.`,
    /* 10 */ `케어나비가 엄선한 ${locationKeyword} 출장 스웨디시 마사지 ${shop.name}. 100% 후불제로 안전하고 편안한 나만의 홈스파를 즐겨보세요.`,
    /* 11 */ `${locationKeyword} 전문 ${shop.name}! 숙련된 힐러진의 정성스러운 1:1 방문 케어 안내.`,
    /* 12 */ `${locationKeyword} 출장 타이 마사지 24시 연중무휴 운영 ${shop.name}. 깊은 이완과 힐링을 선사하는 프리미엄 방문 테라피.`,
    /* 13 */ `${locationKeyword} 출장 아로마 마사지 제휴 정보. ${shop.name}에서 제공하는 정직한 코스별 가격을 비교하세요.`,
    /* 14 */ `신속한 방문과 친절한 서비스! ${locationKeyword} 출장 스웨디시 마사지 전문 ${shop.name}의 안심 후불제 프로그램을 만나보세요.`,
    /* 15 */ `${locationKeyword} 인기 제휴점 ${shop.name}. 지친 몸과 마음에 편안한 쉼을 선물해 드립니다.`,
    /* 16 */ `${locationKeyword} 출장 타이 마사지 ${shop.name}. 선입금 없는 안전한 후불 시스템으로 부담 없이 이용하세요.`,
    /* 17 */ `${locationKeyword} 출장 아로마 마사지 1:1 맞춤 방문 솔루션 ${shop.name}. 굳은 전신 근육을 시원하게 풀어주는 전문 힐링 프로그램.`,
    /* 18 */ `${locationKeyword} 출장 스웨디시 마사지 가이드. ${shop.name}에서 투명하고 정직한 제휴 정보를 제공합니다.`,
    /* 19 */ `${locationKeyword} 전문 ${shop.name}! 최고급 오일 테라피와 함께 온전한 휴식을 누려보세요.`,
    /* 20 */ `${locationKeyword} 출장 타이 마사지 제휴 안내 ${shop.name}. 24시간 언제든 빠르고 정확하게 연결해 드립니다.`,
    /* 21 */ `${locationKeyword} 출장 아로마 마사지 제휴 샵 ${shop.name}. 프라이빗 맞춤 케어로 일상의 활력을 되찾아보세요.`,
    /* 22 */ `100% 후불제로 안전한 ${locationKeyword} 출장 스웨디시 마사지 ${shop.name}. 출발 전 선입금을 절대 요구하지 않는 믿을 수 있는 제휴점.`,
    /* 23 */ `${locationKeyword} 출장 타이 마사지 종합 안내. ${shop.name}의 합리적인 코스 요금을 지금 확인하세요.`,
    /* 24 */ `${locationKeyword} 출장 아로마 마사지 요금 및 예약 안내. ${shop.name}의 베테랑 테라피스트가 선사하는 고품격 방문 바디케어.`,
    /* 25 */ `${locationKeyword} 출장 스웨디시 마사지 우수 제휴 샵 ${shop.name}. 신속한 방문 배차로 만족도를 높여드립니다.`,
    /* 26 */ `${locationKeyword} 전문 관리사 배정 ${shop.name}. 부드러운 림프 순환과 힐링을 위한 최적의 선택.`,
    /* 27 */ `케어나비 공식 ${locationKeyword} 출장 타이 마사지 ${shop.name}. 쾌적하고 편안한 휴식 공간 제휴 정보를 전해드립니다.`,
    /* 28 */ `${locationKeyword} 출장 아로마 마사지 제휴 프로그램. ${shop.name}과 함께 묵은 피로를 시원하게 날려버리세요.`,
    /* 29 */ `${locationKeyword} 출장 스웨디시 마사지 최종 이용 가이드 ${shop.name}. 100% 안심 후불제 시스템으로 편안하고 안전하게 이용하세요.`
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
  const decodedDistrict = decodeURIComponent(district);
  const districtName = districtNameMap[decodedDistrict.toLowerCase()] || decodedDistrict;
  const dongName = decodeURIComponent(dong);
  const shop = shopDatabase[id] || shopDatabase["1"];

  const fullLocation = `${cityName} ${districtName} ${dongName}`;
  const displayShopTitle = `${fullLocation} 출장 타이 마사지 - ${shop.name}`;

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
          <Link href={`/${city}/${district}`} className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            &larr; {districtName} 지역 홈으로
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

        {/* 🌟 5개 전체 제휴 샵 목록 보기 카드 섹션 */}
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