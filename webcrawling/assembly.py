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

# print(driver.page_source)

#print(len(driver.find_elements_by_css_selector('.tableCol01')))
#print(len(driver.find_elements_by_css_selector('.tableCol01').pop().find_elements_by_css_selector('tbody')))
lawItems = driver.find_elements_by_css_selector('.tableCol01').pop().find_elements_by_css_selector('tbody')
items = lawItems.pop().find_elements_by_css_selector('tr')
for tr in items:
    print(tr.text)


# 종료
driver.close()
driver.quit()
sys.exit()