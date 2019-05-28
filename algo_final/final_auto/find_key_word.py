from konlpy.tag import Okt
import pymysql

def insertion_sort(collection, collection2, collection3):
    for index in range(1, len(collection)):
        while 0 < index and collection[index] > collection[index - 1]:
            collection[index], collection[index - 1] = collection[index - 1], collection[index]
            collection2[index], collection2[index - 1] = collection2[index - 1], collection2[index]
            collection3[index], collection3[index - 1] = collection3[index - 1], collection3[index]
            index -= 1

    return (collection, collection2, collection3)


def find_keyword(conn):
    #with conn.cursor() as cursor:
    #    sql = 'TRUNCATE TABLE my_db.apr_pet_key;'
    #    cursor.execute(sql)
    #conn.commit()
    twitter = Okt(jvmpath=None)

    ban_list = ['피해자', '가해자', '사람', '대한', '현재', '위해', '국민', '생각', '사건', '우리', '친구', '청원', '여러분'
                '저희', '대한민국', '지금', '자신', '또한', '때문', '정도', '정말', '이유', '동생', '대해', '마음', '계속',
                '학생', '사진', '상황', '정부' ,'다시', '이상', '모두', '아들', '통해' , '이제', '이야기', '조두순', '고통',
                '모든', '아빠', '엄마', '이후', '한번', '관련', '성민', '청와대', '문재인', '박근혜', '거나', '진주', '그것',
                '속칭', '바로', '해당', '이번', '다음', '스스로', '민주당', '한국당', '버닝썬', '하나', '김무성', '한당', '나경원']

    cursor = conn.cursor()
    sql = "SELECT * FROM apr_petitions"

    cursor.execute(sql)

    for i in range(1,16):
        set = []
        word_list = []
        pumsa_list = []
        freq_list = []
        tuple_list = []

        lines = cursor.fetchone()

        title = lines[0]
        tuple_list.append(twitter.pos(lines[0]))
        tuple_list.append(twitter.pos(lines[2]))


        for k in range(0, len(tuple_list)):
            x = tuple_list[k]

            for j in range(0, len(x)):
                word_flag = 0;
                y = x[j] #튜플 1개

                if y[1] == 'Noun' and len(y[0])!=1:
                    if not y[0] in ban_list: #단어 추가 쌉가능
                        if len(word_list) == 0 : #첫 입력일 경우
                            word_list.append(y[0])
                            pumsa_list.append(y[1])
                            freq_list.append(1)

                        else :
                            for k in range(0, len(word_list)) : # 단어가 있는지 검색
                                if word_list[k] == y[0] : #단어가 있으면
                                    word_flag = k;
                                    break

                        if word_flag == 0 :
                            word_list.append(y[0])
                            pumsa_list.append(y[1])
                            freq_list.append(1)
                        else:
                            freq_list[word_flag] = freq_list[word_flag]+1

        (freq_list, word_list, pumsa_list) = insertion_sort(freq_list, word_list, pumsa_list)

        set.append(title)
        for indb in range (0, 10):
            set.append(word_list[indb])

        # print(set)

        keyword_in_db(set, conn, i - 1)

def keyword_in_db(set, conn, num):
    order = str(num)
    #with conn.cursor() as cursor:
    #    sql = "INSERT INTO my_db.apr_pet_key (title, keyword1, keyword2, keyword3, keyword4, keyword5, keyword6, slug) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
    #    cursor.execute(sql, (set[0], set[1], set[2], set[3], set[4], set[5], set[6], order))
    #conn.commit()

