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
    height=35,
    backgroundColor,
    onClick,
    }:{
    title:string;
    type?:any;
    height?: number;
    htmlType?:any;
    className?:string;
    block?:boolean;
    width?:number;
    backgroundColor?: string;
    onClick?:any;
    }) {
    return(<Button onClick={onClick} style={{width:`${width}px`, height: `${height}px`, display:'block', backgroundColor: backgroundColor || "#025EA1",}} type={type} size={size} htmlType={htmlType} className={className} block={block}>{title}</Button>)
}

