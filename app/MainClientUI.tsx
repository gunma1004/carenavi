"use client";

import { useState } from "react";
import Link from "next/link";

// 전체 지역 데이터
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
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자동", "영화동", "송죽동", "조원동", "율천동"] },
      suwon_yeongtong: { name: "수원시 영통구", dongs: ["매탄동", "원천동", "영통동", "망포동", "광교동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "금곡동", "구미동", "판교동", "백현동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산동", "정발산동", "백석동", "마두동", "장항동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "성복동"] },
      anyang: { name: "안양시", dongs: ["안양동", "석수동", "박달동", "비산동", "평촌동", "호계동"] },
      bucheon: { name: "부천시", dongs: ["심곡동", "중동", "상동", "소사동", "오정동"] },
      ansan: { name: "안산시", dongs: ["일동", "사동", "본오동", "고잔동", "초지동", "선부동"] },
      pyeongtaek: { name: "평택시", dongs: ["팽성읍", "포승읍", "고덕면", "서정동", "비전동"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      junggu: { name: "중구", dongs: ["신포동", "신흥동", "동인천동", "영종동", "운서동"] },
      michuhol: { name: "미추홀구", dongs: ["숭의동", "용현동", "학익동", "도화동", "주안동", "관교동", "문학동"] },
      yeonsu: { name: "연수구", dongs: ["옥련동", "선학동", "연수동", "청학동", "동춘동", "송도동"] },
      namdong: { name: "남동구", dongs: ["구월동", "간석동", "만수동", "서창동", "논현동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동"] },
      seogu: { name: "서구", dongs: ["연희동", "가정동", "석남동", "청라동", "검단동", "아라동"] }
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