"use client"
import { Table } from "antd";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import {columns} from "@/app/vtz-table/table-columns";
import {dataSource} from "@/app/vtz-table/table-mock-data";
import {useEffect, useState} from "react"
import axios from "axios"

const VTZTable = () => {
    const tableParams = {
        pagination: {
            pageSize: 3, // Настройка количества строк на странице
        },
    };

    const [vtz, setVtz]=useState([]);

    useEffect(()=>{
        //axios.get('http://localhost:6001/http://localhost:5000/api/TaskVTZ/GetAll?withData=true').then((res)=>{
        axios.get('http://localhost:5000/api/TaskVTZ/GetAll?withData=true').then((res)=>{
            setVtz(res.data.value.$values.map(({taskNumber, taskName, practices, sections})=>{
                return{
                VTZ_number:taskNumber,
                VTZ_type:taskName,
                project_institutes:practices.$values.map(({practiceShortName})=>practiceShortName),
                documentation: sections.$values.map(({sectionName})=>sectionName),
                }
            }));
        });
    },[]);

    return (
        <Page>
            <Spacer space={22} />
            <div className="vtz-table-wrapper">
                <Table
                    className="vtz-table"
                    dataSource={vtz}
                    columns={columns}
                    pagination={tableParams.pagination}
                />
            </div>
        </Page>
    );
};

export default VTZTable;