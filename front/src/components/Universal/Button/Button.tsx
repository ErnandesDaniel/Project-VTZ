"use client"

import {Button} from "antd";

export default function FormButton({
    title,
    type="primary",
    htmlType,
    size,
    className,
    block,
    width=250,
    height=40,
    onClick,
    }:{
    title:string;
    type?:any;
    height?: number;
    htmlType?:any;
    className?:string;
    block?:boolean;
    width?:number;
    onClick?:any;
    }) {
    return(<Button onClick={onClick} style={{width:`${width}px`, height: `${height}px`, display:'block'}} type={type} size={size} htmlType={htmlType} className={className} block={block}>{title}</Button>)
}

