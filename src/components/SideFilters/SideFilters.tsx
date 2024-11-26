"use client"
import "./SideFilters.css";
import Spacer from "@/components/Universal/Spacer/Spacer";
import AtomIconSVG from "./atomenergoproject.svg";
import Image from 'next/image';
import { Flex, Select } from "antd";
import { Checkbox } from "antd";
import ChoiceOrAnd from "@/components/SideFilters/components/choice-or-and/choice-or-and";
import Button from "@/components/Universal/Button/Button";

export default function SideFilters() {

    const pagesLinks=[
        {text:'Схема ВТЗ', href:''},
        {text:'Задания', href:''},
        {text:'Задания без связей', href:''},
        {text:'Удаленные задания', href:''},
        {text:'Документация', href:''},
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

    const VTZ_List=[

        {text:'Первое ВТЗ', id:1},
        {text:'Второе ВТЗ', id:2},
        {text:'Третье ВТЗ', id:3},
        {text:'Четвертое ВТЗ', id:4},
        {text:'Пятое ВТЗ', id:5},
        {text:'Шестое ВТЗ', id:6},
        {text:'Седьмое ВТЗ', id:7},
        {text:'Восьмое ВТЗ', id:8},
        {text:'Девятое ВТЗ', id:9},
        {text:'Десятое ВТЗ', id:10},

    ];

    const documentationList=[

        {text:'Первый раздел документации', id:1},
        {text:'Второй раздел документации', id:2},
        {text:'Третий раздел документации', id:3},
        {text:'Четвертый раздел документации', id:4},
        {text:'Пятый раздел документации', id:5},
        {text:'Шестой раздел документации', id:6},
        {text:'Седьмой раздел документации', id:7},
        {text:'Восьмой раздел документации', id:8},
        {text:'Девятый раздел документации', id:9},
        {text:'Десятый раздел документации', id:10},

    ];




    return (
        <Flex className='side-filters' vertical>
            <Image
                src={AtomIconSVG}
                priority
                alt="Follow us on Twitter"
            />
            <Spacer space={20}/>

            <div className="links-list">
                {pagesLinks.map(({text}) => <div key={text} className='link-element'>
                    {text}
                </div>)}
            </div>

            <Spacer space={25}/>

            <div className="filters_title">Фильтры</div>

            <Spacer space={20}/>

            <ChoiceOrAnd title='Проектный институт'/>

            {institutesFilters.map(({text}) => <Checkbox key={text}>{text}</Checkbox>)}

            <Spacer space={20}/>

            <ChoiceOrAnd title='Документация'/>

            {documentsFilters.map(({text}) => <Checkbox key={text}>{text}</Checkbox>)}


            <Spacer space={10}/>

            <ChoiceOrAnd title='Раздел документации'/>

            <Spacer space={10}/>

            <Select
                showSearch
                placeholder="Выберите раздел документации"
                optionFilterProp="label"
                options={documentationList.map(({text, id})=>{return {value:id, label:text}})}
            />

            <Spacer space={10}/>

            <div className='VTZ-filter'>Фильтр по ВТЗ</div>

            <Spacer space={10}/>

            <Select
                showSearch
                placeholder="Выберите ВТЗ"
                optionFilterProp="label"
                options={VTZ_List.map(({text, id})=>{return {value:id, label:text}})}
            />

            <Spacer space={10}/>

            <Button  title='Применить' width={100}/>

        </Flex>)
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



















*/