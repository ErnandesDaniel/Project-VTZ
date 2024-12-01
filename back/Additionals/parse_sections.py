import pandas as pd
import psycopg2
from psycopg2 import sql
import uuid

dataset = pd.read_excel('./Additionals/data.xlsx', sheet_name='Разделы')
dataset['id'] = [ str(uuid.uuid4()) for _ in range(len(dataset)) ]

def write_to_db(types: dict):
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
    CREATE TABLE IF NOT EXISTS public."Sections"
    (
        "Id" uuid NOT NULL,
        "SectionShortName" text COLLATE pg_catalog."default" NOT NULL,
        "SectionName" text COLLATE pg_catalog."default" NOT NULL,
        "IsDeleted" boolean NOT NULL,
        "SectionTypeId" uuid NOT NULL,
        CONSTRAINT "PK_Sections" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_Sections_SectionsTypes_SectionTypeId" FOREIGN KEY ("SectionTypeId")
            REFERENCES public."SectionsTypes" ("Id") MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )
    """
    cursor.execute(create_table_query)
    conn.commit()

    # Вставка данных в таблицу
    for index, row in dataset.iterrows():
        insert_query = sql.SQL("""
        INSERT INTO public."Sections"(
            "Id", "SectionShortName", "SectionName", "IsDeleted", "SectionTypeId")
        VALUES (%s, %s, %s, %s, %s);
        """)
        cursor.execute(insert_query, (row['id'], row['Короткое название'], row['Полное название'], False, types[row['Тип']]))

    # Подтвердить изменения и закрыть соединение
    conn.commit()
    cursor.close()
    conn.close()

if __name__=='__main__':
    print(dataset)
    types = {
        "РД": "07eb7112-8fc0-465b-b827-1cb0c4107e82",
        "Анализы": "09970c26-23ee-44d5-832a-68e73339b58d",
        "ПД": "67797bd3-8858-42b2-bdfc-bd13f5150203",
        "ST1": "9377c5f0-67e6-4a90-a822-9f3499d7ccc0",
        "ВАБ-1": "da970710-c5d7-4f8a-8fae-2fa71c948a01",
        "ST2": "fd1539c9-7275-4239-8653-b18ccd563a5f"
    }
    write_to_db(types)