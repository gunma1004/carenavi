"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationHeader() {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#08080a]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img 
            src="/logo.png" 
            alt="리추얼 로고" 
            className="w-9 h-9 rounded-xl object-cover border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform" 
          />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent leading-none">
              리추얼 <span className="text-xs text-amber-300/80 font-semibold tracking-normal">Ritual</span>
            </span>
          </div>
        </Link>

        {/* 데스크톱 메뉴 목록 */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-300">
          
          {/* 1. 서비스 */}
          <Link href="/services" className="hover:text-amber-400 transition-colors">
            서비스 안내
          </Link>

          {/* 2. 코스 & 가격 */}
          <Link href="/prices" className="hover:text-amber-400 transition-colors">
            코스&가격
          </Link>

          {/* 3. 힐링 여행지 */}
          <Link href="/travel" className="hover:text-amber-400 transition-colors">
            지역 힐링스팟
          </Link>

          {/* 4. 맛집 & 숙소 */}
          <Link href="/places" className="hover:text-amber-400 transition-colors">
            주변 제휴명소
          </Link>

          {/* 5. 지역별 안내 (드롭다운) */}
          <div 
            className="relative cursor-pointer py-2"
            onMouseEnter={() => setIsRegionOpen(true)}
            onMouseLeave={() => setIsRegionOpen(false)}
          >
            <button className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-bold text-gray-300">
              지역별 테라피
              <span className="text-[10px] text-amber-400">▼</span>
            </button>

            {isRegionOpen && (
              <div className="absolute top-full left-0 w-36 bg-[#121216] border border-amber-500/30 rounded-2xl shadow-2xl py-2 space-y-1 text-xs z-50 animate-in fade-in slide-in-from-top-1">
                <Link href="/location/seoul/서울특별시" className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400 transition-colors">
                  📍 서울 지역
                </Link>
                <Link href="/location/gyeonggi/경기도" className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400 transition-colors">
                  📍 경기 지역
                </Link>
                <Link href="/location/incheon/인천광역시" className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400 transition-colors">
                  📍 인천 지역
                </Link>
              </div>
            )}
          </div>

          {/* 6. 고객 후기 */}
          <Link href="/reviews" className="text-amber-400 font-extrabold hover:text-yellow-300 transition-colors flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
            <span>⭐</span> 생생후기
          </Link>

        </nav>

        {/* 우측 CTA & 모바일 토글 버튼 */}
        <div className="flex items-center gap-2">
          <a 
            href="tel:0507-1280-3344"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-2 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all active:scale-95"
          >
            📞 빠른 제휴/예약
          </a>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-amber-400 focus:outline-none"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-2 text-xs font-bold text-gray-300 px-2 pb-2">
          <Link 
            href="/services" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-neutral-800 hover:text-amber-400"
          >
            서비스 안내
          </Link>
          <Link 
            href="/prices" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-neutral-800 hover:text-amber-400"
          >
            코스&가격
          </Link>
          <div className="py-2 px-3 rounded-lg bg-neutral-900/50 space-y-1">
            <span className="text-gray-400 text-[11px]">지역별 바로가기</span>
            <div className="flex gap-2 pt-1">
              <Link 
                href="/location/seoul/서울특별시" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-1.5 bg-black/60 rounded-md border border-white/5 hover:text-amber-400 text-[11px]"
              >
                서울
              </Link>
              <Link 
                href="/location/gyeonggi/경기도" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-1.5 bg-black/60 rounded-md border border-white/5 hover:text-amber-400 text-[11px]"
              >
                경기
              </Link>
              <Link 
                href="/location/incheon/인천광역시" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-1.5 bg-black/60 rounded-md border border-white/5 hover:text-amber-400 text-[11px]"
              >
                인천
              </Link>
            </div>
          </div>
          <Link 
            href="/reviews" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 px-3 rounded-lg text-amber-400 bg-amber-500/10 border border-amber-500/30"
          >
            ⭐ 생생후기 보러가기
          </Link>
        </div>
      )}
    </header>
  );
}