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

    # 3. 서울·경기·인천 전지역 구·시·군 전체 목록
    region_list = [
        # 서울특별시 (25개 구)
        {"region": "seoul", "district": "종로구"}, {"region": "seoul", "district": "중구"},
        {"region": "seoul", "district": "용산구"}, {"region": "seoul", "district": "성동구"},
        {"region": "seoul", "district": "광진구"}, {"region": "seoul", "district": "동대문구"},
        {"region": "seoul", "district": "중랑구"}, {"region": "seoul", "district": "성북구"},
        {"region": "seoul", "district": "강북구"}, {"region": "seoul", "district": "도봉구"},
        {"region": "seoul", "district": "노원구"}, {"region": "seoul", "district": "은평구"},
        {"region": "seoul", "district": "서대문구"}, {"region": "seoul", "district": "마포구"},
        {"region": "seoul", "district": "양천구"}, {"region": "seoul", "district": "강서구"},
        {"region": "seoul", "district": "구로구"}, {"region": "seoul", "district": "금천구"},
        {"region": "seoul", "district": "영등포구"}, {"region": "seoul", "district": "동작구"},
        {"region": "seoul", "district": "관악구"}, {"region": "seoul", "district": "서초구"},
        {"region": "seoul", "district": "강남구"}, {"region": "seoul", "district": "송파구"},
        {"region": "seoul", "district": "강동구"},
        # 경기도 (31개 시·군 및 세부 구)
        {"region": "gyeonggi", "district": "수원시 장안구"}, {"region": "gyeonggi", "district": "수원시 권선구"},
        {"region": "gyeonggi", "district": "수원시 팔달구"}, {"region": "gyeonggi", "district": "수원시 영통구"},
        {"region": "gyeonggi", "district": "성남시 수정구"}, {"region": "gyeonggi", "district": "성남시 중원구"},
        {"region": "gyeonggi", "district": "성남시 분당구"}, {"region": "gyeonggi", "district": "고양시 덕양구"},
        {"region": "gyeonggi", "district": "고양시 일산동구"}, {"region": "gyeonggi", "district": "고양시 일산서구"},
        {"region": "gyeonggi", "district": "용인시 처인구"}, {"region": "gyeonggi", "district": "용인시 기흥구"},
        {"region": "gyeonggi", "district": "용인시 수지구"}, {"region": "gyeonggi", "district": "부천시 원미구"},
        {"region": "gyeonggi", "district": "부천시 소사구"}, {"region": "gyeonggi", "district": "부천시 오정구"},
        {"region": "gyeonggi", "district": "안산시 상록구"}, {"region": "gyeonggi", "district": "안산시 단원구"},
        {"region": "gyeonggi", "district": "안양시 만안구"}, {"region": "gyeonggi", "district": "안양시 동안구"},
        {"region": "gyeonggi", "district": "남양주시"}, {"region": "gyeonggi", "district": "화성시"},
        {"region": "gyeonggi", "district": "평택시"}, {"region": "gyeonggi", "district": "의정부시"},
        {"region": "gyeonggi", "district": "파주시"}, {"region": "gyeonggi", "district": "김포시"},
        {"region": "gyeonggi", "district": "시흥시"}, {"region": "gyeonggi", "district": "광명시"},
        {"region": "gyeonggi", "district": "광주시"}, {"region": "gyeonggi", "district": "하남시"},
        {"region": "gyeonggi", "district": "군포시"}, {"region": "gyeonggi", "district": "오산시"},
        {"region": "gyeonggi", "district": "이천시"}, {"region": "gyeonggi", "district": "안성시"},
        {"region": "gyeonggi", "district": "양주시"}, {"region": "gyeonggi", "district": "포천시"},
        {"region": "gyeonggi", "district": "여주시"}, {"region": "gyeonggi", "district": "동두천시"},
        {"region": "gyeonggi", "district": "가평군"}, {"region": "gyeonggi", "district": "양평군"},
        {"region": "gyeonggi", "district": "연천군"},
        # 인천광역시 (10개 구·군)
        {"region": "incheon", "district": "중구"}, {"region": "incheon", "district": "동구"},
        {"region": "incheon", "district": "미추홀구"}, {"region": "incheon", "district": "연수구"},
        {"region": "incheon", "district": "남동구"}, {"region": "incheon", "district": "부평구"},
        {"region": "incheon", "district": "계양구"}, {"region": "incheon", "district": "서구"},
        {"region": "incheon", "district": "강화군"}, {"region": "incheon", "district": "옹진군"},
    ]

    shop_ids = [1, 2, 3, 4, 5]

    # 구/시 단위 페이지 및 샵 상세 페이지 일괄 생성
    for item in region_list:
        encoded_district = urllib.parse.quote(item["district"])
        
        # 지역 페이지 추가
        url_entries.append({
            "loc": f"{base_url}/{item['region']}/{encoded_district}",
            "priority": "0.9",
            "changefreq": "daily"
        })

        # 샵 상세 페이지 추가 (1~5번 샵)
        for s_id in shop_ids:
            url_entries.append({
                "loc": f"{base_url}/{item['region']}/{encoded_district}/shop/{s_id}",
                "priority": "0.8",
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

    print(f"🎉 총 {len(url_entries)}개의 URL이 포함된 케어나비 사이트맵이 public/sitemap.xml로 생성되었습니다!")

if __name__ == "__main__":
    generate_sitemap()