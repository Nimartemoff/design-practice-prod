import re
from parser_hh import collect_vacancies
from fill_db import append_data
import nltk
from nltk.stem.snowball import RussianStemmer

import sklearn
from joblib import load
import psycopg2




# Функция для очистки текста
def prepare_text(text):
    # удаляем переносы строк
    del_n = re.compile('\n')
    text = del_n.sub(' ', str(text).lower())

    # удаляем теги HTML
    del_tags = re.compile('<[^>]*>')
    text = del_tags.sub('', text)

    # удаляем скобки
    del_brackets = re.compile('\([^)]*\)')
    text = del_brackets.sub('', text)

    # удаляем все символы, кроме букв и пробелов
    clean_text = re.compile('[^а-яa-z\s]')
    res_text = clean_text.sub('', text)

    # удаляем повторяющиеся пробелы
    del_spaces = re.compile('\s{2,}')
    text = del_spaces.sub(' ', res_text)

    return text


def preprocess_text(text):
    # стемминг
    stemmer = RussianStemmer(ignore_stopwords=True)

    # список стоп-слов для русского языка
    stop_words = nltk.corpus.stopwords.words('russian')

    # токенизация и приведение к нижнему регистру
    words = nltk.word_tokenize(text.lower())

    # удаление стоп-слов и символов
    words = [word for word in words if word.isalpha() and word not in stop_words]

    # стемминг
    words = [stemmer.stem(word) for word in words]

    return ' '.join(words)


def text_to_vec(text):
    # векторизация текста с помощью CountVectorizer
    vec = vectorizer.transform([text])
    return vec

svm_model = load('svm_model.joblib')
vectorizer = load('vectorizer.joblib')

def data_update():
    data = collect_vacancies()

    # продолжаем выполнение кода после завершения парсинга
    print("Parsing complete!")

    # список для хранения отфильтрованных вакансий
    filtered_data = []

    # обход вакансий и их фильтрация
    for vacancy in data:
        if not vacancy or 'description' not in vacancy:
            continue
        if vacancy['type']['id'] == "anonymous":
            continue
        description = vacancy['description']
        responsibilities_start = description.find('Обязанности:')
        if responsibilities_start == -1:
            continue
        if '<ul>' not in description[responsibilities_start:]:
            continue
        ul_start = description.find('<ul>', responsibilities_start)
        ul_end = description.find('</ul>', responsibilities_start)
        if ul_start == -1 or ul_end == -1:
            continue
        ul = description[ul_start + 4:ul_end]
        li_start = 0
        responsibilities = []
        while True:
            li_start = ul.find('<li>', li_start)
            if li_start == -1:
                break
            li_end = ul.find('</li>', li_start)
            responsibility = ul[li_start + 4:li_end]
            clean_responsibility = prepare_text(responsibility.strip())
            if (("график работы" in clean_responsibility) or ("условия работы" in clean_responsibility) or ("место работы" in clean_responsibility) or not(len(clean_responsibility.split()) > 1)):
                break
            if len(clean_responsibility) > 4:
                # Predict the automation result using the SVM model
                automation_result = svm_model.predict(text_to_vec(clean_responsibility))[0]
                responsibilities.append({
                    'name_responsibility': clean_responsibility,
                    'automation': automation_result
                })
            li_start = li_end + 1
        if responsibilities:
            vacancy['responsibilities'] = responsibilities
            sum = 0
            for j in responsibilities:
                sum += int(j['automation'])
            vacancy['automation_percent'] = round(sum/len(responsibilities), 2)
            filtered_data.append(vacancy)
        print(filtered_data)

    conn = psycopg2.connect(dbname='vacancies', user='postgres', password='somepass', host='localhost')
    append_data(conn, filtered_data)