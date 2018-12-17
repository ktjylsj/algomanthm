from selenium import webdriver as wd
from bs4 import BeautifulSoup as bs
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pymysql as my
import time
import sys


main_url = 'http://likms.assembly.go.kr/bill/BillSearchResult.do'
keyword = '동물'

driver = wd.Chrome(executable_path='chromedriver.exe')

driver.get(main_url)
driver.find_element_by_id('si1_label05').send_keys(keyword)
driver.find_element_by_css_selector('button.btnSch01').click()

try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'subContents'))
    )
except Exception as e:
    print('오류 발생', e)

# lawItems = driver.find_elements_by_css_selector('.tableCol01').pop().find_elements_by_css_selector('tbody')
# items = lawItems.pop().find_elements_by_css_selector('tr')
lawItems = []
for page in range(1, 3):
    driver.execute_script("javascript:GoPage(%s)" % page)
    laws = driver.find_elements_by_css_selector('.tableCol01').pop().find_elements_by_css_selector('tbody')
    items = laws.pop().find_elements_by_css_selector('tr')
    print("%s 페이지 이동" % page)
    for tr in items:
        # 의안 조건을 걸어 저장 유무 판단 하기!
        lawItems.append(tr.find_element_by_css_selector('a').get_attribute('href'))
    print(len(lawItems))

length = len(lawItems)
for li in range(length):
    print(lawItems[li])
driver.execute_script(lawItems[0])
print(driver.find_element_by_css_selector('.boxType01').find_element_by_css_selector('.on').text)
print(driver.find_element_by_css_selector('.tableCol01').find_element_by_css_selector('a').get_attribute('href'))
# 종료
driver.close()
driver.quit()
sys.exit()