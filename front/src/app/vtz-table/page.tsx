"use client"
import { Table, Tabs } from "antd";
import Page from "@/components/Page/Page";
import {columns} from "@/app/vtz-table/table-columns";
import {useVTZStore} from "@/store/store";
import React, {useCallback, useMemo, useState} from "react";

const VTZTable = () => {

    const{deleteVTZ, filteredVTZ}= useVTZStore();

    const [activeTabName, setActiveTabName] = useState("all"); // Состояние для фильтров

    // Фильтрация данных на основе выбранного фильтра
    const filteredData = useMemo(()=>{
        return filteredVTZ.filter((vtzItem) => {
           if (activeTabName === "deleted"){
               return vtzItem.isDeleted;
           }else{
               return true; // "all" — показываем все
           }
        });
    },[activeTabName, filteredVTZ]);
    
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
            const activeTab = tabs.find(({ key }) => key == String(activeTabKey));
            setActiveTabName(`${activeTab?.key}`);
        },
        [tabs]
    );

    return (
        <Page>
            <div className="vtz-table-wrapper" style={{ marginLeft: "20px" }}>
                <Tabs items={tabs} onChange={onChangeActiveTab} />
            </div>
        </Page>
    );
};

export default VTZTable;