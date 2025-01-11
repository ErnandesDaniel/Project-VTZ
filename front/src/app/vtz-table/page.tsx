"use client"
import { Table, Tabs } from "antd";
import Page from "@/components/Page/Page";
import {columns} from "@/app/vtz-table/table-columns";
import {useVTZStore} from "@/store/store";
import React, {useCallback, useMemo, useState} from "react";
import {useSideFiltersStore} from "@/components/SideFilters/store/store";

const VTZTable = () => {

    const{vtzTaskList, deleteVTZ}= useVTZStore();

    const {
        checkedInstitutes,
        checkedInstitutesOrAnd,
        checkedDocumentationType,
        checkedDocumentationTypeOrAnd,
        checkedDocumentation,
        checkedDocumentationOrAnd,
        checkedVTZ
    }=useSideFiltersStore();

    //console.log('vtzTaskList', vtzTaskList)

    const vtzTableList=useMemo(()=>
            vtzTaskList.map(({taskNumber, taskName, practices, sections, id, isVisible}:any)=>{
                return{
                    key: id,
                    VTZ_number:taskNumber,
                    VTZ_type:taskName,
                    isDeleted:false,
                    project_institutes:practices.$values.map(({practiceShortName}:any)=>practiceShortName),
                    documentation: sections.$values.map(({sectionName, id}:any)=>sectionName),
                    isVisible:isVisible,
                }
            }).filter(({isVisible})=>isVisible)
        ,[vtzTaskList]);

    const [activeTabName, setActiveTabName] = useState("all"); // Состояние для фильтров

    // Фильтрация данных на основе выбранного фильтра
    const filteredData = useMemo(()=>{
        let tabVTZ=vtzTableList.filter((vtzItem) => {
                if (activeTabName === "deleted") return vtzItem.isDeleted;
                return true; // "all" — показываем все
            });
        if(checkedDocumentationType?.length>0){
            if(checkedDocumentationTypeOrAnd=='and'){
                tabVTZ=tabVTZ.filter(
                    ({documentation}:{documentation:string[]})=>
                        documentation.every(docs => checkedDocumentationType.some((docsType)=>
                            docs.includes(docsType)))
                );
            }else if(checkedDocumentationTypeOrAnd=='or'){
                tabVTZ=tabVTZ.filter(
                    ({documentation}:{documentation:string[]})=>
                        documentation.some(docs => checkedDocumentationType.some((docsType)=>
                            docs.includes(docsType)))
                );
            }
        }


        if(checkedInstitutes?.length>0){
                if(checkedInstitutesOrAnd=='and'){
                    tabVTZ=tabVTZ.filter(
                        ({project_institutes}:{project_institutes:string[]})=>
                            project_institutes.every(docs => checkedInstitutes.includes(docs))
                    );
                }else if(checkedInstitutesOrAnd=='or'){

                    tabVTZ=tabVTZ.filter(
                        ({project_institutes}:{project_institutes:string[]})=>
                            project_institutes.some(docs => checkedInstitutes.includes(docs))
                    );
                }
        }

        if(checkedDocumentation?.length>0){
                if(checkedDocumentationOrAnd=='and'){
                    tabVTZ=tabVTZ.filter(
                        ({documentation}:{documentation:string[]})=>
                            documentation.every(docs => checkedDocumentation.includes(docs))
                    );
                }else if(checkedDocumentationOrAnd=='or'){

                    tabVTZ=tabVTZ.filter(
                        ({documentation}:{documentation:string[]})=>
                            documentation.some(docs => checkedDocumentation.includes(docs))
                    );
                }
        }

        if(checkedVTZ?.length>0){
                tabVTZ=tabVTZ.filter(({key}:{key:string})=>checkedVTZ.includes(key));
        }

        return tabVTZ;

    },[
        activeTabName,
        checkedDocumentation,
        checkedDocumentationOrAnd,
        checkedDocumentationType,
        checkedDocumentationTypeOrAnd,
        checkedInstitutes,
        checkedInstitutesOrAnd,
        checkedVTZ,
        vtzTableList
    ]);
    
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
            const activeTab = tabs.find(({ key }) => key == activeTabKey);
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