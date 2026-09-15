import Link from 'next/link';

// 인천광역시 주요 구·군 및 세부 동/면 데이터 전체 연동
const incheonDistricts = {
  junggu: { 
    name: "중구", 
    dongs: ["연안동", "신포동", "신흥동", "도원동", "율목동", "동인천동", "영종동", "용유동", "운서동", "개항동"] 
  },
  donggu: { 
    name: "동구", 
    dongs: ["만석동", "화수동", "송현동", "송림동", "금창동"] 
  },
  michuholgu: { 
    name: "미추홀구", 
    dongs: ["숭의동", "용현동", "학익동", "도화동", "주안동", "관교동", "문학동"] 
  },
  yeonsugu: { 
    name: "연수구", 
    dongs: ["옥련동", "선학동", "연수동", "청학동", "동춘동", "송도동"] 
  },
  namdonggu: { 
    name: "남동구", 
    dongs: ["구월동", "간석동", "만수동", "서창동", "남촌도림동", "논현동", "논현고잔동", "장수서창동"] 
  },
  bupyeonggu: { 
    name: "부평구", 
    dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동", "일신동", "십정동"] 
  },
  gyeyanggu: { 
    name: "계양구", 
    dongs: ["효성동", "계산동", "작전동", "작전서운동", "계양동"] 
  },
  seogu: { 
    name: "서구", 
    dongs: ["연희동", "가정동", "석남동", "가좌동", "불로대곡동", "원당동", "신현원창동", "청라동", "검단동", "아라동", "당하동", "오류왕길동", "마전동", "검암경서동"] 
  },
  ganghwagun: { 
    name: "강화군", 
    dongs: ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"] 
  },
  ongjingun: { 
    name: "옹진군", 
    dongs: ["북도면", "연평면", "백령면", "대청면", "덕적면", "자월면", "영흥면"] 
  }
};

export default function IncheonRegionPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
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
          <span>인천 지역 안내</span>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-2 inline-block">
            인천광역시 제휴 샵 안내
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            인천 구·군 전체 지역별 프리미엄 힐링 테라피
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            인천 전 지역의 세부 동·면별 제휴 정보를 편리하게 확인하세요.
          </p>
        </div>

        {/* 인천 전체 구·군 렌더링 */}
        <div className="space-y-6">
          {Object.entries(incheonDistricts).map(([districtKey, districtVal]) => (
            <div key={districtKey} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  {districtVal.name}
                </h2>
                <span className="text-xs text-slate-400">{districtVal.dongs.length}개 지역 등록</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {districtVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/incheon/${districtKey}/${dong}/shop/1`}
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

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-400 mt-20">
        <p>© 2026 CareNavi. All rights reserved.</p>
        <p className="mt-1">도메인: https://carenavi.netlify.app/incheon/</p>
      </footer>
    </main>
  );
}