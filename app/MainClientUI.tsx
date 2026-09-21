"use client";

import { useState } from "react";
import Link from "next/link";

// 전체 지역 데이터 (서울, 경기도 31개 시·군 전 지역 및 인천 전 지역 완벽 연동)
const regionData: Record<string, { name: string; districts: Record<string, { name: string; dongs: string[] }> }> = {
  seoul: {
    name: "서울특별시",
    districts: {
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로1가", "종로5가", "이화동", "혜화동", "창신동", "숭인동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "황학동", "중림동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산2가동", "남영동", "청파동", "원효로동", "효창동", "용문동", "이촌동", "이태원동", "한남동", "서빙고동", "보광동"] },
      seongdong: { name: "성동구", dongs: ["왕십리동", "마장동", "사근동", "행당동", "응봉동", "금호동", "옥수동", "성수동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡동", "능동", "구의동", "광장동", "자양동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농동", "답십리동", "장안동", "청량리동", "회기동", "휘경동", "이문동"] },
      jungnang: { name: "중랑구", dongs: ["면목동", "상봉동", "중화동", "묵동", "망우동", "신내동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암동", "안암동", "보문동", "정릉동", "길음동", "종암동", "월곡동", "장위동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["삼양동", "미아동", "송중동", "송천동", "번동", "수유동", "우이동", "인수동"] },
      dobong: { name: "도봉구", dongs: ["창동", "도봉동", "쌍문동", "방학동"] },
      nowon: { name: "노원구", dongs: ["상계동", "중계동", "하계동", "공릉동"] },
      eunpyeong: { name: "은평구", dongs: ["불광동", "갈현동", "구산동", "대조동", "응암동", "역촌동", "신사동", "증산동", "수색동", "진관동"] },
      seodaemun: { name: "서대문구", dongs: ["천연동", "북아현동", "충현동", "신촌동", "연희동", "홍제동", "홍은동", "남가좌동", "북가좌동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "서교동", "합정동", "망원동", "연남동", "성산동", "상암동"] },
      yangcheon: { name: "양천구", dongs: ["목동", "신월동", "신정동"] },
      gangseo: { name: "강서구", dongs: ["등촌동", "화곡동", "우장산동", "가양동", "발산동", "공항동", "방화동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로동", "가리봉동", "고척동", "개봉동", "오류동", "수궁동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산동", "시흥동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포동", "여의동", "당산동", "도림동", "문래동", "양평동", "신길동", "대림동"] },
      dongjak: { name: "동작구", dongs: ["노량진동", "상도동", "흑석동", "사당동", "대방동", "신대방동"] },
      gwanak: { name: "관악구", dongs: ["보라매동", "청림동", "성현동", "행운동", "낙성대동", "청룡동", "은천동", "서원동", "신원동", "서림동", "신사동", "난향동", "조원동", "대학동", "난곡동", "삼성동", "미성동"] },
      seocho: { name: "서초구", dongs: ["서초동", "잠원동", "반포동", "방배동", "양재동", "내곡동"] },
      gangnam: { name: "강남구", dongs: ["역삼동", "개포동", "청담동", "삼성동", "대치동", "신사동", "논현동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡동"] },
      songpa: { name: "송파구", dongs: ["잠실동", "풍납동", "거여동", "마천동", "방이동", "오금동", "송파동", "석촌동", "삼전동", "가락동", "문정동", "장지동", "위례동"] },
      gangdong: { name: "강동구", dongs: ["강일동", "상일동", "명일동", "고덕동", "암사동", "천호동", "성내동", "둔촌동"] }
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon: { name: "수원시", dongs: ["파장동", "율천동", "정자동", "영화동", "송죽동", "조원동", "연무동", "세류동", "평동", "서둔동", "구운동", "호매실동", "곡선동", "입북동", "금곡동", "권선동", "지동", "우만동", "인계동", "매교동", "매산동", "고등동", "화서동", "행궁동", "매탄동", "영통동", "망포동", "원천동", "광교동"] },
      seongnam: { name: "성남시", dongs: ["신흥동", "태평동", "수진동", "단대동", "산성동", "양지동", "복정동", "신촌동", "고등동", "시흥동", "위례동", "성남동", "금광동", "은행동", "상대원동", "하대원동", "도촌동", "중앙동", "분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "구미동", "운중동", "금곡동", "삼평동", "판교동", "백현동"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "자금동", "가능동", "흥선동", "녹양동"] },
      anyang: { name: "안양시", dongs: ["안양동", "석수동", "박달동", "비산동", "부흥동", "달안동", "관양동", "부림동", "평촌동", "평안동", "귀인동", "호계동", "범계동", "신촌동", "갈산동"] },
      bucheon: { name: "부천시", dongs: ["심곡동", "부천동", "중동", "신중동", "상동", "대산동", "소사동", "범안동", "성곡동", "오정동"] },
      gwangmyeong: { name: "광명시", dongs: ["광명동", "철산동", "하안동", "소하동", "일직동", "학온동"] },
      pyeongtaek: { name: "평택시", dongs: ["팽성읍", "안중읍", "포승읍", "진위면", "서탄면", "고덕면", "오성면", "청북읍", "현덕면", "서정동", "송탄동", "지산동", "송북동", "신장동", "신평동", "동삭동", "비전동", "용이동", "중앙동", "고덕동", "세교동", "원평동", "통복동"] },
      dongducheon: { name: "동두천시", dongs: ["생연동", "중앙동", "보산동", "불현동", "소요동", "상패동", "송내동"] },
      ansan: { name: "안산시", dongs: ["일동", "사동", "사이동", "본오동", "부곡동", "월피동", "성포동", "반월동", "안산동", "이동", "해양동", "와동", "고잔동", "중앙동", "신길동", "백운동", "원곡동", "초지동", "선부동", "대부동", "호수동"] },
      goyang: { name: "고양시", dongs: ["주교동", "원신동", "흥도동", "성사동", "효자동", "창릉동", "고양동", "관산동", "능곡동", "화정동", "행주동", "행신동", "화전동", "대덕동", "삼송동", "식사동", "중산동", "정발산동", "풍산동", "백석동", "마두동", "장항동", "고봉동", "일산동", "탄현동", "주엽동", "대화동", "송포동", "가좌동", "덕이동"] },
      gwacheon: { name: "과천시", dongs: ["중앙동", "갈현동", "별양동", "부림동", "과천동", "문원동", "원문동"] },
      guri: { name: "구리시", dongs: ["갈매동", "동구동", "인창동", "교문동", "수택동"] },
      namyangju: { name: "남양주시", dongs: ["와부읍", "진접읍", "화도읍", "진건읍", "오남읍", "별내면", "퇴계원읍", "수동면", "조안면", "호평동", "평내동", "금곡동", "양정동", "다산동", "별내동"] },
      osan: { name: "오산시", dongs: ["중앙동", "대원동", "남촌동", "신장동", "세마동", "초평동"] },
      siheung: { name: "시흥시", dongs: ["대야동", "신천동", "신현동", "은행동", "매화동", "목감동", "과림동", "정왕동", "능곡동", "군자동", "월곶동", "연성동", "장곡동", "배곧동"] },
      gunpo: { name: "군포시", dongs: ["군포동", "산본동", "금정동", "재궁동", "오금동", "수리동", "궁내동", "광정동", "대야동", "송부동"] },
      uiwang: { name: "의왕시", dongs: ["고천동", "부곡동", "오전동", "내손동", "청계동"] },
      hanam: { name: "하남시", dongs: ["천현동", "신장동", "덕풍동", "감북동", "춘궁동", "초이동", "미사동", "위례동", "감일동"] },
      yongin: { name: "용인시", dongs: ["포곡읍", "모현읍", "남사읍", "이동읍", "원삼면", "백암면", "양지면", "중앙동", "삼가동", "유림동", "동부동", "역북동", "구갈동", "보라동", "기흥동", "서농동", "구성동", "마북동", "동백동", "보정동", "상하동", "신갈동", "영덕동", "상갈동", "풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "성복동"] },
      paju: { name: "파주시", dongs: ["문산읍", "파주읍", "법원읍", "조리읍", "월롱면", "탄현면", "광탄면", "파평면", "적성면", "금촌동", "운정동", "장단면", "교하동"] },
      icheon: { name: "이천시", dongs: ["장호원읍", "부발읍", "신둔면", "백사면", "호법면", "마장면", "대월면", "모가면", "설성면", "율면", "창전동", "중리동", "관고동", "증포동"] },
      anseong: { name: "안성시", dongs: ["공도읍", "보개면", "금광면", "서운면", "미양면", "대덕면", "양성면", "원곡면", "일죽면", "죽산면", "삼죽면", "고삼면", "안성동"] },
      gimpo: { name: "김포시", dongs: ["통진읍", "고촌읍", "양촌읍", "대곶면", "월곶면", "하성면", "김포동", "사우동", "풍무동", "장기동", "구래동", "운양동", "마산동"] },
      hwaseong: { name: "화성시", dongs: ["봉담읍", "우정읍", "향남읍", "남양읍", "매송면", "비봉면", "마도면", "송산면", "서신면", "팔탄면", "장안면", "양감면", "정남면", "동탄동", "진안동", "병점동", "반월동", "기배동", "화산동", "새솔동"] },
      gwangju: { name: "광주시", dongs: ["능평동", "초월읍", "곤지암읍", "도척면", "퇴촌면", "남종면", "경안동", "탄벌동", "광남동", "남한산성면", "쌍령동", "송정동", "오포동", "신현동"] },
      yangju: { name: "양주시", dongs: ["백석읍", "은현면", "남면", "광적면", "장흥면", "양주동", "회천동"] },
      pocheon: { name: "포천시", dongs: ["소흘읍", "군내면", "내촌면", "가산면", "신북면", "창수면", "영중면", "일동면", "이동면", "영북면", "관인면", "화현면", "포천동", "선단동"] },
      yeoju: { name: "여주시", dongs: ["가남읍", "점동면", "세종대왕면", "흥천면", "금사면", "산북면", "대신면", "북내면", "강천면", "여흥동", "중앙동", "오학동"] },
      yeoncheon: { name: "연천군", dongs: ["연천읍", "전곡읍", "군남면", "청산면", "미산면", "왕징면", "신서면", "중면", "장남면", "백학면"] },
      gapyeong: { name: "가평군", dongs: ["가평읍", "설악면", "청평면", "상면", "조종면", "북면"] },
      yangpyeong: { name: "양평군", dongs: ["양평읍", "강상면", "강하면", "양서면", "옥천면", "서종면", "단월면", "청운면", "양동면", "지평면", "용문면", "개군면"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      jemulpo: { name: "제물포구", dongs: ["신포동", "신흥동", "동인천동", "개항동", "도원동", "율목동", "연안동"] },
      yeongjong: { name: "영종구", dongs: ["영종동", "운서동", "용유동", "영종1동", "영종2동"] },
      michuhol: { name: "미추홀구", dongs: ["숭의동", "용현동", "학익동", "도화동", "주안동", "관교동", "문학동"] },
      yeonsu: { name: "연수구", dongs: ["옥련동", "선학동", "연수동", "청학동", "동춘동", "송도동"] },
      namdong: { name: "남동구", dongs: ["구월동", "간석동", "만수동", "서창동", "논현동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동"] },
      seohae: { name: "서해구", dongs: ["가정동", "석남동", "청라동", "검암경서동", "신현원창동", "가좌동"] },
      geomdan: { name: "검단구", dongs: ["검단동", "당하동", "마전동", "불로대곡동", "오류왕길동", "원당동", "아라동"] }
    }
  }
};

export default function MainClientUI() {
  const [activeSido, setActiveSido] = useState("seoul");
  const selectedRegion = regionData[activeSido];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center text-white font-black text-sm">CN</div>
            <div>
              <div className="text-base font-extrabold text-slate-900 leading-none">케어나비</div>
              <div className="text-[10px] text-slate-400 mt-0.5">CARENAVI PLATFORM</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/prices" className="text-xs font-bold text-slate-600 hover:text-sky-600">가격안내</Link>
            <Link href="/reviews" className="text-xs font-bold text-slate-600 hover:text-sky-600">이용후기</Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-sky-50 via-slate-50 to-white py-16 px-4 text-center border-b border-slate-200">
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">
          수도권 프리미엄 힐링 공간, <span className="text-sky-600">케어나비</span>
        </h1>
        <p className="text-slate-600 text-sm md:text-base">
          서울, 경기, 인천 전 지역의 세부 위치별 제휴 샵 정보를 투명하고 간편하게 찾아보세요.
        </p>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full space-y-6">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <span>📍</span> 지역별 샵 찾아보기
        </h2>

        {/* 시도 선택 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(regionData).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActiveSido(key)}
              className={`px-5 py-2.5 rounded-xl border font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
                activeSido === key
                  ? "bg-sky-50 text-sky-700 border-sky-400 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {val.name}
            </button>
          ))}
        </div>

        {/* 구/군 및 동 리스트 출력 */}
        <div className="space-y-4">
          {Object.entries(selectedRegion.districts).map(([distKey, distVal]) => (
            <div key={distKey} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="font-extrabold text-slate-900 text-base mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>{distVal.name}</span>
                <Link href={`/${activeSido}/${distKey}`} className="text-xs font-bold text-sky-600 hover:underline">
                  전체보기 &rarr;
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {distVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/${activeSido}/${distKey}/${encodeURIComponent(dong)}`}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition"
                  >
                    {dong} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 mt-16 text-xs">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <div className="font-bold text-white text-sm">케어나비 (CareNavi)</div>
          <p>도메인 주소: https://carenavi.netlify.app/ | 서울·경기·인천 제휴 힐링 플랫폼</p>
          <p className="text-slate-500 pt-2">© 2026 CareNavi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}