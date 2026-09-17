import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

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

// 🌟 대규모 SEO 조합 키워드 풀 (100개 수식어)
const modifiers = [
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
  '쾌적한', '종합 힐링', '최고급 릴렉스', '전문 커스텀', '맞춤 프리미엄'
];

// 🌟 대규모 서비스 종류 풀 (60개)
const serviceTypes = [
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
  '스위트 마사지', '이지 마사지', '딥릴렉스 마사지', '밸류 마사지', '토탈바디 마사지'
];

// 🌟 대규모 설명 풀 (20개)
const descriptions = [
  '선입금 없는 100% 후불제 안전 시스템으로 편안한 휴식을 선사합니다.',
  '검증된 전문 관리사와 함께 지친 피로를 안전하게 날려보세요.',
  '품격 있는 1:1 커스텀 코스로 일상의 스트레스를 말끔히 해소해 드립니다.',
  '정직한 정찰제와 신속한 방문 서비스로 안심하고 이용하실 수 있습니다.',
  '향기로운 아로마와 부드러운 터치로 나만의 프라이빗한 힐링을 경험하세요.',
  '이동의 불편함 없이 내 공간에서 누리는 럭셔리 힐링 타임.',
  '숙련된 힐러들의 세심하고 정성스러운 손길로 묵은 피로를 풀어드립니다.',
  '투명하고 정직한 요금 체계로 믿을 수 있는 프리미엄 방문 서비스를 제공합니다.',
  '지친 몸과 마음에 활력을 불어넣어 주는 맞춤형 웰니스 솔루션.',
  '철저한 위생 관리와 고객 만족 중심의 고품격 케어를 만나보세요.',
  '빠르고 친절한 매칭 시스템으로 언제 어디서나 편안한 휴식을 누리세요.',
  '깊은 근육까지 시원하게 이완시켜 주는 전문 바디케어 서비스.',
  '일상에 지친 당신을 위한 단 하나의 안심 홈케어 힐링 프로그램.',
  '체계적인 프로그램과 전문적인 터치로 최상의 만족도를 선사합니다.',
  '편안하고 아늑한 분위기를 집에서 그대로 즐기는 프라이빗 테라피.',
  '불편한 곳을 정확하게 짚어주는 맞춤형 케어로 가벼운 몸을 되찾으세요.',
  '스트레스와 피로를 한 번에 날려버리는 프리미엄 방문 케어 솔루션.',
  '엄선된 전문 관리사의 품격 있는 손길을 직접 경험해 보세요.',
  '믿을 수 있는 안전한 후불 시스템으로 편안하게 즐기는 힐링.',
  '지친 하루 끝에 찾아오는 완벽한 휴식과 안심 방문 서비스.'
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const region = regionDetails[resolvedParams.city] || regionDetails["seoul"];

  // 🌟 해시 기반 고유 인덱스 추출 (수만 가지 조합 보장)
  const seed = `${region.name}-carenavi-city-mix-v2`;
  const charSum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const modIdx = charSum % modifiers.length;
  const srvIdx = (charSum * 3) % serviceTypes.length;
  const descIdx = (charSum * 7) % descriptions.length;

  const finalTitle = `${region.name} ${modifiers[modIdx]} ${serviceTypes[srvIdx]}`;
  const finalDescription = `${region.name} ${region.desc}. ${modifiers[modIdx]} ${serviceTypes[srvIdx]}. ${descriptions[descIdx]}`;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: `https://carenavi.netlify.app/${resolvedParams.city}/`,
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
            {region.name} 제휴 샵 안내
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            {region.name} 지역별 프리미엄 힐링 테라피
          </h1>
          <p className="text-slate-600 text-sm md:text-base">{region.desc}</p>
        </div>

        <div className="space-y-6">
          {Object.entries(region.districts).map(([distKey, distVal]) => (
            <div key={distKey} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <Link href={`/${cityKey}/${distKey}`} className="text-lg font-bold text-slate-900 hover:text-sky-600 transition flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  {distVal.name} 전체보기 &rarr;
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