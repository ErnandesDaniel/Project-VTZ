import { Checkbox, Flex } from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
export const columns = [

    {
        title: '№',
        dataIndex: 'VTZ_number',
    },

    {
        title: 'Вид ВТЗ',
        dataIndex: 'VTZ_type',
    },
    {
        title: 'Проектные институты',
        dataIndex: 'project_institutes',
        render: (institutes: any, record) => {
            return <Flex justify='left'>
                {institutes.map((institute, index)=> {

                    let color='#F3B937'

                   if(institute=='СТО'){

                       color='#C47AA4';

                   }else if(institute=='НПИ'){

                       color='#4DBFB1';
                   }else if(institute=='МПИ'){

                       color='#F7874F';

                   }

                        return (<p

                            style={{
                                marginLeft: '2px',
                                marginRight: '2px',
                                background: color,
                                padding: '8px',
                                borderRadius: '10px'
                            }}
                            key={`${record.VTZ_number}_${index}__${institute}`}


                        >{institute}</p>)

                    }

                )}
                </Flex>
            }

    },
    {
        title: 'Документация',
        dataIndex: 'documentation',

        render: (documentation: any, record) => (<Flex justify='center' vertical>
                {documentation.map((docs, index)=><p key={`${record.VTZ_number}_${index}__${docs}`}>{docs}</p>)}
            </Flex>)



    },

    {
        title: 'Удалено',
        dataIndex: 'deleted',
        render: (_: any, record) =>
            ( <Flex justify='center'>
            <Checkbox checked={true} />
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