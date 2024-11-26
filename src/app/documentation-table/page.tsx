"use client"
import { Table } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import {columns} from "@/app/documentation-table/table-columns";
import {dataSource} from "@/app/documentation-table/table-mock-data";


    const Documentation_Table = () => {
        const tableParams = {
            pagination: {
                pageSize: 5, // Количество строк на странице
            },
        };

        return (
            <Page>
                <Spacer space={22} />
                <div className="documentation-table-wrapper">
                    <Table
                        className="documentation-table" // Уникальный класс для таблицы
                        columns={columns}
                        dataSource={dataSource}
                        pagination={tableParams.pagination} // Параметры пагинации
                    />
                </div>
            </Page>
        );
    };

    export default Documentation_Table;

