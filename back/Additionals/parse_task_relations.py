import pandas as pd
import psycopg2
from psycopg2 import sql
import uuid

dataset = pd.read_excel('./Additionals/data.xlsx', sheet_name='Связи (Елена)')
dataset['id'] = [ str(uuid.uuid4()) for _ in range(len(dataset)) ]
dataset['predecessor_false_number'] = [ int(float(number) * 10) for number in dataset['Номер предшественника'] ]
dataset['successor_false_number'] = [ int(float(number) * 10) for number in dataset['Номер последователя'] ]

def write_to_db(tasks: dict):
    # Подключение к базе данных PostgreSQL Host=localhost;Username=postgres;Password=1234;Database=VTZTest
    conn = psycopg2.connect(
        dbname="VTZTest",
        user="postgres",
        password="123",
        host="localhost",
        port="5432"
    )

    gatewayIds = [ str(uuid.uuid4()) for _ in range(len([ g for g in set(dataset['Номер шлюза']) if str(g) != 'nan' ])) ]
    write_gateways_to_db(gatewayIds)

    cursor = conn.cursor()

    # Создание таблицы (если еще не создана)
    create_table_query = """
    CREATE TABLE IF NOT EXISTS public."TaskRelations"
    (
        "Id" uuid NOT NULL,
        "SuccessorTaskId" uuid NOT NULL,
        "PredecessorTaskId" uuid NOT NULL,
        "GatewayId" uuid,
        CONSTRAINT "PK_TaskRelations" PRIMARY KEY ("Id"),
        CONSTRAINT "FK_TaskRelations_Gateways_GatewayId" FOREIGN KEY ("GatewayId")
            REFERENCES public."Gateways" ("Id") MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION,
        CONSTRAINT "FK_TaskRelations_TasksVTZ_PredecessorTaskId" FOREIGN KEY ("PredecessorTaskId")
            REFERENCES public."TasksVTZ" ("Id") MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE RESTRICT,
        CONSTRAINT "FK_TaskRelations_TasksVTZ_SuccessorTaskId" FOREIGN KEY ("SuccessorTaskId")
            REFERENCES public."TasksVTZ" ("Id") MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE RESTRICT
    )
    """
    cursor.execute(create_table_query)
    conn.commit()

    # Вставка данных в таблицу
    for index, row in dataset.iterrows():
        # Обработка номеров
        predecessor_number = row['predecessor_false_number']
        successor_number = row['successor_false_number']

        # Пропуск некорректных строк
        if not predecessor_number or not successor_number:
            print(f"- Пропуск строки {index} из-за ошибки в данных: {row}")
            continue

        # Получение UUID из словаря
        predecessor_id = tasks.get(predecessor_number)
        successor_id = tasks.get(successor_number)

        if not predecessor_id or not successor_id:
            print(f"- Пропуск строки {index} из-за отсутствия ключей: {row}")
            continue

        # Подготовка запроса
        insert_query = sql.SQL("""
        INSERT INTO public."TaskRelations"(
            "Id", "SuccessorTaskId", "PredecessorTaskId", "GatewayId")
        VALUES (%s, %s, %s, %s);
        """)

        # Выполнение запроса
        cursor.execute(insert_query, (row['id'], successor_id, predecessor_id, None))

    # Подтверждение изменений и закрытие соединения
    conn.commit()
    cursor.close()
    conn.close()


def write_gateways_to_db(conn, gatewayIds):
    cursor = conn.cursor()

    # Создание таблицы (если еще не создана)
    create_table_query = """
    CREATE TABLE IF NOT EXISTS public."Gateways"
    (
        "Id" uuid NOT NULL,
        CONSTRAINT "PK_Gateways" PRIMARY KEY ("Id")
    )
    """
    cursor.execute(create_table_query)
    conn.commit()

    for id in gatewayIds:
        # Подготовка запроса
        insert_query = sql.SQL("""
        INSERT INTO public."Gateways"(
            "Id")
        VALUES (%s);
        """)

        # Выполнение запроса
        cursor.execute(insert_query, (id))


if __name__=='__main__':
    tasks = {
        "10":	"d79c1b95-6705-48e9-9380-726a3ece8ff8",
        "20":	"8b2bc4bb-c2e4-4835-b35f-ec65b5ba5220",
        "30":	"6a79864b-6b6c-46e1-b07e-d76aac4ff658",
        "40":	"22415aa9-dbc6-4480-b28a-a8d6299425f4",
        "50":	"d17df5f1-7123-40bf-acca-452fbc71cfa2",
        "60":	"c960c917-a0d3-47cd-a86a-32ed2a44fae8",
        "70":	"aa1d59b3-34a1-4541-a0b1-c9a1b2e4c329",
        "80":	"143a7fbf-d1e2-4056-a491-15e36531264f",
        "90":	"c35e36d1-7a7e-4692-b09f-2c9511c3c73b",
        "100":	"391aff7c-83c9-42f1-80db-17afac490f33",
        "110":	"d9e50f71-2006-46d4-9492-b589dfdb1f96"
    }

    print(dataset)

    print(len([ g for g in set(dataset['Номер шлюза']) if str(g) != 'nan' ]))
    # write_to_db(tasks)