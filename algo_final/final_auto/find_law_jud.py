from selenium import webdriver as wd
import pymysql
from selenium.webdriver.common.keys import Keys

contents = []
nums = []
keywords = []

def rulu(key, target,conn):
    url = "http://likms.assembly.go.kr/law/lawsNormInqyMain1010.do?mappingId=%2FlawsNormInqyMain1010.do&genActiontypeCd=2ACT1010"
    options = wd.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    driver = wd.Chrome(executable_path='chromedriver.exe', options=options)
    # driver = wd.Chrome(executable_path='chromedriver.exe')
    driver.get(url)

    keyword = target
    driver.find_element_by_css_selector(".myvalue").click()
    driver.find_elements_by_css_selector(".aList")[0].find_elements_by_css_selector("a")[2].click()

    driver.find_element_by_id('srchNm').send_keys(keyword)
    driver.find_element_by_css_selector('button.btn_search').click()

    html = driver.page_source

    section = driver.find_element_by_id('searchPanSi')
    section.find_element_by_class_name('type02')
    panItems = []
    hrefs = []

    panitems = section.find_elements_by_css_selector('a')
    cnt = 0
    for panitem in panitems:
        temp = panitem.get_attribute("href")

        try:
            if 'javascript' in temp:
                hrefs.append(temp)
                cnt = cnt + 1
        except:
            print('')
        if cnt == 5:
            break

    for href in hrefs:
        driver.execute_script(href)
        driver.switch_to.window(driver.window_handles[1])
        driver.find_element_by_tag_name("body").send_keys(Keys.F5)
        url = driver.current_url
        #with conn.cursor() as cursor:
        #    sql = 'INSERT INTO my_db.apr_sim_jud(keyword, url) SELECT %s, %s FROM dual WHERE NOT EXISTS (SELECT * FROM my_db.apr_sim_jud WHERE url=%s);'
        #    cursor.execute(sql, (key, url, url))
        #conn.commit()
        driver.close()
        driver.switch_to.window(driver.window_handles[0])
    return

def get_jud(conn):
    with conn.cursor() as cursor:
        sql = 'SELECT * FROM my_db.apr_sim_law'
        cursor.execute(sql)
        temp1 = cursor.fetchall()

    for doc in temp1:
        keywords.append(doc[0])
        contents.append(doc[2])
        nums.append(doc[3])

    for i in range(0, len(contents)):
        rulu(keywords[i], contents[i], conn)