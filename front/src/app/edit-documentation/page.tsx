"use client"
import Spacer from "@/components/Universal/Spacer/Spacer";
import Page from "@/components/Page/Page";
import Text from "@/components/Universal/Text/Text";
import './edit-documentation.css';
import { Input } from 'antd';
import Button from "@/components/Universal/Button/Button";
import CheckBoxButton from "@/app/edit-documentation/components/check-box-button";

export default function edit_documentation() {

    const typeDocumentation = ['ПД', 'РД', 'Анализы', 'ВАБ-1'];

    return (
        <Page className='edit-documentation-page'>
            <Spacer space={22} />
            <Text className='title'>Редактирование документации</Text>
            <Spacer space={40} />

            <div className="form-container">
                {/* Вид документации */}
                <div className="form-group">
                    <Text className='label'>Вид документации</Text>
                    <div className="checkbox-group">
                        {typeDocumentation.map((text) => (
                            <CheckBoxButton key={text} text={text} />
                        ))}
                    </div>
                </div>

                {/* Наименование */}
                <div className="form-group">
                    <Text className='label'>Наименование</Text>
                    <Input
                        className='input-text'
                        placeholder='Введите наименование документа'
                    />
                </div>

                {/* Описание */}
                <div className="form-group">
                    <Text className='label'>Описание</Text>
                    <Input.TextArea
                        className='textarea'
                        placeholder='Описание документа'
                        rows={4}
                    />
                </div>
            </div>

            <Spacer space={25} />
            <div className="button-container">
                <Button title='Сохранить' width={150} height={35}/>
            </div>
        </Page>
    );

}