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

main_url = 'http://lawnb.com/Info/ContentMain/Law'
keyword = '동물'

driver = wd.Chrome(executable_path='chromedriver.exe')

driver.get(main_url)
driver.find_element_by_id('sWord').send_keys(keyword)
driver.find_element_by_id('searchBtn').click()
'''def getdata(url):
    res = requests.get(url)
    data = res.text
    bs_obj = bs.BeautifulSoup(data, 'html.parser')
    #print(bs_obj)
    a = bs_obj.find('div', {"id": "searchLawAllReuslt"})
    #print(a)
    b = a.findAll('dt')
    for data in b:
       print(data)'''

# 종료
driver.close()
driver.quit()
sys.exit()