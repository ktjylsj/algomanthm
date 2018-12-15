import requests
from selenium import webdriver as wd
from bs4 import BeautifulSoup as bs
from selenium.webdriver.common.by import By
# 명시적 대기를 위해
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pymysql as my
import time
import sys

main_url = 'http://likms.assembly.go.kr/law/lawsNormInqyMain1010.do?mappingId=%2FlawsNormInqyMain1010.do&genActiontypeCd=2ACT1010'
keyword = '동물'

driver = wd.Chrome(executable_path='chromedriver.exe')

driver.get(main_url)
driver.find_element_by_id('srchNm').send_keys(keyword)
driver.find_element_by_css_selector('button.btn_search').click()

try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'tab_m'))
    )
except Exception as e:
    print('오류 발생', e)

lawItems = driver.find_elements_by_id('searchResultLaw')
links = []
for li in lawItems:
    list = len(li.find_elements_by_css_selector('a'))
    for dt in range(list):
        # print(li.find_elements_by_css_selector('a')[dt].get_attribute('href'))
        links.append(li.find_elements_by_css_selector('a')[dt].get_attribute('href'))
        # driver.execute_script(li.find_elements_by_css_selector('a')[dt].get_attribute('href'))
        # time.sleep(2)
    # print("텍스트: ", li.text)

max = len(links)
for num in range(0, 1):
    jScript = links.pop()
    main_url = driver.execute_script(jScript)
    driver
    print(jScript)
    print(main_url)
    soup = bs(driver.page_source, 'html.parser')
    # print(soup)
# 종료
driver.close()
driver.quit()
sys.exit()