"use client"
import { Table } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import {columns} from "@/app/vtz-table/table-columns";
import {useVTZStore} from "@/store/store";
import {useMemo} from "react";


const VTZTable = () => {

    const{vtzList, deleteVTZ}= useVTZStore();

    const vtzTableList=useMemo(()=>
        vtzList.map(({taskNumber, taskName, practices, sections})=>{
            return{
                key: taskNumber,
                VTZ_number:taskNumber,
                VTZ_type:taskName,
                isDeleted:false,
                project_institutes:practices.$values.map(({practiceShortName})=>practiceShortName),
                documentation: sections.$values.map(({sectionName})=>sectionName),
            }
        })
    ,[vtzList]);

    return (
        <Page>
            <Spacer space={22} />
            <div className="vtz-table-wrapper">
                <Table
                    className="vtz-table"
                    dataSource={vtzTableList}
                    columns={columns(deleteVTZ)}
                    scroll={{ y: 500 }}
                />
            </div>
        </Page>
    );
};

export default VTZTable;