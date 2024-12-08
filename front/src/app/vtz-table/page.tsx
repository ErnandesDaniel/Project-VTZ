"use client"
import { Table } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import {columns} from "@/app/vtz-table/table-columns";
import {useVTZStore} from "@/store/store";

const VTZTable = () => {

    const{vtzList, deleteVTZ}= useVTZStore();

    return (
        <Page>
            <Spacer space={22} />
            <div className="vtz-table-wrapper">
                <Table
                    className="vtz-table"
                    dataSource={vtzList}
                    columns={columns(deleteVTZ)}
                    scroll={{ y: 500 }}
                />
            </div>
        </Page>
    );
};

export default VTZTable;