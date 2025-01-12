"use client"
import { Table } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import {columns} from "@/app/documentation-table/table-columns";
import {dataSource} from "@/app/documentation-table/table-mock-data";
import {useVTZStore} from "@/store/store";
import {useMemo} from "react";

    const Documentation_Table = () => {

        const{vtzDocumentationList}= useVTZStore();

        const vtzDocumentationTableList=useMemo(()=>{
            return vtzDocumentationList.map(({sectionName,sectionShortName, isDeleted}, index)=>{
                return{
                    key:index+1,
                    shortName:sectionShortName,
                    name:sectionName,
                    isDeleted:isDeleted
                }
            });
        },[vtzDocumentationList]);
        
        return (
            <Page>
                <Spacer space={22} />
                <div style={{ marginLeft: "20px" }}
                    className="documentation-table-wrapper">
                    <Table
                        className="documentation-table" // Уникальный класс для таблицы
                        columns={columns}
                        dataSource={vtzDocumentationTableList}
                        scroll={{ y: 500 }}
                    />
                </div>
            </Page>
        );
    };

    export default Documentation_Table;

