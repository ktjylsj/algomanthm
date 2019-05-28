#_*_ coding:utf-8 _*_
import pymysql
from gensim.models.doc2vec import TaggedDocument
from gensim.models import Doc2Vec
from konlpy.tag import Okt
from final_auto import find_sim_jud
import re


def find_sim(conn, keyword):
    contents = []
    titles = []
    nums = []
    num = 1
    temp = []
    temptitles = []
    index = 0

    # 법률
    with conn.cursor() as cursor:
        sql = 'SELECT * FROM my_db.laws'
        cursor.execute(sql)
        temp1 = cursor.fetchall()

    with conn.cursor() as cursor:
        sql = 'SELECT * FROM my_db.apr_key_law where keyword=%s'
        cursor.execute(sql, (keyword))
        temp2 = cursor.fetchall()

    for doc in temp1:
        contents.append(doc[1])
        titles.append(doc[2])
        nums.append(num)
        num += 1

    for doc in temp2:
        temp.append(doc[1])
        temptitles.append(doc[2])

    model_name = 'Doc2vec(laws)_nouns.model'
    doc2vec_model = Doc2Vec.load(model_name)


    class Doc2VecCorpus:
        def __iter__(self):
            for i in range(0, len(temp)):
                yield TaggedDocument(
                    Okt().nouns(temp[i]),
                    'news')

    doc2vec_corpus = list(Doc2VecCorpus())
    doc2vec_model.train(doc2vec_corpus, total_examples=doc2vec_model.corpus_count, epochs=doc2vec_model.epochs)

    for doc_id in range(len(doc2vec_corpus)):
        jud_index = 1
        inferred_vector = doc2vec_model.infer_vector(doc2vec_corpus[doc_id].words)
        sims = doc2vec_model.docvecs.most_similar([inferred_vector], topn=4)
        #print(doc2vec_model.docvecs.most_similar([inferred_vector], topn=4))
        #with conn.cursor() as cursor:
        #    sql = 'INSERT INTO my_db.apr_sim_law (keyword, content, title, sim) SELECT * FROM (SELECT %s, %s, %s, %s) AS tmp WHERE NOT EXISTS (SELECT * FROM my_db.apr_sim_law WHERE keyword=%s and title=%s and sim=%s) LIMIT 1;'
        #    cursor.execute(sql, (keyword, temp[doc_id], temptitles[doc_id], False, keyword, temptitles[doc_id], False))
        #conn.commit()
        print("현행법")
        print(re.sub(r'\([^)]*\)', '', temptitles[doc_id]))
        find_sim_jud.getdata(re.sub(r'\([^)]*\)', '', temptitles[doc_id]), keyword, conn, jud_index)
        jud_index += 1
        print("유사법")
        for sim in sims:
            #print(sim)
            print(titles[int(sim[0].replace("doc_", ""))])
            # print(contents[int(sim[0].replace("doc_", ""))])
            #with conn.cursor() as cursor:
            #    sql = 'INSERT INTO my_db.apr_sim_law (keyword, content, title, sim) SELECT * FROM (SELECT %s, %s, %s, %s) AS tmp WHERE NOT EXISTS (SELECT * FROM my_db.apr_sim_law WHERE keyword=%s and title=%s and sim=%s) LIMIT 1;'
            #    cursor.execute(sql, (keyword, contents[int(sim[0].replace("doc_", ""))], titles[int(sim[0].replace("doc_", ""))], True, keyword, titles[int(sim[0].replace("doc_", ""))], True))
            #conn.commit()
            #print(re.sub(r'\([^)]*\)', '', titles[int(sim[0].replace("doc_", ""))]))
            find_sim_jud.getdata(re.sub(r'\([^)]*\)', '', titles[int(sim[0].replace("doc_", ""))]), keyword, conn, jud_index)
            jud_index += 1
        print("*******************************************************************************************************")

    return True