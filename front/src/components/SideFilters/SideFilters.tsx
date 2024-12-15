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
import {useMemo} from "react";
import {useVTZStore} from "@/store/store";


export default function SideFilters() {

    const{vtzTaskList, vtzDocumentationList}= useVTZStore();

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
    ]

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

                {institutesFilters.map(({text}) => <Checkbox key={text} style={{
                    fontSize: '14px',
                    fontFamily: 'Montserrat, sans-serif'
                }}>{text}</Checkbox>)}

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

            <Button title='Применить' width={150} height={40} backgroundColor="#6CACE4"/>





        </Flex>
    )
}


/*


filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }




                <div className="Documentation_row">
                    <div className="Documentation">Документация</div>
                    <div className="check-box_and">и</div>
                    <div className="check-box_or">или</div>
                </div>

                <div className="Chack-box_Doc">
                    <input type="checkbox"/>
                    <div className="Doc">ПД</div>
                </div>
                <div className="Chack-box_Doc">
                    <input type="checkbox"/>
                    <div className="Doc">РД</div>
                </div>
                <div className="Chack-box_Doc">
                    <input type="checkbox"/>
                    <div className="Doc">ВАБ-1</div>
                </div>
                <div className="Chack-box_Doc">
                    <input type="checkbox"/>
                    <div className="Doc">Анализы</div>
                </div>

                <div className="Chapter_Doc_row">
                    <div className="Chapter">Раздел документации</div>
                    <div className="check-box_and">и</div>
                    <div className="check-box_or">или</div>
                </div>

                <input placeholder="Выберите раздел документации"/>
                <div className="Filtr_vtz">Фильтр по ВТЗ</div>
                <input placeholder="Выберите ВТЗ"/>
                <div className="button_3">Применить</div>



        {text:'Задания без связей', href:''},
        {text:'Удаленные задания', href:''},



















*/