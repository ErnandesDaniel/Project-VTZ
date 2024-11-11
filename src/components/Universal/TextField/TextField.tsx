"use client"
import {Input, Form } from "antd";
import Password from "antd/es/input/Password";
import {memo, useMemo} from "react";
const {Item} =Form;

interface TextFieldProps {
    isError:boolean,
    isPassword?:boolean;
    errorText:string,
    isRequired:boolean,
    label:string,
    name:string
}

const  TextField=({

    isError=false,
    errorText,
    isPassword=false,
    isRequired=true,
    label,
    name,}:TextFieldProps)=>{

    const { rules }=useMemo(()=>({
            rules: [{
                required: isRequired,
                message: errorText,
                type: 'string',
                validator: (_, value) => isError || (isRequired && !value) ?
                    Promise.reject(new Error(errorText)) :
                    Promise.resolve()
            }]

        }),[isError, errorText, isRequired])

    return(
        <Item
            label={label}
            name={name}
            rules={rules}
        >
            {isPassword? <Password size="large" />:<Input size="large" />}
        </Item>
    )
}

export default memo(TextField);

