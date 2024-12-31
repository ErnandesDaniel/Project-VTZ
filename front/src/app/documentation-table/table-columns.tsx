import { Checkbox, Flex } from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import Link from "next/link";
export const columns = [

    {
        title: '№',
        dataIndex: 'key',

    },

    {
        title: 'Тип документации',
        dataIndex: 'shortName',

    },


    {
        title: 'Наименование',
        dataIndex: 'name',


           },

    {
        title: 'Удалено',
        dataIndex: 'isDeleted',

        render: (_: any, record) =>
            ( <Flex justify='center'>
            <Checkbox checked={false} />
            </Flex>)

    },


    {
        title: 'Редактировать',
        dataIndex: 'edit',

        render: (_: any, record) =>
            (
                <Link href={`/edit-documentation`} key={record.key}>
                    <Flex justify='center'>
                        <EditOutlined style={{cursor:'pointer', fontSize:'22px'}} />
                    </Flex>
                </Link>)

    },

    {
        title: 'Удалить',
        dataIndex: 'delete',

        render: (_: any, record) =>(
            <Flex justify='center'>
            <DeleteOutlined style={{cursor:'pointer', fontSize:'22px'}} />
        </Flex>)
    },

];