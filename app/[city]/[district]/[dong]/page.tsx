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

// 🌟 동 단위 전용 대규모 SEO 조합 수식어 풀 (300개)
const dongModifiers = [
  '전문 힐링', '방문 릴렉스', '프라이빗 맞춤', '웰니스 바디', '케어 전신',
  '스웨디시 감성', '아로마 오일', '홈케어 맞춤', '럭셔리 스파', 'VIP 프리미엄',
  '안심 맞춤', '신속 방문', '소프트 릴렉싱', '딥티슈 바디', '커스텀 아로마',
  '스페셜 힐링', '피로해소 전신', '맞춤형 스웨디시', '힐링 가이드', '실속형 바디',
  '쾌적한 방문', '종합 웰니스', '최고급 감성', '프리미엄 홈케어', '전문 바디케어',
  '맞춤 테라피', '럭셔리 힐링', '1:1 프라이빗', '정통 스웨디시', '스페셜 아로마',
  '시원한', '편안한 릴렉스', '힐링 테라피스트', '전문 웰니스', '감성 스웨디시',
  '프리미엄 바디', '맞춤형 힐링', '신속한 홈케어', '고품격', '럭셔리 릴렉스',
  '프라이빗 힐링', '안심 방문', '전문 아로마', '스웨디시 테라피', '딥티슈 힐링',
  '맞춤형 케어', '피로회복 바디', '웰니스 스파', '커스텀', 'VIP 릴렉스',
  '스페셜 케어', '홈케어 힐링', '프리미엄 아로마', '정통 테라피', '감성',
  '쾌적한 힐링', '종합 테라피', '최고급 바디', '전문 릴렉싱', '맞춤 스웨디시',
  '럭셔리 테라피', '1:1 커스텀', '스웨디시 힐링', '아로마 릴렉스', '딥티슈',
  '맞춤형 테라피', '피로해소 힐링', '웰니스 테라피', '커스텀 릴렉스', 'VIP',
  '스페셜 테라피', '홈케어 바디', '프리미엄 테라피', '정통 힐링', '감성 릴렉스',
  '쾌적한 테라피', '종합 바디', '최고급 테라피', '전문 힐링케어', '맞춤 바디케어',
  '럭셔리', '프라이빗 테라피', '스웨디시', '아로마 테라피', '딥티슈 테라피',
  '맞춤형', '피로회복 테라피', '웰니스', '커스텀 테라피', 'VIP 힐링',
  '스페셜 바디', '홈케어 테라피', '프리미엄', '정통 바디', '감성 테라피',
  '쾌적한', '종합 힐링', '최고급 릴렉스', '전문 커스텀', '맞춤 프리미엄',
  // 101~200 추가 수식어
  '정직한 힐링', '깨끗한 바디', '상쾌한 릴렉스', '균형잡힌 테라피', '부드러운 케어',
  '집중 바디케어', '안정된 웰니스', '평온한 스파', '여유로운 힐링', '도심 속 릴렉스',
  '나만의 프라이빗', '맞춤형 힐러', '정성스런 케어', '섬세한 터치', '깊은 이완',
  '가벼운 몸만들기', '활력 충전소', '에너지 밸런스', '신선한 웰빙', '오롯한 휴식',
  '아늑한 스페이스', '청결한 환경', '믿을 수 있는', '투명한 안내', '고객 중심',
  '만족도 높은', '엄선된 테라피', '실속 만점', '프라임 힐링', '로얄 바디',
  '클래식 릴렉스', '시그니처 케어', '오리지널 테라피', '익스클루시브 바디', '하이엔드 웰니스',
  '컴포트 스파', '스위트 힐링', '이지 바디케어', '밸류 릴렉스', '토탈 웰니스',
  '베스트 테라피', '톱클래스 바디', '스마트 힐링', '디톡스 케어', '리프레시 바디',
  '내추럴 아로마', '퓨어 스웨디시', '오라 릴렉스', '젠 힐링', '소울 테라피',
  '바디 리셋', '컨디션 회복', '긴장 해소', '스트레스 완화', '피로 타파',
  '근육 이완', '혈액순환 돕기', '밸런스 케어', '토탈 리프레시', '스페셜 웰빙',
  '프리미엄 리셋', '럭셔리 리프레시', '프로페셔널 케어', '스페셜 리커버리', '딥 릴렉싱',
  '소프트 테라피', '내추럴 힐링', '순환 바디케어', '맞춤형 리셋', '토탈 힐링 스팟',
  '프라이빗 웰니스', '안심 케어 존', '힐링 테크닉', '바디 릴렉싱룸', '스파 앤 힐링',
  '웰니스 가이드', '테라피 큐레이션', '바디케어 센터', '릴렉스 스튜디오', '힐링 라운지',
  // 201~300 추가 수식어
  '알뜰한 힐링', '스마트 바디', '모던 테라피', '내추럴 웰니스', '퓨어 바디케어',
  '젠틀 릴렉스', '소프트 웰빙', '실속형 테라피', '알짜배기 힐링', '동네 맞춤',
  '우리동네 릴렉스', '생활밀착 웰니스', '데일리 바디', '이지 힐링', '스위트 테라피',
  '코지 바디케어', '포근한 릴렉스', '산뜻한 스파', '청량한 힐링', '가벼운 테라피',
  '프레시 바디', '클린 웰니스', '스페셜 릴렉싱', '딥 웰니스', '파워 테라피',
  '스피드 케어', '신속 힐링', '정확한 바디', '맞춤형 스팟', '로컬 웰니스',
  '지역 맞춤', '주민 안심', '프렌들리 힐링', '따뜻한 테라피', '포근한 바디',
  '아늑한 릴렉스', '조용한 스파', '독립된 힐링', '오붓한 테라피', '나만의 스팟',
  '시크릿 바디', '베일 웰니스', '특별한 케어', '유니크 힐링', '오리지널 바디',
  '클래식 웰니스', '모던 릴렉스', '트렌디 테라피', '스마트 케어', '프라임 바디',
  '그랜드 힐링', '노블 테라피', '엘리트 바디', '마스터 웰니스', '프로 릴렉스',
  '에이스 케어', '베스트 바디', '톱 힐링', '퍼펙트 테라피', '굿 바디케어',
  '나이스 웰니스', '해피 릴렉스', '조이 힐링', '스마일 테라피', '참 바디케어',
  '바른 웰니스', '올바른 릴렉스', '정성 힐링', '진심 테라피', '감동 바디',
  '최상급 웰니스', '초특급 릴렉스', '고급형 힐링', '실속형 테라피', '맞춤형 스튜디오',
  '전문가 케어', '숙련된 힐링', '베테랑 바디', '명품 웰니스', '최고 릴렉스',
  '알뜰 케어', '스마트 바디케어', '실속 웰니스', '경제적 힐링', '가성비 테라피'
];

// 🌟 동 단위 전용 대규모 SEO 조합 서비스 종류 풀 (150개)
const dongServiceTypes = [
  '마사지', '힐링 마사지', '아로마 마사지', '스웨디시 마사지', '전신 마사지',
  '바디 마사지', '맞춤 마사지', '프라이빗 마사지', '홈케어 마사지', '스파 마사지',
  '감성 마사지', '정통 마사지', '커스텀 마사지', '안심 마사지', '프리미엄 마사지',
  '릴렉싱 마사지', '웰니스 마사지', '딥티슈 마사지', 'VIP 마사지', '스페셜 마사지',
  '실속형 마사지', '종합 마사지', '최고급 마사지', '전문 마사지', '방문 마사지',
  '소프트 마사지', '오일 마사지', '케어 마사지', '토탈 마사지', '집중 마사지',
  '릴렉스 마사지', '테라피 마사지', '바디케어 마사지', '맞춤형 마사지', '고품격 마사지',
  '시원한 마사지', '피로회복 마사지', '근육이완 마사지', '밸런스 마사지', '활력 마사지',
  '부드러운 마사지', '향기 마사지', '스마트 마사지', '디톡스 마사지', '리프레시 마사지',
  '맞춤바디 마사지', '프라임 마사지', '로얄 마사지', '클래식 마사지', '시그니처 마사지',
  '오리지널 마사지', '익스클루시브 마사지', '럭셔리 마사지', '하이엔드 마사지', '컴포트 마사지',
  '스위트 마사지', '이지 마사지', '딥릴렉스 마사지', '밸류 마사지', '토탈바디 마사지',
  // 61~150 추가 서비스 종류
  '노블 마사지', '엘리트 마사지', '그랜드 마사지', '마스터 마사지', '시크릿 마사지',
  '오아시스 마사지', '유니크 마사지', '모던 마사지', '네이처 마사지', '퓨어 마사지',
  '제니스 마사지', '아펙스 마사지', '피크 마사지', '써밋 마사지', '인피니티 마사지',
  '센스 마사지', '하모니 마사지', '밸런스드 마사지', '스무스 마사지', '코지 마사지',
  '리커버리 마사지', '컨디셔닝 마사지', '리제너레이션 마사지', '리바이탈 마사지', '테라퓨틱 마사지',
  '헬스케어 마사지', '웰빙 마사지', '리프레싱 마사지', '수딩 마사지', '카밍 마사지',
  '레스트 마사지', '휴식 마사지', '안정 마사지', '이완 마사지', '순환 마사지',
  '스트레칭 마사지', '지압 마사지', '경락 마사지', '스포츠 마사지', '에스테틱 마사지',
  '데일리 마사지', '이지 마사지', '심플 마사지', '포커스 마사지', '타겟 마사지',
  '부스터 마사지', '에너지 마사지', '밸류 마사지', '실속 마사지', '알뜰 마사지',
  '베이직 마사지', '스탠다드 마사지', '프로페셔널 마사지', '익스퍼트 마사지', '스페셜티 마사지',
  '시그니처 마사지', '트렌디 마사지', '클래식 마사지', '레트로 마사지', '네오 마사지',
  '퓨전 마사지', '블렌드 마사지', '믹스 마사지', '하이브리드 마사지', '통합 마사지',
  '종합 테라피 마사지', '맞춤형 바디 마사지', '프리미엄 바디 마사지', '럭셔리 바디 마사지', 'VIP 바디 마사지',
  '스페셜 바디 마사지', '프로 바디 마사지', '마스터 바디 마사지', '닥터 마사지', '힐러 마사지',
  '케어러 마사지', '밸런스 마사지', '코디네이트 마사지', '컨디션 마사지', '리셋 마사지',
  '리커버 마사지', '리프레시 마사지', '릴렉싱 바디 마사지', '스무스 바디 마사지', '소프트 바디 마사지'
];

// 🌟 동 단위 전용 대규모 SEO 조합 상세 설명 풀 (100개)
const dongDescriptions = [
  '선입금 없는 100% 후불제 안전 시스템으로 편안한 휴식을 선사합니다.',
  '검증된 전문 관리사와 함께 지친 피로를 안전하게 날려보세요.',
  '품격 있는 1:1 커스텀 코스로 일상의 스트레스를 말끔히 해소해 드립니다.',
  '정직한 정찰제와 신속한 서비스로 안심하고 이용하실 수 있습니다.',
  '향기로운 아로마와 부드러운 터치로 나만의 프라이빗한 힐링을 경험하세요.',
  '이동의 불편함 없이 내 공간에서 누리는 럭셔리 힐링 타임.',
  '숙련된 힐러들의 세심하고 정성스러운 손길로 묵은 피로를 풀어드립니다.',
  '투명하고 정직한 요금 체계로 믿을 수 있는 프리미엄 서비스를 제공합니다.',
  '지친 몸과 마음에 활력을 불어넣어 주는 맞춤형 웰니스 솔루션.',
  '철저한 위생 관리와 고객 만족 중심의 고품격 케어를 만나보세요.',
  '빠르고 친절한 매칭 시스템으로 언제 어디서나 편안한 휴식을 누리세요.',
  '깊은 근육까지 시원하게 이완시켜 주는 전문 바디케어 서비스.',
  '일상에 지친 당신을 위한 단 하나의 안심 힐링 프로그램.',
  '체계적인 프로그램과 전문적인 터치로 최상의 만족도를 선사합니다.',
  '편안하고 아늑한 분위기 속에서 즐기는 프라이빗 테라피.',
  '불편한 곳을 정확하게 짚어주는 맞춤형 케어로 가벼운 몸을 되찾으세요.',
  '스트레스와 피로를 한 번에 날려버리는 프리미엄 케어 솔루션.',
  '엄선된 전문 관리사의 품격 있는 손길을 직접 경험해 보세요.',
  '믿을 수 있는 안전한 후불 시스템으로 편안하게 즐기는 힐링.',
  '지친 하루 끝에 찾아오는 완벽한 휴식과 안심 서비스를 만나보세요.',
  // 21~100 추가 설명
  '몸과 마음의 밸런스를 되찾아주는 전문적이고 체계적인 웰니스 프로그램.',
  '일상의 긴장을 풀고 온전한 평온함을 누릴 수 있는 특별한 힐링 공간.',
  '정성 어린 손길과 따뜻한 온기가 전해지는 고품격 바디 케어 솔루션.',
  '복잡한 생각을 내려놓고 오롯이 나에게 집중하는 재충전의 시간.',
  '엄선된 제휴 파트너들의 세심한 노하우로 완성되는 최상의 휴식.',
  '투명하고 정직한 정보 제공을 통해 신뢰할 수 있는 힐링 가이드.',
  '지친 근육을 부드럽게 이완시키고 활기찬 일상을 되찾아주는 코스.',
  '프라이빗하고 청결한 환경에서 누리는 고품격 테라피 서비스.',
  '내 몸의 소리에 귀 기울이며 건강한 아름다움을 가꾸는 웰빙 타임.',
  '언제나 친절하고 신속하게 고객의 피로 회복을 도와드리는 전문 안내.',
  '부드러운 오일과 섬세한 터칭이 어우러져 깊은 안정감을 주는 프로그램.',
  '현대인들의 만성적인 피로와 결림을 시원하게 해소해 주는 맞춤형 케어.',
  '합리적인 비용으로 즐기는 도심 속 오롯한 휴식과 힐링 테라피.',
  '신뢰할 수 있는 운영 원칙을 바탕으로 안전하고 편안한 이용 보장.',
  '지친 일상에 싱그러운 활력을 불어넣어 주는 산뜻한 웰니스 마사지.',
  '전문가의 손길로 전신 구석구석 묵은 피로를 말끔히 씻어내는 시간.',
  '아늑하고 편안한 분위기 속에서 만나는 고품격 바디 릴렉스 솔루션.',
  '개개인의 컨디션을 존중하며 맞춤형으로 진행되는 정성스러운 케어.',
  '지속적인 관리와 올바른 휴식을 통해 건강한 라이프스타일 제안.',
  '마음까지 편안해지는 은은한 향기와 함께 즐기는 프리미엄 테라피.',
  '복잡한 절차 없이 누구나 쉽고 편리하게 이용할 수 있는 투명한 시스템.',
  '소중한 나를 위한 가치 있는 투자, 온전한 쉼을 선물하는 프로그램.',
  '정교하고 숙련된 테크닉으로 일상의 무거움을 시원하게 날려버리는 코스.',
  '언제 방문해도 변함없는 쾌적함과 최고의 만족도를 선사하는 제휴 정보.',
  '지친 심신에 부드러운 위로를 건네는 따뜻하고 포근한 힐링 타임.',
  '체계적인 릴렉스 과정을 통해 몸의 가벼움과 활력을 되찾는 솔루션.',
  '엄격하게 검증된 우수 제휴 파트너들과 함께하는 안심 힐링 가이드.',
  '일상 속 작은 여유와 확실한 피로 회복을 동시에 챙기는 현명한 선택.',
  '깊은 이완을 통해 숙면과 컨디션 회복을 동시에 유도하는 맞춤 프로그램.',
  '케어나비가 자신 있게 추천하는 품격 있는 웰니스 마사지 힐링 스팟.',
  '동네 가까운 곳에서 손쉽게 찾아볼 수 있는 신뢰도 높은 제휴 정보.',
  '바쁜 일상 속에서도 잠시 여유를 갖고 재충전할 수 있는 웰빙 공간 안내.',
  '세심하고 다정한 케어를 통해 몸과 마음에 진정한 휴식을 안겨주는 코스.',
  '탁월한 전문성과 청결함을 바탕으로 최상의 만족감을 드리는 프로그램.',
  '지친 하루를 개운하게 마무리할 수 있도록 돕는 품격 있는 힐링 가이드.',
  '내 몸에 꼭 필요한 맞춤형 관리를 통해 건강한 활력을 되찾아보세요.',
  '언제 어디서나 안심하고 이용할 수 있는 투명한 제휴 시스템 안내.',
  '피로에 지친 현대인들을 위한 특별한 릴렉스 & 케어 솔루션.',
  '정성 가득한 손길로 전신을 부드럽게 이완시켜 주는 웰니스 테라피.',
  '완벽한 휴식과 품격 있는 관리를 동시에 누릴 수 있는 제휴 스팟.',
  '소중한 분과 함께 나누고 싶은 쾌적하고 편안한 힐링 테라피 정보.',
  '일상의 활력을 다시 채워주는 신선하고 산뜻한 바디 케어 프로그램.',
  '정직한 안내와 투명한 코스 구성으로 믿을 수 있는 웰빙 가이드.',
  '깊은 휴식과 개운함을 동시에 선사하는 프리미엄 바디 릴렉싱.',
  '전문가의 따뜻한 온기와 정성이 담긴 차별화된 맞춤형 케어 서비스.',
  '지친 몸의 긴장을 풀고 가벼운 발걸음으로 일상에 복귀하는 시간.',
  '마음의 안정과 신체의 이완을 동시에 도모하는 전문 웰니스 테라피.',
  '꼼꼼하고 세심한 프로그램 구성으로 언제나 만족스러운 힐링 타임.',
  '안전하고 쾌적한 환경에서 온전한 휴식의 가치를 느껴보세요.',
  '당신의 일상에 건강한 에너지와 편안함을 더해주는 특별한 제휴 샵.'
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const decodedDong = decodeURIComponent(dong);
  const locationKeyword = `${cityName} ${districtName} ${decodedDong}`;

  // 🌟 동 단위 전용 해시 시드 (구 단위와 절대 겹치지 않음, 브랜드명/샵명 제외)
  const seed = `${locationKeyword}-carenavi-dong-massive-mix-v3`;
  const charSum = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const modIdx = charSum % dongModifiers.length;
  const srvIdx = (charSum * 3) % dongServiceTypes.length;
  const descIdx = (charSum * 7) % dongDescriptions.length;

  const finalTitle = `${locationKeyword} ${dongModifiers[modIdx]} ${dongServiceTypes[srvIdx]}`;
  const finalDescription = `${locationKeyword} ${dongModifiers[modIdx]} ${dongServiceTypes[srvIdx]}. ${dongDescriptions[descIdx]}`;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: `https://carenavi.netlify.app/${city}/${district}/${dong}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://carenavi.netlify.app/${city}/${district}/${dong}`,
      siteName: "케어나비 (CareNavi)",
      locale: "ko_KR",
      type: "website",
      images: [{ url: "/og-main.png", width: 1200, height: 630, alt: `${locationKeyword} 케어나비` }],
    },
  };
}

export default async function DongPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const districtName = districtInfo ? districtInfo.name : district;
  const decodedDong = decodeURIComponent(dong);
  const fullTitle = `${cityName} ${districtName} ${decodedDong}`;

  const shops = [
    { id: 1, name: `✨ ${fullTitle} 제휴 한국골든테라피`, desc: "고품격 릴렉싱 & 딥티슈 피로회복! 전문 테라피스트의 품격 있는 1:1 맞춤 마사지 케어", phone: "0507-1280-3361", price: "맞춤 코스별 상이", image: "/shop1.jpg" },
    { id: 2, name: `🌸 ${fullTitle} 제휴 한국미인테라피`, desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디마사지 프로그램", phone: "0507-1280-3303", price: "맞춤 코스별 상이", image: "/shop2.jpg" },
    { id: 3, name: `💎 ${fullTitle} 제휴 주주테라피`, desc: "재방문율 높은 만족도! 철저한 위생 관리와 프라이빗 힐링 바디마사지 서비스 제공", phone: "0507-1280-3193", price: "맞춤 코스별 상이", image: "/shop3.jpg" },
    { id: 4, name: `👑 ${fullTitle} 제휴 퀸즈홈테라피`, desc: "품격 있게 누리는 홈케어! 전문 힐러들의 체형 맞춤형 피로회복 특화 마사지 프로그램", phone: "0507-1280-3334", price: "맞춤 코스별 상이", image: "/shop4.jpg" },
    { id: 5, name: `🌙 ${fullTitle} 제휴 오늘밤테라피`, desc: "엄선된 우수 제휴점! 수도권 전지역 쾌적하고 편안한 방문 힐링 마사지", phone: "0507-1280-3223", price: "맞춤 코스별 상이", image: "/shop5.jpg" }
  ];

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
          <h1 className="text-2xl md:text-4xl font-black">{fullTitle} 프리미엄 힐링 마사지 테라피 안내</h1>
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
                    {lShop.name}
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