"use client"
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import Text from "@/components/Universal/Text/Text";
import './create-vtz.css';
import { Input, Flex } from 'antd';
const { Search } = Input;
import { Checkbox } from "antd";
import Button from "@/components/Universal/Button/Button";
import CheckBoxButton from "@/app/create-vtz/components/check-box-button";
import { DeleteOutlined } from '@ant-design/icons';

export default function create_VTZ() {


    const projectInstitutes = ['СТО', 'СПбПИ', 'МПИ', 'НПИ', 'Общая практика'];

    return (
        <Page className='create-VTZ-page'>
            <Spacer space={22} />
            <Text className='title'>Создание ВТЗ</Text>
            <Spacer space={30} />
            <Flex gap={20}>
                <Text className='text'>Номер ВТЗ</Text>
                <Input
                    className='input-text'
                    placeholder='Введите номер ВТЗ'
                />
            </Flex>
            <Spacer space={30} />
            <Flex gap={20}>
                <Text className='text'>Вид ВТЗ</Text>
                <Input
                    className='input-text'
                    placeholder='Введите название ВТЗ'
                />
            </Flex>
            <Spacer space={20} />
            <Checkbox>Требует ли уточнения</Checkbox>
            <Spacer space={20} />
            <Flex gap={20}>
                <Text className='text'>Разделы ПД/РД</Text>
                <Search
                    className='input-text'
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

            <Spacer space={30} />
            <Flex gap={15}>
                <Text className='text'>Проектные институты</Text>
                {
                    projectInstitutes.map((text) => {
                        return <CheckBoxButton key={text} text={text} />;
                    })
                }
            </Flex>
            <Spacer space={30} />
            <Flex gap={50}>
                <Button title='Создать' width={150} height={40}/>
                <Button type='default' title='Назад к списку' width={150} height={40} backgroundColor="white"/>
            </Flex>
        </Page>
    );
}