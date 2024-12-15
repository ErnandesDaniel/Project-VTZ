"use client"
import { Table, Tabs } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import {columns} from "@/app/vtz-table/table-columns";
import {useVTZStore} from "@/store/store";
import {useCallback, useMemo, useState} from "react";

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

    const [activeTabName, setActiveTabName] = useState("all"); // Состояние для фильтров

    // Фильтрация данных на основе выбранного фильтра
    const filteredData = useMemo(()=>{
            return vtzTableList.filter((vtzItem) => {
                if (activeTabName === "no-links") return true;
                if (activeTabName === "deleted") return vtzItem.isDeleted;
                return true; // "all" — показываем все
            });

    },[activeTabName, vtzTableList]);
    
    const tabs=useMemo(()=>{
        
        return [
            {
                label:'Все ВТЗ',
                key: 'all',
                children:<Table
                    className="vtz-table"
                    dataSource={filteredData}
                    columns={columns(deleteVTZ)}
                    scroll={{ y: 500 }}
                />,
            },

            {
                
                label: 'Без связей',
                key: 'no-links',
                children:<Table
                    className="vtz-table"
                    dataSource={filteredData}
                    columns={columns(deleteVTZ)}
                    scroll={{ y: 500 }}
                />,
            },

            {
                
                label: 'Удаленные',
                key: 'deleted',
                children:<Table
                    className="vtz-table"
                    dataSource={filteredData}
                    columns={columns(deleteVTZ)}
                    scroll={{ y: 500 }}
                />,
            },
        ];
        
        
    },[deleteVTZ, filteredData])

    const onChangeActiveTab = useCallback(
        (activeTabKey: number) => {
            const activeTab = tabs.find(({ key }) => key === activeTabKey);
            setActiveTabName(`${activeTab?.key}`);
        },
        [tabs]
    );

    return (
        <Page>
            <Spacer space={10} />
            <div className="vtz-table-wrapper" style={{ marginLeft: "20px" }}>
                <Tabs items={tabs} onChange={onChangeActiveTab} />
            </div>
        </Page>
    );
};

export default VTZTable;