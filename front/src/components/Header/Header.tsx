"use client"
import "./Header.css";
import { Input, Flex } from 'antd';
const { Search } = Input;
import Button from "@/components/Universal/Button/Button";

export default function Header() {

    return (
   <Flex className='header'>
       <Search placeholder='Поиск ВТЗ...' className='search'/>
       <Button  title='Найти ВТЗ' width={150} height={30}/>
   </Flex>
    )
}

