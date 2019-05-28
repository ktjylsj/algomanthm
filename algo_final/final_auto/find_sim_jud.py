#_*_ coding:utf-8 _*_
from selenium import webdriver as wd
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pymysql
import time
import re


def checkdata(word):
    return dict(접수=1, 소관위접수=2, 회부=2, 소관위심사=3, 본회의부의안건=4, 의안정리=5, 정부이송=5, 공포=6, 대안반영폐기=7, 본회의불부의=8, 철회=9, 본회의의결=10).get(word, 9)


def getdata(keyword, key, conn, index):
    main_url = 'http://likms.assembly.go.kr/bill/BillSearchResult.do'
    options = wd.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    driver = wd.Chrome(executable_path='chromedriver.exe', options=options)
    driver.get(main_url)
    driver.find_element_by_css_selector('button.btnSch01').click()

    driver.find_element_by_id('srchBillName').send_keys(keyword)
    driver.find_element_by_css_selector('button.btnSearch01').click()
    try:
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'subContents'))
        )
    except Exception as e:
        print('오류 발생', e)

    # lawItems = driver.find_elements_by_css_selector('.tableCol01').pop().find_elements_by_css_selector('tbody')
    # items = lawItems.pop().find_elements_by_css_selector('tr')

    if len(driver.find_element_by_css_selector('.tableCol01').find_elements_by_css_selector('a')) != 39:
        max_page = driver.find_element_by_css_selector('.tableCol01').find_elements_by_css_selector('.paging')
        limit_page = len(max_page.pop().text)
    else:
        info_num = driver.find_element_by_css_selector('.tableCol01').find_elements_by_css_selector('.btnPage')[1].get_attribute('href')
        limit_page = int(info_num[18:20])
    lawItems = []
    # output dataset
    names = []
    names2 = []
    names3 = []
    starts = []
    ends = []
    values = []
    counts1 = []

    # contents = []
    num = 0
    max_repeat = 0
    for page in range(1, limit_page+1):
        driver.execute_script("javascript:GoPage(%s)" % page)
        laws = driver.find_elements_by_css_selector('.tableCol01').pop().find_elements_by_css_selector('tbody')
        items = laws.pop().find_elements_by_css_selector('tr')
        max_repeat = len(items)
        time.sleep(1)
        for tr in items:
            if num == max_repeat:
                num = 0
                break
            num = num + 1
            # 의안 조건을 걸어 저장 유무 판단 하기!
            try:
                lawItems.append(tr.find_element_by_css_selector('a').get_attribute('href'))
                items.append(tr.find_element_by_css_selector('a').text)
                temp = tr.find_elements_by_css_selector('td')
                names.append(temp[1].text)
                starts.append(temp[3].text)
                ends.append(temp[4].text)
                values.append(temp[7].text)
            except:
                print("failed to find items")
                continue

    length = len(lawItems)
    # f = io.open(filename, mode="w", encoding="utf-8")
    # tag = "\"title\",\"name\",\"start\",\"end\",\"value\"\n"
    # f.write(tag)
    # for li in range(0, 10):
    for li in range(length):
        value = checkdata(values[li])
        if ends[li] == "":
            ends[li] = time.strftime("%Y-%m-%d")

        remove = re.compile('\(.+?\)')
        names2.append(remove.sub('',names[li]))
        if names2[li] in names2[0:li]:
            for i in range(len(counts1)):
                remove = re.compile('\(.+?\)')
                temp1 = remove.sub('', names2[li])
                temp2 = remove.sub('', names[i])
                if temp1 == temp2:
                    break
            counts1[i][value] = counts1[i][value] + 1
        else:
            counts2 = []
            for num in range(0, 10):
                counts2.append(0)
            counts1.append(counts2)
            counts1[len(counts1)-1][value] = counts1[len(counts1)-1][value] + 1
            names3.append(names2[li])

        name = names[li][2:len(names[li])]
        #with conn.cursor() as cursor:
        #    sql = 'INSERT INTO my_db.apr_bill_data (title, name, start, end, value) SELECT %s, %s, %s, %s, %s FROM dual WHERE NOT EXISTS (SELECT * FROM my_db.apr_bill_data WHERE name=%s and start=%s and end=%s);'
        #    cursor.execute(sql, (key+str(index), name, starts[li], ends[li], str(value), name, starts[li], ends[li]))
        #conn.commit()
    # f.close()
    for num in range(len(counts1)):
        name = names3[num][2:len(names3[num])]
        #with conn.cursor() as cursor:
        #    sql = 'INSERT INTO my_db.apr_bill_data_2 (title, name, one, two, three, four, five, six, seven, eight, nine, ten) SELECT %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s FROM dual WHERE NOT EXISTS (SELECT * FROM my_db.apr_bill_data_2 WHERE name=%s);'
        #    cursor.execute(sql, (key, name, counts1[num][0], counts1[num][1], counts1[num][2], counts1[num][3], counts1[num][4], counts1[num][5], counts1[num][6], counts1[num][7], counts1[num][8], counts1[num][9], name))
        #conn.commit()

    # 종료
    driver.close()
    return True
