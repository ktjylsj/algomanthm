from selenium import webdriver as wd
import io
import pymysql

def getdata(conn):
    with conn.cursor() as cursor:
        sql = 'TRUNCATE TABLE apr_sim_pet;'
        cursor.execute(sql)
    conn.commit()

    main_url = 'https://www1.president.go.kr/petitions/best'
    options = wd.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    driver = wd.Chrome(executable_path='chromedriver.exe', options=options)
    driver.get(main_url)

    petItems = driver.find_elements_by_css_selector(".bl_body")[1].find_elements_by_css_selector(".bl_wrap")

    titles = []
    links = []
    people = []
    contents = []
    for pi in petItems:
        links.append(pi.find_element_by_css_selector("a").get_attribute('href'))
        people.append(pi.find_elements_by_css_selector("div")[4].text)

    length = len(petItems)
    for num in range(length):
        driver.get(links[num])
        titles.append(driver.find_element_by_css_selector(".petitionsView_title").text)
        if len(driver.find_element_by_css_selector(".View_write").text) == 0:
            contents.append(driver.find_elements_by_css_selector(".View_write")[1].text)
        else:
            contents.append(driver.find_element_by_css_selector(".View_write").text)

    for num in range(length):
        people[num] = people[num].replace(",", "")
        people[num] = people[num].replace("명", "")
        with conn.cursor() as cursor:
            # sql = 'INSERT INTO my_db.pet_title (class, title, people) VALUES (%s, %s, %s)'
            # cursor.execute(sql, (classes[num], titles[num], people[num]))
            # sql = 'INSERT INTO my_db.pet_detail (article_no, sort, title, detail) VALUES (%s, %s, %s, %s)'
            # cursor.execute(sql, (num+1, classes[num], titles[num], contents[num]))
            # 전시용
            # sql = 'INSERT INTO my_db.apr_petitions (name, people, content) VALUES (%s, %s, %s)'
            # 시뮬레이션용
            sql = 'INSERT INTO my_db.apr_sim_pet (name, people, content) VALUES (%s, %s, %s)'
            cursor.execute(sql, (titles[num], people[num], contents[num]))
        conn.commit()

    # 종료
    driver.close()
    driver.quit()

    return

'''
# conn = pymysql.connect(host='localhost', user='root', password='20150303jj', db='mydb', charset='utf8mb4')
# conn = pymysql.connect(host='39.120.184.198', user='guest', password='1q2w3e4r!' ,db='my_db', charset='utf8mb4')
conn = pymysql.connect(host='223.194.46.103', user='guest', password='1q2w3e4r!', db='my_db', charset='utf8mb4')
# host = DB주소(localhost 또는 ip주소), user = DB id, password = DB password, db = DB명

getdata(conn)

conn.close
'''