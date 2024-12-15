import { Checkbox, Flex } from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
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
            ( <Flex justify='center'>
                <EditOutlined style={{cursor:'pointer', fontSize:'22px'}} />
            </Flex>)

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