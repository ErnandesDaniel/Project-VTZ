"use client"
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import Text from "@/components/Universal/Text/Text";
import './edit-vtz.css';
import { Input, Flex } from 'antd';
const { Search } = Input;
import { Checkbox } from "antd";
import Button from "@/components/Universal/Button/Button";
import CheckBoxButton from "@/app/create-vtz/components/check-box-button";
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from "next/link";

export default function Edit_VTZ() {
    
    const projectInstitutes = ['СТО', 'СПбПИ', 'МПИ', 'НПИ', 'Общая практика'];

    return (
        <Page className='edit-VTZ-page'>
            <Spacer space={22} />
            <Text className='title'>Редактирование ВТЗ</Text>
            <Spacer space={30} />
            <Flex gap={20}>
                <Text className='text'>Номер ВТЗ</Text>
                <Input
                    className='input1-text'
                    placeholder='Введите номер ВТЗ'
                />
            </Flex>
            <Spacer space={30} />
            <Flex gap={20}>
                <Text className='text'>Вид ВТЗ</Text>
                <Input
                    className='input2-text'
                    placeholder='Введите название ВТЗ'
                />
            </Flex>
            <Spacer space={20} />
            <Checkbox>Требует ли уточнения</Checkbox>
            <Spacer space={20} />
            <Flex gap={20}>
                <Text className='text'>Разделы ПД/РД</Text>
                <Search
                    className='input3-text'
                    placeholder='Выберите разделы ПД/РД'
                />
                <Flex gap={20} align="center">
                    <Checkbox>Влияет на все разделы ПД/РД</Checkbox>
                </Flex>

            </Flex>

            {/* Добавляем статические элементы, которые выбрали в предыдущем инпуте */}
            <Flex gap={10} wrap="wrap" className="section-tags">
                <div className="section-tag">
                    <span>ПД: Раздел 3.5</span>
                    <button className="remove-btn">
                        <DeleteOutlined /> {/* корзина */}
                    </button>
                </div>
                <div className="section-tag">
                    <span>ПД: Раздел 5.7.2</span>
                    <button className="remove-btn">
                        <DeleteOutlined /> {/* корзина */}
                    </button>
                </div>
                <div className="section-tag">
                    <span>РД: Тепломеханические решения</span>
                    <button className="remove-btn">
                        <DeleteOutlined /> {/* корзина */}
                    </button>
                </div>
            </Flex>

            <Spacer space={25} />
            <Flex gap={15}>
                <Text className='text'>Проектные институты</Text>
                {
                    projectInstitutes.map((text) => {
                        return <CheckBoxButton key={text} text={text} />;
                    })
                }
            </Flex>
            <Spacer space={30} />

            <Flex className="relations-container">
                {/* Блок Предшественников */}
                <div className="relations-column">
                    <Text className='text'>Предшественники</Text>
                    <div className="actions">
                        <Checkbox>Выбрать все</Checkbox>

                        <div>
                            <PlusSquareOutlined
                                style={{fontSize: '20px', color: '#1890ff', cursor: 'pointer', marginRight: '5px'}}
                            />
                            <span style={{marginRight: '100px', fontSize: '14px', fontFamily: 'Montserrat, sans-serif !important'}}>Добавить</span>
                            <DeleteOutlined
                                style={{fontSize: '20px', color: '#d9363e', cursor: 'pointer', marginRight: '5px'}}
                            />
                            <span style={{marginRight: '50px', fontSize: '14px', fontFamily: 'Montserrat, sans-serif !important'}}>Удалить</span>
                        </div>
                    </div>
                    <Spacer space={5} />
                    <div className="relations-list">
                        <div className="relations-list-item">
                            <Checkbox>117. Задание на подвод технологической среды</Checkbox>
                        </div>
                        <div className="relations-list-item">
                            <Checkbox>118. Задание на подвод технологической среды</Checkbox>
                        </div>
                        <div className="relations-list-item">
                            <Checkbox>119. Задание на подвод технологической среды</Checkbox>
                        </div>

                    </div>
                </div>

                {/* Блок Последователей */}
                <div className="relations-column">
                    <Text className='text'>Последователи</Text>
                    <div className="actions">
                        <Checkbox>Выбрать все</Checkbox>

                        <div>
                            <PlusSquareOutlined
                                style={{fontSize: '20px', color: '#1890ff', cursor: 'pointer', marginRight: '5px'}}
                            />
                            <span style={{marginRight: '100px', fontSize: '14px', fontFamily: 'Montserrat, sans-serif !important'}}>Добавить</span>
                            <DeleteOutlined
                                style={{fontSize: '20px', color: '#d9363e', cursor: 'pointer', marginRight: '5px'}}
                            />
                            <span style={{marginRight: '50px', fontSize: '14px', fontFamily: 'Montserrat, sans-serif !important'}}>Удалить</span>
                        </div>
                    </div>
                    <Spacer space={5}/>
                    <div className="relations-list">
                        <div className="relations-list-item">
                            <Checkbox>104. Задание на подвод технологической среды</Checkbox>
                        </div>
                        <div className="relations-list-item">
                            <Checkbox>106. Задание на подвод технологической среды</Checkbox>
                        </div>
                    </div>
                </div>
            </Flex>

            <Spacer space={40}/>
            <Flex gap={20}>
                <Button title='Сохранить изменения' width={200} height={35}/>
                <Button type='default' width={150} height={35} backgroundColor="white" title={<Link href="/vtz-table">Назад к списку</Link>}/>
            </Flex>


        </Page>
    );

}