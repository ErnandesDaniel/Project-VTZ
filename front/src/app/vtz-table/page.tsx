"use client"
import { Table, Tabs } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import {columns} from "@/app/vtz-table/table-columns";
import {useVTZStore} from "@/store/store";
import {useMemo, useState} from "react";


const VTZTable = () => {

    const{vtzTaskList, deleteVTZ}= useVTZStore();

    const vtzTableList=useMemo(()=>
            vtzTaskList.map(({taskNumber, taskName, practices, sections})=>{
                return{
                    key: taskNumber,
                    VTZ_number:taskNumber,
                    VTZ_type:taskName,
                    isDeleted:false,
                    project_institutes:practices.$values.map(({practiceShortName})=>practiceShortName),
                    documentation: sections.$values.map(({sectionName})=>sectionName),
                }
            })
        ,[vtzTaskList]);

    const [filterKey, setFilterKey] = useState("all"); // Состояние для фильтров

    // // Фильтрация данных на основе выбранного фильтра
    // const filteredData = vtzTableList.filter((item) => {
    //     if (filterKey === "no-links") return !item.successors && !item.predecessors;
    //     if (filterKey === "deleted") return item.isDeleted;
    //     return true; // "all" — показываем все
    // });

    return (
        <Page>
            <Spacer space={10} />
            <div className="vtz-table-wrapper" style={{ marginLeft: "20px" }}>
                <Tabs activeKey={filterKey} onChange={setFilterKey}>
                    <Tabs.TabPane tab="Все ВТЗ" key="all">
                        <Table
                            className="vtz-table"
                            dataSource={vtzTableList}
                            columns={columns(deleteVTZ)}
                            scroll={{ y: 500 }}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Без связей" key="no-links">
                        <Table
                            className="vtz-table"
                            dataSource={vtzTableList}
                            columns={columns(deleteVTZ)}
                            scroll={{ y: 500 }}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Удаленные" key="deleted">
                        <Table
                            className="vtz-table"
                            dataSource={vtzTableList}
                            columns={columns(deleteVTZ)}
                            scroll={{ y: 500 }}
                        />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Page>
    );
};

export default VTZTable;