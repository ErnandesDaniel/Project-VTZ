"use client"
import "./Header.css";
import { Input, Flex } from 'antd';
const { Search } = Input;
import Button from "@/components/Universal/Button/Button";

export default function Header() {

    return (
   <Flex className='header'>
       <Search placeholder='Поиск ВТЗ...' className='search'/>
       <Button  title='Добавить ВТЗ' width={150}/>
   </Flex>
    )
}

