from selenium import webdriver as wd
from bs4 import BeautifulSoup as bs
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
# 명시적 대기를 위해
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pymysql as my
import time
import sys

main_url = 'http://lawnb.com/Info/ContentMain/Law'
keyword = '동물'

driver: WebDriver = wd.Chrome(executable_path='chromedriver.exe')

driver.get(main_url)
driver.find_element_by_id('sWord').send_keys(keyword)
driver.find_element_by_id('searchBtn').click()

try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'submenu_group'))
    )
except Exception as e:
    print('오류 발생', e)

boxItems = driver.find_elements_by_css_selector('.main_container_inner')
print(len(boxItems))
print(boxItems.pop().text)
boxItems = driver.find_elements_by_id('search_results')
print(len(boxItems))
print(boxItems.pop().text)
# print(boxItems.find_elements_by_css_selector('li'))
#for li in boxItems:
#    print(li.text)
#    time.sleep(2)

# 종료
driver.close()
driver.quit()
sys.exit()