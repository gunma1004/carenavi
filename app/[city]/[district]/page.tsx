import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
  }>;
}

// 구별 상세 데이터 샘플
const districtDetails: Record<string, { name: string; city: string; cityName: string; dongs: string[] }> = {
  gangnam: { name: "강남구", city: "seoul", cityName: "서울특별시", dongs: ["역삼1동", "역삼2동", "청담동", "삼성1동", "삼성2동", "대치1동", "대치2동", "신사동", "논현1동", "논현2동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡1동", "도곡2동"] },
  seocho: { name: "서초구", city: "seoul", cityName: "서울특별시", dongs: ["서초1동", "서초2동", "서초3동", "서초4동", "잠원동", "반포1동", "반포2동", "방배본동", "방배1동", "양재1동", "내곡동"] },
  mapo: { name: "마포구", city: "seoul", cityName: "서울특별시", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "서교동", "합정동", "망원1동", "연남동", "상암동"] },
  songpa: { name: "송파구", city: "seoul", cityName: "서울특별시", dongs: ["잠실본동", "잠실2동", "잠실3동", "방이1동", "방이2동", "오금동", "석촌동", "삼전동", "가락1동", "문정1동"] },
  seongnam_bundang: { name: "성남시 분당구", city: "gyeonggi", cityName: "경기도", dongs: ["분당동", "수내1동", "수내2동", "정자동", "서현1동", "서현2동", "이매1동", "야탑1동", "금곡동", "구미동", "판교동", "백현동"] },
  namdong: { name: "남동구", city: "incheon", cityName: "인천광역시", dongs: ["구월1동", "구월2동", "구월3동", "간석1동", "간석2동", "만수1동", "만수2동", "서창2동", "논현1동", "논현2동"] }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const dist = districtDetails[resolvedParams.district] || { name: "상세 지역", cityName: "수도권" };

  return {
    title: `${dist.cityName} ${dist.name} 출장 마사지·홈타이 지역별 안내 | 케어나비`,
    description: `${dist.cityName} ${dist.name} 전 지역 100% 후불제 안심 방문 테라피 제휴 샵 정보 및 코스 가격 안내.`,
    alternates: {
      canonical: `https://carenavi.netlify.app/${resolvedParams.city}/${resolvedParams.district}/`,
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;
  const dist = districtDetails[district] || { name: "상세 지역", cityName: "수도권", dongs: ["중심가1동", "중심가2동"] };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-sky-600">
            케어나비 (CareNavi)
          </Link>
          <Link href={`/${city}`} className="text-sm text-slate-500 hover:text-slate-800">
            &larr; {dist.cityName} 목록으로
          </Link>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200 py-3 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-sky-600 hover:underline">홈</Link>
          <span>&gt;</span>
          <Link href={`/${city}`} className="text-sky-600 hover:underline">{dist.cityName}</Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">{dist.name}</span>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto py-10 px-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-2 inline-block">
              {dist.cityName} {dist.name} 전담 방문 케어
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              {dist.name} 출장 마사지 · 홈타이 지역별 안내
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {dist.cityName} {dist.name} 전 지역에서 100% 후불제로 안전하게 이용하실 수 있는 프리미엄 힐링 테라피 제휴 샵 안내입니다. 원하시는 동을 선택하여 상세 코스와 가격을 확인하세요.
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl text-xs md:text-sm text-sky-900 font-medium">
            💰 <strong>{dist.name} 기준 안내:</strong> 건식/타이 6만원부터 · 아로마/스웨디시 7만원부터 투명하게 제공됩니다.
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              {dist.name} 세부 동별 샵 바로가기
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {dist.dongs.map((dong, idx) => (
                <Link
                  key={idx}
                  href={`/${city}/${district}/${dong}/shop/1`}
                  className="p-3 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-2xl text-center transition group"
                >
                  <strong className="block text-sm font-extrabold text-slate-900 group-hover:text-sky-600">{dong}</strong>
                  <span className="text-[11px] text-slate-500">예약 및 가격 보기</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}