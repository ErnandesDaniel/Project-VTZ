"use client"
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import Text from "@/components/Universal/Text/Text";
import './create-documentation.css';
import { Input, Flex } from 'antd';
const { Search } = Input;
import { Checkbox } from "antd";
import Button from "@/components/Universal/Button/Button";
import CheckBoxButton from "@/app/create-documentation/components/check-box-button";

export default function create_VTZ() {

    const projectInstitutes=['СТО', 'СПбПИ', 'МПИ', 'НПИ','Общая практика'];

    return(<Page className='create-documentation-page'>
        <Spacer space={22} />
        <Text className='title'>Добавление документации</Text>
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
            <Checkbox>Влияет на все разделы ПД/РД</Checkbox>
        </Flex>
        <Spacer space={30} />
        <Flex gap={15}>
            <Text className='text'>Проектные институты</Text>
            {
                projectInstitutes.map((text)=> {
                    return <CheckBoxButton key={text} text={text}/>;
                })
            }
        </Flex>
        <Spacer space={30} />
        <Flex gap={50}>
            <Button  title='Создать'/>
            <Button type='default'  title='Назад к списку'/>
        </Flex>
    </Page>);
}