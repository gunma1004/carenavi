"use client";

import { useEffect, useState } from "react";

interface Props {
  locationText: string;
}

export default function ClientTextMixer({ locationText }: Props) {
  const [headline, setHeadline] = useState(`${locationText} 방문 힐링 바디케어 서비스`);
  const [subText, setSubText] = useState("선입금 없는 100% 안심 후불제 시스템");

  useEffect(() => {
    // 클라이언트 마운트 시 세련된 출장 회피 문구 및 프리미엄 테라피 키워드로 자연스럽게 전환
    setHeadline(`${locationText} 출장 힐링 마사지 & 출장 릴렉스 테라피`);
    setSubText("수도권 평균 25분 내 빠른 방문 · 100% 안심 후불제 시스템");
  }, [locationText]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 p-4 md:p-5 rounded-2xl text-center shadow-[0_0_20px_rgba(245,158,11,0.08)]">
      {/* 상단 실시간 안내 뱃지 */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 text-[11px] font-bold text-amber-400 mb-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        실시간 {locationText} 리추얼 테라피스트 대기중
      </div>

      {/* 핵심 키워드 헤드라인 */}
      <h2 className="text-sm md:text-base font-extrabold text-amber-300 tracking-tight">
        ✨ {headline}
      </h2>

      {/* 신뢰도 제공 서브 카피 */}
      <p className="text-[11px] md:text-xs text-gray-400 mt-1 font-medium">
        {subText}
      </p>
    </div>
  );
}