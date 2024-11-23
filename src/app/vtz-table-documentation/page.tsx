"use client"
import { Table } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import {columns} from "@/app/vtz-table-documentation/table-columns";
import {dataSource} from "@/app/vtz-table-documentation/table-mock-data";
export default function VTZ_Table() {

    const tableParams={
        pagination: {
            pageSize: 3,
        },
    };

    return(<Page>
    <Spacer space={10} />
    <Table
        dataSource={dataSource}
        columns={columns}
        pagination={tableParams.pagination}
    />
    </Page>);

}