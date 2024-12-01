import pandas as pd
import psycopg2
from psycopg2 import sql
import uuid

dataset = pd.read_excel('./Additionals/data.xlsx', sheet_name='Практики')
dataset['id'] = [ str(uuid.uuid4()) for _ in range(len(dataset)) ]

def write_to_db():
    # Подключение к базе данных PostgreSQL Host=localhost;Username=postgres;Password=1234;Database=VTZTest
    conn = psycopg2.connect(
        dbname="VTZTest",
        user="postgres",
        password="123",
        host="localhost",
        port="5432"
    )

    cursor = conn.cursor()

    # Создание таблицы (если еще не создана)
    create_table_query = """
    CREATE TABLE IF NOT EXISTS public."Practices"
    (
        "Id" uuid NOT NULL,
        "PracticeShortName" text COLLATE pg_catalog."default" NOT NULL,
        "PracticeFullName" text COLLATE pg_catalog."default" NOT NULL,
        "IsDeleted" boolean NOT NULL,
        CONSTRAINT "PK_Practices" PRIMARY KEY ("Id")
    )
    """
    cursor.execute(create_table_query)
    conn.commit()

    # Вставка данных в таблицу
    for index, row in dataset.iterrows():
        insert_query = sql.SQL("""
        INSERT INTO public."Practices"(
            "Id", "PracticeShortName", "PracticeFullName", "IsDeleted")
        VALUES (%s, %s, %s, %s);
        """)
        cursor.execute(insert_query, (row['id'], row['Короткое название'], row['Полное название'], False))

    # Подтвердить изменения и закрыть соединение
    conn.commit()
    cursor.close()
    conn.close()

if __name__=='__main__':
    print(dataset)
    write_to_db()
    # filtered = dataset[dataset['Короткое название'].isin(['СТО', 'НПИ'])]
    # print(filtered)
    # print(filtered['Полное название'])
