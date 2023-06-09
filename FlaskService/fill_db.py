import json
import psycopg2

def append_data(conn, data):
    cursor = conn.cursor()

    cursor.execute(f"SELECT count(id) FROM function")
    j = cursor.fetchall()[0][0]
    # Проходимся по каждому элементу и вставляем его в таблицу
    for item in data:
        cursor.execute(f"SELECT id FROM vacancy WHERE id='{item['id']}'")
        rows = cursor.fetchall()
        if len(rows) <= 0:
            # Заполнение company
            cursor.execute(f"SELECT id FROM company WHERE id = {(item['employer']['id'])}")
            rows = cursor.fetchall()
            if len(rows) <= 0:
                if item['employer']['logo_urls']:
                    cursor.execute("INSERT INTO company (id, name, img_href) VALUES (%s, %s, %s)",
                    (item['employer']['id'], item['employer']['name'], item['employer']['logo_urls']['original']))
                else:
                    cursor.execute("INSERT INTO company (id, name, img_href) VALUES (%s, %s, %s)",
                    (item['employer']['id'], item['employer']['name'], None))


            cursor.execute("INSERT INTO vacancy (id, title, date, automation_percent, company_id, description, link) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                           (item['id'], item['name'], item['published_at'], item['automation_percent'], item['employer']['id'], item['description'], item['apply_alternate_url']))

            for i in range(0, len(item['responsibilities'])):
                cursor.execute("INSERT INTO function (id, name, is_automatable, vacancy_id) VALUES (%s, %s, %s, %s)",
                               (j, item['responsibilities'][i]["name_responsibility"], item['responsibilities'][i]['automation'], item["id"]))
                j += 1

    # Закрываем курсор и соединение
    cursor.close()
    conn.commit()
    conn.close()