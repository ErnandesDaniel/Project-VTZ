"use client"
import "./SideFilters.css";
import Spacer from "@/components/Universal/Spacer/Spacer";
import AtomIconSVG from "./atomenergoproject.svg";
import Image from 'next/image';
import { Flex, Select, Form } from "antd";
import { Checkbox } from "antd";
import ChoiceOrAnd from "@/components/SideFilters/components/choice-or-and/choice-or-and";
import Button from "@/components/Universal/Button/Button";
import Link from 'next/link';
import {useCallback, useEffect} from "react";
import {useVTZStore} from "@/store/store";
import {useFilteredVTZ} from "@/components/SideFilters/hooks/filteredVTZ";
import {useActivePath} from "@/utils/useIsActivePath";
import clsx from "clsx";

export default function SideFilters() {

    const {isActivePath}=useActivePath();

    const{vtzTaskList, vtzDocumentationList}= useVTZStore();

    const { setFilteredVTZStoreData }=useFilteredVTZ();
    
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

    const [form] = Form.useForm();

    const {
        checkedInstitutes,
        checkedInstitutesOrAnd,
        checkedDocumentationType,
        checkedDocumentationTypeOrAnd,
        checkedDocumentation,
        checkedDocumentationOrAnd,
        checkedVTZ
    } = Form.useWatch(({
        checkedInstitutes,
        checkedInstitutesOrAnd,
        checkedDocumentationType,
        checkedDocumentationTypeOrAnd,
        checkedDocumentation,
        checkedDocumentationOrAnd,
        checkedVTZ
    }) => ({
        checkedInstitutes,
        checkedInstitutesOrAnd,
        checkedDocumentationType,
        checkedDocumentationTypeOrAnd,
        checkedDocumentation,
        checkedDocumentationOrAnd,
        checkedVTZ
    }), form) ?? {
        checkedInstitutes: undefined,
        checkedInstitutesOrAnd:'or',
        checkedDocumentationType: undefined,
        checkedDocumentationTypeOrAnd:'or',
        checkedDocumentation: undefined,
        checkedDocumentationOrAnd:'or',
        checkedVTZ: undefined
    };

    useEffect(() => {
        setFilteredVTZStoreData({
            checkedInstitutes: undefined,
            checkedInstitutesOrAnd:'or',
            checkedDocumentationType: undefined,
            checkedDocumentationTypeOrAnd:'or',
            checkedDocumentation: undefined,
            checkedDocumentationOrAnd:'or',
            checkedVTZ: undefined
        });
    }, [setFilteredVTZStoreData]);
    
    
    const onClick=useCallback(async ()=>{

       let localCheckedInstitutes=checkedInstitutes;
        
        if(checkedInstitutes?.includes('Общая практика')){
            localCheckedInstitutes=['СПбПИ', 'СТО', 'МПИ', 'НПИ'];
        }

        setFilteredVTZStoreData({checkedInstitutes:localCheckedInstitutes,
            checkedInstitutesOrAnd,
            checkedDocumentationType,
            checkedDocumentationTypeOrAnd,
            checkedDocumentation,
            checkedDocumentationOrAnd,
            checkedVTZ});

    },[checkedDocumentation,
        checkedDocumentationOrAnd,
        checkedDocumentationType,
        checkedDocumentationTypeOrAnd,
        checkedInstitutes,
        checkedInstitutesOrAnd,
        checkedVTZ,
        setFilteredVTZStoreData
        ]);

    return (
        <Flex className='side-filters' vertical>

            <Image
                src={AtomIconSVG}
                priority
                alt="Follow us on Twitter"
            />
            <Spacer space={50}/>

            <Flex className="links-list" vertical gap={10}>
                {pagesLinks.map(({text, href}) =>

                    <Link href={href} key={text} className={clsx('link-element', {'active-link': isActivePath(href)})}>
                {text}
            </Link>
            )}
        </Flex>

    <Spacer space={30}/>

    <div className="filters_title">Фильтры</div>

            <Spacer space={10}/>

            <Form form={form} layout="vertical" onFinish={onClick}>

                <div className="filters-container">

                <Form.Item name='checkedInstitutesOrAnd' initialValue={'or'}>
                    <ChoiceOrAnd title='Проектный институт'/>
                </Form.Item>

                <Form.Item name='checkedInstitutes'>
                    <Checkbox.Group options={institutesFilters.map(({text})=>text)} />
                </Form.Item>


                <Form.Item name='checkedDocumentationTypeOrAnd' initialValue={'or'}>
                    <ChoiceOrAnd title='Документация'/>
                </Form.Item>


                <Form.Item name='checkedDocumentationType'>
                    <Checkbox.Group options={documentsFilters.map(({text})=>text)} />
                </Form.Item >

                <Form.Item name='checkedDocumentationOrAnd' initialValue={'or'}>
                    <ChoiceOrAnd title='Раздел документации'/>
                </Form.Item>

                <Form.Item name='checkedDocumentation'>
                    <Select
                        showSearch
                        placeholder="Выберите раздел документации"
                        optionFilterProp="label"
                        options={vtzDocumentationList?.map(({sectionName})=>{
                            return{ value: sectionName, label:sectionName }
                        })}
                        mode="multiple"
                    />
                </Form.Item>

                <Form.Item name='checkedVTZ' label={<div className='VTZ-filter'>Фильтр по ВТЗ</div>}>
                    <Select
                        showSearch
                        placeholder="Выберите ВТЗ"
                        optionFilterProp="label"
                        options={vtzTaskList.map(({id, taskName})=>{
                            return{ value: id, label: taskName,}
                        })}
                        mode="multiple"

                    />
                </Form.Item>
                </div>
                <Spacer space={20}/>
                <Button
                    title='Применить'
                    width={150}
                    height={40}
                    backgroundColor="#6CACE4"
                    htmlType="submit"
                />
            </Form>
        </Flex>
    )
}
