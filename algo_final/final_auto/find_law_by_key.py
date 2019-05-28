#_*_ coding:utf-8 _*_
from selenium import webdriver as wd
import pymysql
import bs4
from bs4 import BeautifulSoup
import re


def rulu(target, conn):
    # with conn.cursor() as cursor:
    #     sql = 'TRUNCATE TABLE apr_key_law;'
    #     cursor.execute(sql)
    # conn.commit()
    url = "http://likms.assembly.go.kr/law/lawsNormInqyMain1010.do?mappingId=%2FlawsNormInqyMain1010.do&genActiontypeCd=2ACT1010"
    options = wd.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    driver = wd.Chrome(executable_path='chromedriver.exe', options=options)
    # driver = wd.Chrome(executable_path='chromedriver.exe')
    driver.get(url)

    keyword = target
    driver.find_element_by_id('srchNm').send_keys(keyword)
    driver.find_element_by_css_selector('button.btn_search').click()
    html = driver.page_source
    #print("@@@@@@@@@@@@@@@@")
    #print(html)
    section = driver.find_element_by_class_name('section_wrap')
    section.find_element_by_class_name('sec_con')
    hrefs = []
    #print(len(section.find_elements_by_css_selector('a')))
    lawitems = section.find_elements_by_css_selector('a')
    cnt = 0
    for lawitem in lawitems:
        temp = lawitem.get_attribute("href")
        try:
            if 'javascript' in temp:
                hrefs.append(temp)
                cnt = cnt+1
        except:
            continue
        # 법 개수
        if cnt == 5:
            break
    #contents = []

    for href in hrefs:
        driver.execute_script(href)
        try:
            driver.switch_to.window(driver.window_handles[1])
        except:
            continue
        try:
            content = driver.find_element_by_css_selector('.contents')
            title = driver.find_element_by_class_name('bon_tit')
        except:
            continue
        #with conn.cursor() as cursor:
        #    sql = 'INSERT INTO my_db.apr_key_law (keyword, content, title) SELECT * FROM (SELECT %s, %s, %s) AS tmp WHERE NOT EXISTS (SELECT * FROM my_db.apr_key_law WHERE title=%s) LIMIT 1;'
        #    cursor.execute(sql, (keyword, content.text, title.text, title.text))
        #conn.commit()
        driver.close()
        driver.switch_to.window(driver.window_handles[0])
        return keyword
