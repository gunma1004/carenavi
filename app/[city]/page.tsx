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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const region = regionDetails[resolvedParams.city] || regionDetails["seoul"];

  return {
    title: `${region.name} 출장 마사지·홈타이 지역별 안내 | 케어나비`,
    description: `${region.desc}. 선입금 없는 100% 후불제 안심 제휴 정보를 확인하세요.`,
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