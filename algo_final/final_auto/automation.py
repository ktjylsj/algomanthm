import sys
import os
import pymysql

sys.path.append(os.getcwd())


from final_auto import find_law_by_key
from final_auto import get_petitions
from final_auto import find_sim_laws
from final_auto import find_sim_news
from final_auto import find_key_word
from final_auto import find_law_jud
import time
#from . import find_law_by_key
#from . import get_petitions
#from . import find_sim_laws
#from . import find_sim_news
#from . import find_law_jud
#from . import find_key_word

conn = pymysql.connect(host='', user='', password='', db='', charset='utf8mb4')

#get_petitions.getdata(conn)

while(True):
    find_key_word.find_keyword(conn)
    keyword1 = []
    keyword2 = []
    keyword3 = []

    with conn.cursor() as cursor:
        sql = 'SELECT * FROM my_db.apr_pet_key'
        cursor.execute(sql)
        temp = cursor.fetchall()

    for doc in temp:
        keyword1.append(doc[1])
        keyword2.append(doc[2])
        keyword3.append(doc[3])

    for i in range(len(keyword1)):
        keyword = find_law_by_key.rulu(keyword1[i], conn)
        find_sim_laws.find_sim(conn, keyword)
        find_sim_news.getnews(keyword, conn)
        keyword = find_law_by_key.rulu(keyword2[i], conn)
        find_sim_laws.find_sim(conn, keyword)
        find_sim_news.getnews(keyword, conn)
        keyword = find_law_by_key.rulu(keyword3[i], conn)
        find_sim_laws.find_sim(conn, keyword)
        find_sim_news.getnews(keyword, conn)

    find_law_jud.get_jud(conn)
    time.sleep(3600)


