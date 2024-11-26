"use client"
import { Table } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import {columns} from "@/app/vtz-table/table-columns";
import {dataSource} from "@/app/vtz-table/table-mock-data";
const VTZTable = () => {
    const tableParams = {
        pagination: {
            pageSize: 3, // Настройка количества строк на странице
        },
    };

    return (
        <Page>
            <Spacer space={22} />
            <div className="vtz-table-wrapper">
                <Table
                    className="vtz-table"
                    dataSource={dataSource}
                    columns={columns}
                    pagination={tableParams.pagination}
                />
            </div>
        </Page>
    );
};

export default VTZTable;