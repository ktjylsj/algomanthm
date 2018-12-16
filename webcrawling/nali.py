from selenium import webdriver as wd
from bs4 import BeautifulSoup as bs
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pymysql as my
import time
import sys

main_url = 'http://likms.assembly.go.kr/law/lawsNormInqyMain1010.do?mappingId=%2FlawsNormInqyMain1010.do&genActiontypeCd=2ACT1010'
keyword = '동물'

driver: WebDriver = wd.Chrome(executable_path='chromedriver.exe')

driver.get(main_url)
driver.find_element_by_id('srchNm').send_keys(keyword)
driver.find_element_by_css_selector('button.btn_search').click()

try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'section_wrap'))
    )
except Exception as e:
    print('오류 발생', e)

temp = driver.find_elements_by_id('searchResultLaw')
lawItems = temp.pop().find_elements_by_css_selector('a')
links = []
for li in lawItems:
    links.append(li.get_attribute('href'))

driver.execute_script(links[0])
driver.switch_to.window(driver.window_handles[1])
data = driver.find_element_by_css_selector('.contents')
print(data.text)
time.sleep(2)

# 종료
driver.close()
driver.quit()
sys.exit()