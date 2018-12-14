# 인터파크 투어 사이트에서 여행지를 입력 후 검색 -> 잠시후 -> 결과
# 로그인시 PC 웹 사이트에서 처리가 어려울 경우 -> 모바일 로그인 진입
# 모듈 가져오기
# pip install selenium
# pip install bs4
# pip install pymysql
from selenium import webdriver as wd
from bs4 import BeautifulSoup as bs
from selenium.webdriver.common.by import By
# 명시적 대기를 위해
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pymysql as my
import time
import sys

# 상품 정보를 담는 클래스

class TourInfo:
    # 멤버 변수 (실제 컬럼보다는 작게 세팅했음)
    title = ''
    price = ''
    area = ''
    link = ''
    img = ''
    contents = ''
    # 생성자
    def __init__(self, title, price, area, link, img, contents = None):
        self.title = title
        self.price = price
        self.area = area
        self.link = link
        self.img = img
        self.contents = contents

# 디비 처리, 연결, 해제, 검색어 가져오기, 데이터 삽입
class DBHelper:
    '''
    멤버변수 : 커넥션
    '''
    conn = None
    '''
    생성자
    '''
    def __init__(self):
        self.db_init()
    '''
    멤버 함수
    '''
    def db_init(self):
        self.conn = my.connect(
            host='localhost',
            user='root',
            password='20150303',
            db='pythonedb',
            port=1503,
            charset='utf8',
            cursorclass=my.cursors.DictCursor
        )

    def db_free(self):
        if self.conn:
            self.conn.close()
    # 검색 키워드 가져오기 -> 웹에서 검색

    def db_select(self):
        # 커서 오픈
        # with -> 닫기 처리를 자동으로 함 -> I/O 계열에서 많이 사용
        rows = None
        with self.conn.cursor() as cursor:
            # Read a single record
            sql = "SELECT * from tbl_keyword;"
            cursor.execute(sql)
            rows = cursor.fetchall()
            print(rows)
        return rows

    def db_insertCrawlingData(self, title, price, area, contents, keyword):
        with self.conn.cursor() as cursor:
            sql = '''INSERT INTO 'tbl_crawlingdata' (title, price, area, contents, keyword) values( %s, %s, %s, %s, %s )'''
            cursor.execute(sql, (title, price, area, contents, keyword))
        self.conn.commit()


# 디비를 확인해보기 위해서 만든 테스트 코드
# 단독으로 수행시에만 작동(메인일때만) -> 테스트 코드를 삽입해서 사용
# __name__ == '__main__':
#   db = DBHelper()
#   print(db.db_selectKeyword())
#   db.db_free()

# 사전에 필요한 정보를 로드 -> 디비 혹은 쉘, 배치 파일에서 인자로 받아서 세팅
# db = DBHelper()
main_url = 'https://tour.interpark.com/'
keyword = '로마'
# 상품 정보를 담는 리스트 (Tour 리스트)
tour_list = []

# 드라이버 로드
driver = wd.Chrome(executable_path='chromedriver.exe')
# 차후 -> 옵션 부여하여 (프록시, 에이전트 조작, 이미지를 배재)
# 크롤링을 오래 돌리면 -> 임시파일들이 쌓인다 -> 템프 파일 삭제

# 사이트 접속 (get)
driver.get(main_url)
# 검색창을 찾아서 검색어 입력
# id : SearchGNBText
driver.find_element_by_id('SearchGNBText').send_keys(keyword)
# 수정할 경우 -> 뒤에 내용이 붙어버림 -> .clear() -> send_keys('내용')
# 검색 버튼 클릭
# button.search-btn / .search-btn 도 무방
driver.find_element_by_css_selector('button.search-btn').click()

# 잠시 대기 -> 페이지가 로드 되고 나서 즉각적으로 데이터를 획득하는 행위는
# 명시적 대기 -> 특정 요소가 로케이트(발견될 때 까지) 대기
try:
    element = WebDriverWait(driver, 10).until(
        # 지정한 한개 요소가 올라오면 wait 종료
        EC.presence_of_element_located((By.CLASS_NAME, 'oTravelBox'))
    )
except Exception as e:
    print('오류 발생', e)
# 암묵적 대기 -> DOM 이 다 로드될 때 까지 대기하고 먼저 로드되면 바로 진행
# 요소를 찾을 특정 시간 동안 DOM 풀링을 지시 예를 들어 10초 이내라도 발견되면 바로 진행
# driver.implicitly_wait(10)
# 절대적 대기 -> time.sleep(시간(초)) -> 클라우드 페어(디도스 방어 솔루션)
# 더보기 눌러서 -> 게시판 진입
driver.find_element_by_css_selector('.oTravelBox>.boxList>.moreBtnWrap>.moreBtn').click()

# 게시판에서 데이터를 가져올 때
# 데이터가 많으면 세션(혹시 로그인을 해서 접근되는 사이트일 경우) 관리
# 특정 단위별로 로그아웃 로그인 계속 시도
# 특정 게시물이 사라질 경우 -> 팝업 발생 (없는 ...) -> 팝업 처리 검토
# 게시판 스캔시 -> 임계점을 모름!
# 게시판 스캔 -> 메타 정보 획득 -> loop 을 돌려서 일괄적으로 방문 접근 처리

# searchModule.SetCategoryList(1, '') 스크립트 실행
# 16은 임시 값, 게시물을 넘어갔을 때 현상을 확인차
for page in range(1, 2):  # 16):
    try:
        # 자바스크립트 구동하기
        driver.execute_script("searchModule.SetCategoryList(%s, '')" % page)
        time.sleep(2)
        print("%s 페이지 이동", page)
        #########################################################################
        # 여러 사이트에서 정보를 수집할 경우 공통 정보 정의 단계 필요
        # 상품명, 코멘트, 기간1, 기간2, 가격, 평점, 썸네일, 링크(실제 상품 상세 정보)
        boxItems = driver.find_elements_by_css_selector('.oTravelBox>.boxList>li')
        for li in boxItems:
            # 이미지를 링크값을 사용할 것인가?
            # 직접 다운로드 해서 우리 서버에 업로드(ftp) 할 것인가?
            print('썸네일', li.find_element_by_css_selector('img').get_attribute('src'))
            print('링크', li.find_element_by_css_selector('a').get_attribute('onclick'))
            print('상품명', li.find_element_by_css_selector('h5.proTit').text)
            print('코멘트', li.find_element_by_css_selector('.proSub').text)
            print('가격', li.find_element_by_css_selector('.proPrice').text)
            area = ''
            for info in li.find_elements_by_css_selector('.info-row .proInfo'):
                print(info.text)
            print('='*100)
            # 데이터 모음
            # li.find_elements_by_css_selector('.info-row .proInfo')[1].text
            # 데이터가 부족하거나 없을 수도 있으므로 직접 인덱스로 표현은 위험성이 있음
            obj = TourInfo(
                li.find_element_by_css_selector('h5.proTit').text,
                li.find_element_by_css_selector('.proPrice').text,
                li.find_elements_by_css_selector('.info-row .proInfo')[1].text,
                li.find_element_by_css_selector('a').get_attribute('onclick'),
                li.find_element_by_css_selector('img').get_attribute('src')
            )
            tour_list.append(obj)
    except Exception as e1:
        print('오류', e1)

print(tour_list, len(tour_list))
# 수집한 정보 개수를 루프 -> 페이지 방문 -> 콘텐츠 획득(상품상세정보) -> 디비
for tour in tour_list:
    # tour -> TourInfo
    print(type(tour))
    # 링크 데이터에서 실데이터 획득
    # 분해
    arr = tour.link.split(',')
    if arr:
        # 대체
        link = arr[0].replace('searchModule.OnClickDetail(', '')
        # 슬라이싱 -> 앞에 ', 뒤에 ' 제거
        detail_url = link[1:-1]
        # 상세 페이지 이동 : URL 값이 완성된 형태인지 확인 (http~)
        driver.get(detail_url)
        time.sleep(1)
        # 현재 페이지를 BeautifulSoup 의 DOM 으로 구성
        soup = bs(driver.page_source, 'html.parser')
        # 현재 상세 정보 페이지에서 스케쥴 정보 획득
        data = soup.select('.tip-cover')
        print(type(data), len(data), data[0].contents)
        # 디비 입력 -> pymysql
        # 데이터 가공
        contents_final = ''
        for c in data[0].contents:
            contents_final = str(c)

        #db.db_insertCrawlingData(
        #    tour.title,
        #    tour.price,
        #    tour.area,
        #    contents_final,
        #    keyword
        #)

# 종료
driver.close()
driver.quit()
sys.exit()
