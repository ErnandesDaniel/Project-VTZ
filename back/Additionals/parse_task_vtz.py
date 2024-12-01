import pandas as pd
import psycopg2
from psycopg2 import sql
import uuid

dataset = pd.read_excel('./Additionals/data.xlsx', sheet_name='Задания')
dataset['id'] = [ str(uuid.uuid4()) for _ in range(len(dataset)) ]
dataset['false_number'] = [ int(float(number) * 10) for number in dataset['Номер'] ]


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
    CREATE TABLE IF NOT EXISTS public."TasksVTZ"
    (
        "Id" uuid NOT NULL,
        "TaskNumber" integer NOT NULL,
        "TaskName" text COLLATE pg_catalog."default" NOT NULL,
        "IsOnStagePD" boolean NOT NULL,
        "IsOnStageRD" boolean NOT NULL,
        "IsOnStageVAB1" boolean NOT NULL,
        "IsOnStageAnalysis" boolean NOT NULL,
        "IsAllSections" boolean NOT NULL,
        "RequiresClarification" boolean NOT NULL,
        "IsDeleted" boolean NOT NULL DEFAULT false,
        CONSTRAINT "PK_TasksVTZ" PRIMARY KEY ("Id")
    )
    """
    cursor.execute(create_table_query)
    conn.commit()

    # Вставка данных в таблицу
    for index, row in dataset.iterrows():
        insert_query = sql.SQL("""
        INSERT INTO public."TasksVTZ"(
            "Id", "TaskNumber", "TaskName", "IsOnStagePD", "IsOnStageRD", "IsOnStageVAB1", "IsOnStageAnalysis", "IsAllSections", "RequiresClarification", "IsDeleted")
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
        """)
        cursor.execute(insert_query, (row['id'], row['false_number'], row['Вид ВТЗ'], False, False, False, False, False, row['Требует уточнения'] == 'Да', False))

    # Подтвердить изменения и закрыть соединение
    conn.commit()
    cursor.close()
    conn.close()

if __name__=='__main__':
    print(dataset)
    # print(dataset['id'])
    write_to_db()