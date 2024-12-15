"use client";
import { Table, Tabs } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import { columns } from "@/app/vtz-table/table-columns";
import { dataSource } from "@/app/vtz-table/table-mock-data";
import { useState } from "react";

const VTZTable = () => {
    const [filterKey, setFilterKey] = useState("all"); // Состояние для фильтров

    const tableParams = {
        pagination: {
            pageSize: 4, // Количество строк на странице
        },
    };

    // Фильтрация данных на основе выбранного фильтра
    const filteredData = dataSource.filter((item) => {
        if (filterKey === "no-links") return !item.successors && !item.predecessors;
        if (filterKey === "deleted") return item.isDeleted;
        return true; // "all" — показываем все
    });

    return (
        <Page>
            <Spacer space={10} />

            {/* Общий контейнер с отступом для табов и таблиц */}
            <div style={{ marginLeft: "20px" }}> {/* Сдвиг табов и таблиц вправо */}
                <Tabs activeKey={filterKey} onChange={setFilterKey}>
                    <Tabs.TabPane tab="Все ВТЗ" key="all">
                        <Table
                            className="vtz-table"
                            dataSource={filteredData}
                            columns={columns}
                            pagination={tableParams.pagination}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Без связей" key="no-links">
                        <Table
                            className="vtz-table"
                            dataSource={filteredData}
                            columns={columns}
                            pagination={tableParams.pagination}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Удаленные" key="deleted">
                        <Table
                            className="vtz-table"
                            dataSource={filteredData}
                            columns={columns}
                            pagination={tableParams.pagination}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Page>
    );
};

export default VTZTable;
