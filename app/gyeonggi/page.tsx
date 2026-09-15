import Link from 'next/link';

// 경기도 주요 시·군 및 세부 동/읍/면 데이터 전체 연동
const gyeonggiDistricts = {
  suwon: { 
    name: "수원시", 
    dongs: ["파장동", "율천동", "정자동", "영화동", "송죽동", "조원동", "연무동", "세류동", "평동", "서둔동", "구운동", "호매실동", "곡선동", "입북동", "금곡동", "권선동", "지동", "우만동", "인계동", "매교동", "매산동", "고등동", "화서동", "행궁동", "매탄동", "영통동", "망포동", "원천동", "광교동"] 
  },
  seongnam: { 
    name: "성남시", 
    dongs: ["신흥동", "태평동", "수진동", "단대동", "산성동", "양지동", "복정동", "신촌동", "고등동", "시흥동", "위례동", "성남동", "금광동", "은행동", "상대원동", "하대원동", "도촌동", "중앙동", "분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "구미동", "운중동", "금곡동", "삼평동", "판교동", "백현동"] 
  },
  uijeongbu: { 
    name: "의정부시", 
    dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "자금동", "가능동", "흥선동", "녹양동"] 
  },
  anyang: { 
    name: "안양시", 
    dongs: ["안양동", "석수동", "박달동", "비산동", "부흥동", "달안동", "관양동", "부림동", "평촌동", "평안동", "귀인동", "호계동", "범계동", "신촌동", "갈산동"] 
  },
  bucheon: { 
    name: "부천시", 
    dongs: ["심곡동", "부천동", "중동", "신중동", "상동", "대산동", "소사동", "범안동", "성곡동", "오정동"] 
  },
  gwangmyeong: { 
    name: "광명시", 
    dongs: ["광명동", "철산동", "하안동", "소하동", "일직동", "학온동"] 
  },
  pyeongtaek: { 
    name: "평택시", 
    dongs: ["팽성읍", "안중읍", "포승읍", "진위면", "서탄면", "고덕면", "오성면", "청북읍", "현덕면", "서정동", "송탄동", "지산동", "송북동", "신장동", "신평동", "동삭동", "비전동", "용이동", "중앙동", "고덕동", "세교동", "원평동", "통복동"] 
  },
  dongducheon: { 
    name: "동두천시", 
    dongs: ["생연동", "중앙동", "보산동", "불현동", "소요동", "상패동", "송내동"] 
  },
  ansan: { 
    name: "안산시", 
    dongs: ["일동", "사동", "사이동", "본오동", "부곡동", "월피동", "성포동", "반월동", "안산동", "이동", "해양동", "와동", "고잔동", "중앙동", "신길동", "백운동", "원곡동", "초지동", "선부동", "대부동", "호수동"] 
  },
  goyang: { 
    name: "고양시", 
    dongs: ["주교동", "원신동", "흥도동", "성사동", "효자동", "창릉동", "고양동", "관산동", "능곡동", "화정동", "행주동", "행신동", "화전동", "대덕동", "삼송동", "식사동", "중산동", "정발산동", "풍산동", "백석동", "마두동", "장항동", "고봉동", "일산동", "탄현동", "주엽동", "대화동", "송포동", "가좌동", "덕이동"] 
  },
  gwacheon: { 
    name: "과천시", 
    dongs: ["중앙동", "갈현동", "별양동", "부림동", "과천동", "문원동", "원문동"] 
  },
  guri: { 
    name: "구리시", 
    dongs: ["갈매동", "동구동", "인창동", "교문동", "수택동"] 
  },
  namyangju: { 
    name: "남양주시", 
    dongs: ["와부읍", "진접읍", "화도읍", "진건읍", "오남읍", "별내면", "퇴계원읍", "수동면", "조안면", "호평동", "평내동", "금곡동", "양정동", "다산동", "별내동"] 
  },
  osan: { 
    name: "오산시", 
    dongs: ["중앙동", "대원동", "남촌동", "신장동", "세마동", "초평동"] 
  },
  siheung: { 
    name: "시흥시", 
    dongs: ["대야동", "신천동", "신현동", "은행동", "매화동", "목감동", "과림동", "정왕동", "능곡동", "군자동", "월곶동", "연성동", "장곡동", "배곧동"] 
  },
  gunpo: { 
    name: "군포시", 
    dongs: ["군포동", "산본동", "금정동", "재궁동", "오금동", "수리동", "궁내동", "광정동", "대야동", "송부동"] 
  },
  uiwang: { 
    name: "의왕시", 
    dongs: ["고천동", "부곡동", "오전동", "내손동", "청계동"] 
  },
  hanam: { 
    name: "하남시", 
    dongs: ["천현동", "신장동", "덕풍동", "감북동", "춘궁동", "초이동", "미사동", "위례동", "감일동"] 
  },
  yongin: { 
    name: "용인시", 
    dongs: ["포곡읍", "모현읍", "남사읍", "이동읍", "원삼면", "백암면", "양지면", "중앙동", "삼가동", "유림동", "동부동", "역북동", "구갈동", "보라동", "기흥동", "서농동", "구성동", "마북동", "동백동", "보정동", "상하동", "신갈동", "영덕동", "상갈동", "풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "성복동"] 
  },
  paju: { 
    name: "파주시", 
    dongs: ["문산읍", "파주읍", "법원읍", "조리읍", "월롱면", "탄현면", "광탄면", "파평면", "적성면", "금촌동", "운정동", "장단면", "교하동"] 
  },
  icheon: { 
    name: "이천시", 
    dongs: ["장호원읍", "부발읍", "신둔면", "백사면", "호법면", "마장면", "대월면", "모가면", "설성면", "율면", "창전동", "중리동", "관고동", "증포동"] 
  },
  anseong: { 
    name: "안성시", 
    dongs: ["공도읍", "보개면", "금광면", "서운면", "미양면", "대덕면", "양성면", "원곡면", "일죽면", "죽산면", "삼죽면", "고삼면", "안성동"] 
  },
  gimpo: { 
    name: "김포시", 
    dongs: ["통진읍", "고촌읍", "양촌읍", "대곶면", "월곶면", "하성면", "김포동", "사우동", "풍무동", "장기동", "구래동", "운양동", "마산동"] 
  },
  hwaseong: { 
    name: "화성시", 
    dongs: ["봉담읍", "우정읍", "향남읍", "남양읍", "매송면", "비봉면", "마도면", "송산면", "서신면", "팔탄면", "장안면", "양감면", "정남면", "동탄동", "진안동", "병점동", "반월동", "기배동", "화산동", "새솔동"] 
  },
  gwangju: { 
    name: "광주시", 
    dongs: ["능평동", "초월읍", "곤지암읍", "도척면", "퇴촌면", "남종면", "경안동", "탄벌동", "광남동", "남한산성면", "쌍령동", "송정동", "오포동", "신현동"] 
  },
  yangju: { 
    name: "양주시", 
    dongs: ["백석읍", "은현면", "남면", "광적면", "장흥면", "양주동", "회천동"] 
  },
  pocheon: { 
    name: "포천시", 
    dongs: ["소흘읍", "군내면", "내촌면", "가산면", "신북면", "창수면", "영중면", "일동면", "이동면", "영북면", "관인면", "화현면", "포천동", "선단동"] 
  },
  yeoju: { 
    name: "여주시", 
    dongs: ["가남읍", "점동면", "세종대왕면", "흥천면", "금사면", "산북면", "대신면", "북내면", "강천면", "여흥동", "중앙동", "오학동"] 
  },
  yeoncheon: { 
    name: "연천군", 
    dongs: ["연천읍", "전곡읍", "군남면", "청산면", "미산면", "왕징면", "신서면", "중면", "장남면", "백학면"] 
  },
  gapyeong: { 
    name: "가평군", 
    dongs: ["가평읍", "설악면", "청평면", "상면", "조종면", "북면"] 
  },
  yangpyeong: { 
    name: "양평군", 
    dongs: ["양평읍", "강상면", "강하면", "양서면", "옥천면", "서종면", "단월면", "청운면", "양동면", "지평면", "용문면", "개군면"] 
  }
};

export default function GyeonggiRegionPage() {
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
          <span>경기 지역 안내</span>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-2 inline-block">
            경기도 제휴 샵 안내
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            경기 시·군·구 전체 지역별 프리미엄 힐링 테라피
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            경기도 전 지역의 세부 동·읍·면별 제휴 정보를 편리하게 확인하세요.
          </p>
        </div>

        {/* 경기도 전체 시·군 렌더링 */}
        <div className="space-y-6">
          {Object.entries(gyeonggiDistricts).map(([districtKey, districtVal]) => (
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
                    href={`/gyeonggi/${districtKey}/${dong}/shop/1`}
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
        <p className="mt-1">도메인: https://carenavi.netlify.app/gyeonggi/</p>
      </footer>
    </main>
  );
}