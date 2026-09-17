import datetime
import urllib.parse
import os

def generate_sitemap():
    base_url = "https://carenavi.netlify.app"
    today = datetime.date.today().isoformat()
    
    url_entries = []

    # 1. 메인 홈 페이지
    url_entries.append({
        "loc": base_url,
        "priority": "1.0",
        "changefreq": "daily"
    })

    # 2. 상단 카테고리 메인 페이지
    categories = ['services', 'prices', 'travel', 'places', 'reviews']
    for cat in categories:
        url_entries.append({
            "loc": f"{base_url}/{cat}",
            "priority": "0.8",
            "changefreq": "weekly"
        })

    # 3. 서울·경기·인천 주요 구 및 세부 동 데이터 구조
    region_data = {
        "seoul": {
            "jongno": ["효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로1.2.3.4가동", "종로5.6가동", "이화동", "혜화동", "창신1동", "창신2동", "창신3동", "숭인1동", "숭인2동"],
            "jung": ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "동화동", "황학동", "중림동"],
            "yongsan": ["후암동", "용산2가동", "남영동", "청파동", "원효로1동", "원효로2동", "효창동", "용문동", "이촌1동", "이촌2동", "이태원1동", "이태원2동", "한남동", "서빙고동", "보광동"],
            "gangnam": ["역삼1동", "역삼2동", "청담동", "삼성1동", "삼성2동", "대치1동", "대치2동", "신사동", "논현1동", "논현2동", "압구정동"],
            "seocho": ["서초1동", "서초2동", "서초3동", "잠원동", "반포1동", "방배본동", "방배1동", "양재1동"],
            "mapo": ["공덕동", "아현동", "도화동", "서교동", "합정동", "망원1동", "연남동", "상암동"],
            "songpa": ["잠실본동", "잠실2동", "잠실3동", "방이1동", "방이2동", "오금동", "석촌동", "가락1동", "문정1동"]
        },
        "gyeonggi": {
            "suwon_jangan": ["파장동", "정자1동", "정자2동", "영화동", "송죽동", "조원1동"],
            "seongnam_bundang": ["분당동", "수내1동", "정자동", "서현1동", "이매1동", "야탑1동", "삼평동", "백현동"],
            "goyang_ilsandong": ["식사동", "중산1동", "정발산동", "백석1동", "마두1동", "장항1동"],
            "yongin_suji": ["풍덕천1동", "신봉동", "죽전1동", "동천동", "상현1동", "성복동"]
        },
        "incheon": {
            "namdong": ["구월1동", "구월2동", "간석1동", "만수1동", "서창2동", "논현1동"],
            "bupyeong": ["부평1동", "부평2동", "산곡1동", "청천1동", "갈산1동", "삼산1동"],
            "yeonsu": ["옥련1동", "선학동", "연수1동", "청학동", "동춘1동", "송도1동", "송도2동"]
        }
    }

    shop_ids = ["1", "2", "3", "4", "5"]

    # 4. 구, 동, 그리고 각 단계별 샵 상세 페이지까지 모두 순회하며 추가
    for city, districts in region_data.items():
        for district, dongs in districts.items():
            # 4-1. 구 단위 랜딩 페이지
            url_entries.append({
                "loc": f"{base_url}/{city}/{district}",
                "priority": "0.9",
                "changefreq": "daily"
            })

            # 4-2. 구 단위 하위 샵 상세 페이지
            for s_id in shop_ids:
                url_entries.append({
                    "loc": f"{base_url}/{city}/{district}/shop/{s_id}",
                    "priority": "0.8",
                    "changefreq": "weekly"
                })

            # 4-3. 동 단위 상세 페이지 및 동 하위 샵 페이지
            for dong in dongs:
                encoded_dong = urllib.parse.quote(dong)
                
                # 동 단위 랜딩 페이지 (예: /seoul/jongno/효자동)
                url_entries.append({
                    "loc": f"{base_url}/{city}/{district}/{encoded_dong}",
                    "priority": "0.85",
                    "changefreq": "daily"
                })

                # 동 단위 하위 샵 상세 페이지 (예: /seoul/jongno/효자동/shop/1)
                for s_id in shop_ids:
                    url_entries.append({
                        "loc": f"{base_url}/{city}/{district}/{encoded_dong}/shop/{s_id}",
                        "priority": "0.75",
                        "changefreq": "weekly"
                    })

    # XML 작성
    xml_content = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml_content.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    for entry in url_entries:
        xml_content.append("  <url>")
        xml_content.append(f"    <loc>{entry['loc']}</loc>")
        xml_content.append(f"    <lastmod>{today}</lastmod>")
        xml_content.append(f"    <changefreq>{entry['changefreq']}</changefreq>")
        xml_content.append(f"    <priority>{entry['priority']}</priority>")
        xml_content.append("  </url>")

    xml_content.append("</urlset>")

    os.makedirs("public", exist_ok=True)
    file_name = "public/sitemap.xml"
    with open(file_name, "w", encoding="utf-8") as f:
        f.write("\n".join(xml_content))

    print(f"🎉 동 페이지와 샵 페이지를 포함하여 총 {len(url_entries)}개의 URL이 public/sitemap.xml에 성공적으로 생성되었습니다!")

if __name__ == "__main__":
    generate_sitemap()