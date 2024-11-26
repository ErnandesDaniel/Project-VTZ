import { Checkbox, Flex } from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
export const columns = [

    {
        title: '№',
        dataIndex: 'Number',

    },

    {
        title: 'Тип документации',
        dataIndex: 'Stage',

    },


    {
        title: 'Наименование',
        dataIndex: 'Name',


           },

    {
        title: 'Удалено',
        dataIndex: 'deleted',

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