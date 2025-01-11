"use client"
import "./SideFilters.css";
import Spacer from "@/components/Universal/Spacer/Spacer";
import AtomIconSVG from "./atomenergoproject.svg";
import Image from 'next/image';
import { Flex, Select } from "antd";
import { Checkbox } from "antd";
import ChoiceOrAnd from "@/components/SideFilters/components/choice-or-and/choice-or-and";
import Button from "@/components/Universal/Button/Button";

import Link from 'next/link';
import {useCallback, useMemo, useState} from "react";
import {useVTZStore} from "@/store/store";
import {useSideFiltersStore} from "@/components/SideFilters/store/store";

export default function SideFilters() {

    const{vtzTaskList, vtzDocumentationList, loadVTZTasksWithFilters}= useVTZStore();
    const {checkedInstitutes, setCheckedInstitutes}=useSideFiltersStore();

    const onClick=useCallback(async ()=>{





    },[loadVTZTasksWithFilters]);
    
    
    const vtzSearchList=useMemo(()=>
            vtzTaskList.map(({taskNumber, taskName})=>{
                return{
                    id: taskNumber,
                    text:taskName,
                }
            })
        ,[vtzTaskList]);


    const vtzDocumentationSearchList=useMemo(()=>
            vtzDocumentationList?.map(({id, sectionName})=>{
                return{
                    id: id,
                    text:sectionName,
                }
            })
        ,[vtzDocumentationList]);


    const pagesLinks=[
        {text:'Схема ВТЗ', href:'vtz-schema'},
        {text:'Задания', href:'vtz-table'},
        {text:'Документация', href:'documentation-table'},
        {text:'Личный кабинет', href:''},
        {text:'История изменений', href:''},
    ]

    const institutesFilters=[

        { text:'СПбПИ' },
        { text:'МПИ' },
        { text:'НПИ' },
        { text:'СТО' },
        { text:'Общая практика' },
    ];

    const documentsFilters=[
        { text:'ПД' },
        { text:'РД' },
        { text:'ВАБ-1' },
        { text:'Анализы' },
    ];

    const[institutes, setInstitutes]=useState([]);

    const onChangeInstitutes=useCallback((text:any, event:any)=>{
        if(event.target.checked){
            setCheckedInstitutes([...checkedInstitutes,text]);
        }else{
            setCheckedInstitutes(checkedInstitutes.filter((el)=>el!==text));
        }
    },[checkedInstitutes, setCheckedInstitutes]);






    return (
        <Flex className='side-filters' vertical>

            <Image
                src={AtomIconSVG}
                priority
                alt="Follow us on Twitter"
            />
            <Spacer space={50}/>

            <div className="links-list">
                {pagesLinks.map(({text, href}) =>

                    <Link href={href} key={text} className='link-element'>
                        {text}
                    </Link>)}
            </div>

            <Spacer space={30}/>

            <div className="filters_title">Фильтры</div>

            <Spacer space={10}/>

            <div className="filters-container">

                <ChoiceOrAnd title='Проектный институт'/>
                <Spacer space={20}/>


                <Checkbox.Group options={institutesFilters.map(({text})=>text)} defaultValue={['СПбПИ']}

                style={{
                    fontSize: '14px',
                    fontFamily: 'Montserrat, sans-serif'
                }}

                />


                {institutesFilters.map(({text}) => <Checkbox key={text} style={{
                    fontSize: '14px',
                    fontFamily: 'Montserrat, sans-serif'
                }} onChange={(event)=>onChangeInstitutes(text, event)}>{text}</Checkbox>)}

                <Spacer space={40}/>

                <ChoiceOrAnd title='Документация'/>
                <Spacer space={20}/>

                {documentsFilters.map(({text}) => <Checkbox key={text} style={{
                    fontSize: '14px',
                    fontFamily: 'Montserrat, sans-serif'
                }}>{text}</Checkbox>)}


                <Spacer space={40}/>

                <ChoiceOrAnd title='Раздел документации'/>

                <Spacer space={10}/>

                <Select
                    showSearch
                    placeholder="Выберите раздел документации"
                    optionFilterProp="label"
                    options={vtzDocumentationSearchList?.map(({text, id}) => {
                        return {value: id, label: text}
                    })}
                />

                <Spacer space={40}/>

                <div className='VTZ-filter'>Фильтр по ВТЗ</div>

                <Spacer space={10}/>

                <Select
                    showSearch
                    placeholder="Выберите ВТЗ"
                    optionFilterProp="label"
                    options={vtzSearchList?.map(({text, id}) => {
                        return {value: id, label: text}
                    })}
                />
            </div>

            <Spacer space={20}/>

            <Button
                title='Применить'
                width={150}
                height={40}
                backgroundColor="#6CACE4"
                onClick={onClick}
            />

        </Flex>
    )
}
