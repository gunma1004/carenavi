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

const shopData: Record<string, {
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
  features: string[];
}> = {
  "1": {
    name: "한국골든테라피",
    phone: "0507-1280-3361",
    badge: "VIP 골든 힐링 케어",
    image: "/shop1.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 맞춤 테라피로 일상의 피로를 완벽하게 해소해 드립니다.",
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
    ],
    features: ["100% 안심 후불제", "25분 내 신속 방문", "24시간 상시 운영", "전문 관리사 1:1 배정"]
  },
  "2": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "품격 있는 힐링을 선사하는 프라이빗 방문 테라피! 아로디시부터 VIP 스웨디시까지 완벽 구비.",
    courses: [
      {
        category: "아로디시 코스",
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
      },
      {
        category: "한국인스웨디시 코스",
        badge: "BEST",
        desc: "한국인 전문 관리사의 섬세하고 수준 높은 프리미엄 맞춤 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 ZERO 100% 후불제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 케어 안내"]
  },
  "3": {
    name: "주주테라피",
    phone: "0507-1280-3193",
    badge: "만족도 1위 추천",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 정통 타이 마사지부터 올인원 VIP 코스까지 체계적인 프로그램.",
    courses: [
      {
        category: "타이코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 마사지.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "타이 & 아로마 & 풋코스를 모두 즐길 수 있는 올인원 150분 힐링.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 세심한 터치로 완성되는 최고급 스웨디시.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 없는 100% 후불제", "평균 25분 빠른 방문", "24시간 상담 가능", "최고급 오일 사용"]
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop4.jpg",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 품격 있는 1:1 맞춤 방문 힐링 서비스.",
    courses: [
      {
        category: "건식 힐링 코스",
        desc: "오일 없이 건식 지압과 스트레칭으로 굳은 전신 근육을 시원하게 풀어주는 코스.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
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
        category: "힐링스웨디시 코스",
        badge: "인기",
        desc: "부드럽고 감성적인 오일 테라피로 심신의 안정을 찾아주는 스웨디시.",
        items: [
          { time: "60분", price: "80,000원" },
          { time: "90분", price: "100,000원", recommend: true },
          { time: "120분", price: "120,000원" }
        ]
      },
      {
        category: "VIP스페셜코스",
        badge: "★추천",
        desc: "최고의 만족감을 선사하는 고품격 프리미엄 맞춤 스페셜 케어.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      },
      {
        category: "한국 관리사 코스",
        badge: "BEST",
        desc: "한국인 관리사의 전문적인 손길로 진행되는 맞춤형 프리미엄 코스.",
        items: [
          { time: "60분", price: "150,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 후불 안심결제", "전문 관리사 상시 대기", "수도권 전지역 출장 방문", "24시간 예약 가능"]
  },
  "5": {
    name: "오늘밤테라피",
    phone: "0507-1280-3223",
    badge: "야간 힐링 만족 1위",
    image: "/shop5.jpg",
    desc: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 타이부터 스웨디시까지 완벽하게 날려버리세요.",
    courses: [
      {
        category: "타이코스",
        desc: "오일 없이 정통 건식 지압과 스트레칭으로 피로를 시원하게 해소.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "천연 오일의 부드러움으로 전신을 편안하게 이완시켜주는 아로마 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "섬세하고 감각적인 터치로 깊은 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "완벽한 휴식을 위한 고품격 프리미엄 스페셜 관리 프로그램.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "타이 & 아로마 & 풋코스를 종합적으로 즐기는 150분 올인원 코스.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 디테일하고 품격 있는 스웨디시 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 안심 후불제", "수도권 전지역 신속 방문", "심야 24시 상시 운영", "개인 맞춤 압 조절"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district, dong, id } = resolvedParams;
  const shop = shopData[id] || shopData["1"];
  
  const cityText = city.toUpperCase() === "SEOUL" ? "서울" : city.toUpperCase() === "GYEONGGI" ? "경기" : "인천";
  const locationPrefix = `${cityText} ${district} ${dong}`;

  // -------------------------------------------------------------
  // 🎯 30가지 이상의 다양한 출장 형태 타이틀 및 디스크립션 풀(Pool) 구성
  // -------------------------------------------------------------
  const charSum = (locationPrefix + shop.name + "carenavi_shop_split").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 30;

  const titleVariants = [
    /* 0 */ `${locationPrefix} 출장 타이 마사지 · 출장 아로마 마사지 - ${shop.name}`,
    /* 1 */ `${locationPrefix} 출장 힐링 마사지 & 출장 스웨디시 테라피 · ${shop.name}`,
    /* 2 */ `[케어나비] ${locationPrefix} 출장 타이 마사지 24시 안내 - ${shop.name}`,
    /* 3 */ `${locationPrefix} 출장 아로마 마사지 및 출장 릴렉스 케어 | ${shop.name}`,
    /* 4 */ `${locationPrefix} 출장 힐링 마사지 전문 가이드 - ${shop.name}`,
    /* 5 */ `${locationPrefix} 출장 스웨디시 마사지 · 출장 타이 마사지 | ${shop.name}`,
    /* 6 */ `[안심후불] ${locationPrefix} 출장 아로마 마사지 추천 - ${shop.name}`,
    /* 7 */ `${locationPrefix} 출장 릴렉스 마사지 & 출장 힐링 마사지 · ${shop.name}`,
    /* 8 */ `${locationPrefix} 출장 타이 마사지 가격 및 코스 안내 - ${shop.name}`,
    /* 9 */ `${locationPrefix} 출장 스웨디시 마사지 및 출장 아로마 마사지 | ${shop.name}`,
    /* 10 */ `케어나비 | ${locationPrefix} 출장 힐링 마사지 제휴 샵 - ${shop.name}`,
    /* 11 */ `${locationPrefix} 출장 타이 마사지 · 출장 릴렉스 테라피 - ${shop.name}`,
    /* 12 */ `${locationPrefix} 출장 아로마 마사지 24시 신속 방문 · ${shop.name}`,
    /* 13 */ `${locationPrefix} 출장 스웨디시 마사지 & 출장 힐링 마사지 | ${shop.name}`,
    /* 14 */ `[추천 제휴] ${locationPrefix} 출장 타이 마사지 - ${shop.name}`,
    /* 15 */ `${locationPrefix} 출장 힐링 마사지 & 출장 아로마 마사지 · ${shop.name}`,
    /* 16 */ `${locationPrefix} 출장 릴렉스 마사지 및 출장 스웨디시 케어 | ${shop.name}`,
    /* 17 */ `${locationPrefix} 출장 타이 마사지 1:1 맞춤 방문 - ${shop.name}`,
    /* 18 */ `${locationPrefix} 출장 아로마 마사지 · 출장 힐링 마사지 안내 · ${shop.name}`,
    /* 19 */ `케어나비 ${locationPrefix} 출장 스웨디시 마사지 - ${shop.name}`,
    /* 20 */ `${locationPrefix} 출장 힐링 마사지 및 출장 타이 마사지 | ${shop.name}`,
    /* 21 */ `${locationPrefix} 출장 아로마 마사지 & 출장 릴렉스 테라피 - ${shop.name}`,
    /* 22 */ `[24시 후불제] ${locationPrefix} 출장 타이 마사지 - ${shop.name}`,
    /* 23 */ `${locationPrefix} 출장 스웨디시 마사지 · 출장 아로마 마사지 · ${shop.name}`,
    /* 24 */ `${locationPrefix} 출장 힐링 마사지 코스별 요금표 - ${shop.name}`,
    /* 25 */ `${locationPrefix} 출장 타이 마사지 및 출장 힐링 마사지 | ${shop.name}`,
    /* 26 */ `${locationPrefix} 출장 아로마 마사지 전문 제휴점 - ${shop.name}`,
    /* 27 */ `케어나비 추천 ${locationPrefix} 출장 스웨디시 마사지 - ${shop.name}`,
    /* 28 */ `${locationPrefix} 출장 릴렉스 마사지 · 출장 타이 마사지 · ${shop.name}`,
    /* 29 */ `${locationPrefix} 출장 힐링 마사지 최종 안내 - ${shop.name}`
  ];

  const descriptionVariants = [
    /* 0 */ `${locationPrefix} 출장 타이 마사지, 출장 아로마 마사지 전문 ${shop.name}! 선입금 없는 100% 안심 후불제 코스 및 가격 정보를 케어나비에서 확인하세요.`,
    /* 1 */ `${locationPrefix} 출장 힐링 마사지 및 출장 스웨디시 테라피 제휴 샵 ${shop.name}. 24시 신속 방문과 투명한 코스별 가격비교를 제공합니다.`,
    /* 2 */ `선입금 사기 걱정 없는 100% 후불제! ${locationPrefix} 출장 타이 마사지 프로그램과 전문 관리사 맞춤 케어를 ${shop.name}에서 만나보세요.`,
    /* 3 */ `${locationPrefix} 출장 아로마 마사지, 출장 릴렉스 케어 전문 ${shop.name}. 지친 피로를 풀어주는 1:1 맞춤 방문 힐링 서비스를 안내합니다.`,
    /* 4 */ `${locationPrefix} 출장 힐링 마사지 24시 예약 가이드. 검증된 ${shop.name} 제휴점에서 편안하고 안심되는 휴식을 누려보세요.`,
    /* 5 */ `${locationPrefix} 출장 스웨디시 마사지 및 출장 타이 마사지 전문점 ${shop.name}. 25분 내 신속한 방문과 정직한 후불제 시스템을 보장합니다.`,
    /* 6 */ `안심하고 이용하는 ${locationPrefix} 출장 아로마 마사지 ${shop.name}! 선입금 0원, 100% 후불제로 쾌적한 전신 바디케어를 경험하세요.`,
    /* 7 */ `${locationPrefix} 출장 릴렉스 마사지, 출장 힐링 마사지 특화 제휴 샵 ${shop.name}. 세심한 터치로 일상의 피로를 말끔히 비워내 드립니다.`,
    /* 8 */ `${locationPrefix} 출장 타이 마사지 코스별 상세 요금표 안내. ${shop.name}의 투명하고 합리적인 방문 테라피 프로그램을 확인하세요.`,
    /* 9 */ `${locationPrefix} 출장 스웨디시 마사지, 출장 아로마 마사지 우수 제휴점 ${shop.name}. 언제나 편리하게 이용할 수 있는 실시간 예약 가이드.`,
    /* 10 */ `케어나비가 엄선한 ${locationPrefix} 출장 힐링 마사지 ${shop.name}. 100% 후불제로 안전하고 편안한 나만의 홈스파를 즐겨보세요.`,
    /* 11 */ `${locationPrefix} 출장 타이 마사지, 출장 릴렉스 테라피 전문 ${shop.name}! 숙련된 힐러진의 정성스러운 1:1 방문 케어 안내.`,
    /* 12 */ `${locationPrefix} 출장 아로마 마사지 24시 연중무휴 운영 ${shop.name}. 깊은 이완과 힐링을 선사하는 프리미엄 방문 테라피.`,
    /* 13 */ `${locationPrefix} 출장 스웨디시 마사지 및 출장 힐링 마사지 제휴 정보. ${shop.name}에서 제공하는 정직한 코스별 가격을 비교하세요.`,
    /* 14 */ `신속한 방문과 친절한 서비스! ${locationPrefix} 출장 타이 마사지 전문 ${shop.name}의 안심 후불제 프로그램을 만나보세요.`,
    /* 15 */ `${locationPrefix} 출장 힐링 마사지, 출장 아로마 마사지 인기 제휴점 ${shop.name}. 지친 몸과 마음에 편안한 쉼을 선물해 드립니다.`,
    /* 16 */ `${locationPrefix} 출장 릴렉스 마사지, 출장 스웨디시 케어 ${shop.name}. 선입금 없는 안전한 후불 시스템으로 부담 없이 이용하세요.`,
    /* 17 */ `${locationPrefix} 출장 타이 마사지 1:1 맞춤 방문 솔루션 ${shop.name}. 굳은 전신 근육을 시원하게 풀어주는 전문 힐링 프로그램.`,
    /* 18 */ `${locationPrefix} 출장 아로마 마사지 및 출장 힐링 마사지 가이드. ${shop.name}에서 투명하고 정직한 제휴 정보를 제공합니다.`,
    /* 19 */ `${locationPrefix} 출장 스웨디시 마사지 전문 ${shop.name}! 최고급 오일 테라피와 함께 온전한 휴식을 누려보세요.`,
    /* 20 */ `${locationPrefix} 출장 힐링 마사지, 출장 타이 마사지 제휴 안내 ${shop.name}. 24시간 언제든 빠르고 정확하게 연결해 드립니다.`,
    /* 21 */ `${locationPrefix} 출장 아로마 마사지, 출장 릴렉스 테라피 ${shop.name}. 프라이빗 맞춤 케어로 일상의 활력을 되찾아보세요.`,
    /* 22 */ `100% 후불제로 안전한 ${locationPrefix} 출장 타이 마사지 ${shop.name}. 출발 전 선입금을 절대 요구하지 않는 믿을 수 있는 제휴점.`,
    /* 23 */ `${locationPrefix} 출장 스웨디시 마사지, 출장 아로마 마사지 종합 안내. ${shop.name}의 합리적인 코스 요금을 지금 확인하세요.`,
    /* 24 */ `${locationPrefix} 출장 힐링 마사지 요금 및 예약 안내. ${shop.name}의 베테랑 테라피스트가 선사하는 고품격 방문 바디케어.`,
    /* 25 */ `${locationPrefix} 출장 타이 마사지 및 출장 힐링 마사지 우수 제휴 샵 ${shop.name}. 신속한 방문 배차로 만족도를 높여드립니다.`,
    /* 26 */ `${locationPrefix} 출장 아로마 마사지 전문 관리사 배정 ${shop.name}. 부드러운 림프 순환과 힐링을 위한 최적의 선택.`,
    /* 27 */ `케어나비 공식 ${locationPrefix} 출장 스웨디시 마사지 ${shop.name}. 쾌적하고 편안한 휴식 공간 제휴 정보를 전해드립니다.`,
    /* 28 */ `${locationPrefix} 출장 릴렉스 마사지, 출장 타이 마사지 제휴 프로그램. ${shop.name}과 함께 묵은 피로를 시원하게 날려버리세요.`,
    /* 29 */ `${locationPrefix} 출장 힐링 마사지 최종 이용 가이드 ${shop.name}. 100% 안심 후불제 시스템으로 편안하고 안전하게 이용하세요.`
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

export default async function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, dong, id } = resolvedParams;
  const shop = shopData[id] || shopData["1"];

  const cityText = city.toUpperCase() === "SEOUL" ? "서울" : city.toUpperCase() === "GYEONGGI" ? "경기" : "인천";
  const locationPrefix = `${cityText} ${district} ${dong}`;
  const displayShopTitle = `${locationPrefix} 출장 타이 마사지 · 출장 아로마 마사지 - ${shop.name}`;

  const jsonLd = {
    @context: "https://schema.org",
    @type: "HealthAndBeautyBusiness",
    name: displayShopTitle,
    description: shop.desc,
    telephone: shop.phone,
    url: `https://carenavi.netlify.app/${city}/${district}/${dong}/shop/${id}`,
    image: `https://carenavi.netlify.app${shop.image}`,
    address: {
      @type: "PostalAddress",
      addressRegion: locationPrefix,
      addressCountry: "KR"
    },
    priceRange: "$$"
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans pb-28">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-sky-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
              CN
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                케어나비 <span className="text-xs text-sky-600 font-semibold">CareNavi</span>
              </span>
            </div>
          </Link>
          
          <Link href="/" className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all">
            🏠 메인 홈으로
          </Link>
        </div>
      </header>

      {/* 경로 안내 브레드크럼 */}
      <nav className="bg-white border-b border-slate-200 py-3 px-4 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex items-center gap-2 uppercase tracking-wide font-medium">
          <Link href="/" className="text-sky-600 hover:underline">홈</Link>
          <span>&gt;</span>
          <span>{cityText}</span>
          <span>&gt;</span>
          <span>{district}</span>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">{dong}</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
        {/* 대표 비주얼 카드 */}
        <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img 
              src={shop.image} 
              alt={displayShopTitle} 
              className="w-full h-full object-cover filter brightness-[0.85]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <span className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
              ✨ {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10 bg-white rounded-t-3xl border-t border-slate-100">
            <div className="inline-block bg-sky-50 border border-sky-100 px-3 py-1 rounded-xl text-sky-700 text-xs font-bold">
              📍 위치: {locationPrefix} 인근 맞춤 방문 케어
            </div>

            <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">
              {displayShopTitle}
            </h1>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {shop.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-slate-700">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 상세 코스 및 요금 목록 */}
        <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-lg md:text-2xl font-black text-slate-900 mt-1">💎 {locationPrefix} 맞춤 정규 코스 및 요금 안내</h2>
          </div>

          <div className="space-y-6">
            {shop.courses.map((courseGroup, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-200 hover:border-sky-300 p-5 md:p-6 rounded-2xl space-y-4 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
                      {courseGroup.category}
                    </h3>
                    {courseGroup.badge && (
                      <span className="text-[10px] bg-sky-600 text-white font-black px-2 py-0.5 rounded-full">
                        {courseGroup.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {courseGroup.desc}
                </p>

                {/* 시간별 가격 리스트 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                  {courseGroup.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx}
                      className={`p-3.5 rounded-xl border flex justify-between items-center ${
                        item.recommend 
                          ? "bg-sky-50 border-sky-300 shadow-sm" 
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <span className="text-sky-600">⏱️</span> {item.time}
                      </span>
                      <span className="text-sm font-black text-sky-600">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 이용 안내사항 */}
        <section className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-sky-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> {dong} 방문 마사지 예약 안내
          </h3>
          <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
            <li>케어나비 제휴업체는 <strong>100% 후불제</strong> 시스템으로 운영됩니다. 출발 전 사전 선입금을 절대 요구하지 않습니다.</li>
            <li>{locationPrefix} 희망하시는 시간 20~30분 전에 미리 예약 문의 주시면 보다 신속하고 원활한 맞춤 테라피 매칭이 가능합니다.</li>
          </ul>
        </section>

      </main>

      {/* 하단 고정 전화/문자 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-3 md:p-4 shadow-lg">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a 
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-sm transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> 전화로 즉시예약
          </a>
          <a 
            href={`sms:${shop.phone}?body=${encodeURIComponent(`${displayShopTitle} 예약 문의드립니다. (케어나비 보고 연락드렸습니다)`)}`}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-3.5 rounded-2xl text-xs md:text-sm border border-slate-200 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>

    </div>
  );
}