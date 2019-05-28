#_*_ coding: utf-8 _*_
# 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
# 네이버 검색 Open API 예제 - 블로그 검색
import urllib.request
import json

def getnews(keyword, conn):
    client_id = "N2Zyz2JpfmOreXybO7bZ"
    client_secret = "gddzJjJd5a"
    encText = urllib.parse.quote(keyword)
    url = "https://openapi.naver.com/v1/search/news?query=" + encText + "&display=5"  # json 결과
    # url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText + "&display=5"  # xml 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        # print(response_body.decode('utf-8'))
    else:
        print("Error Code:" + rescode)

    titles = []
    contents = []
    json_data = response_body.decode("utf-8")# ["bloggername"]
    # print(json_data)
    json_parsing = json.loads(json_data)['items']
    for data in json_parsing:
        titles.append(data['title'].replace("&quot;", ""))
        contents.append(data['link'])
        # print(data['title'].replace("&quot;", ""))
        # print(data['link'])
    for i in range(len(titles)):
        with conn.cursor() as cursor:
            sql = 'INSERT INTO my_db.apr_sim_news (keyword, content, title) SELECT * FROM (SELECT %s, %s, %s) AS tmp WHERE NOT EXISTS (SELECT * FROM my_db.apr_sim_news WHERE title=%s) LIMIT 1;'
            cursor.execute(sql, (keyword, contents[i], titles[i], titles[i]))
        conn.commit()


