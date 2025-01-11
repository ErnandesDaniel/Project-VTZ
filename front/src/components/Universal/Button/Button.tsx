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
    fontSize=16,
    backgroundColor,
    onClick,
    }:{
    title: any;
    type?:any;
    height?: number;
    htmlType?:any;
    className?:string;
    block?:boolean;
    size?:any;
    width?:number;
    fontSize?:number;
    backgroundColor?: string;
    onClick?:any;
    }) {
    return(<Button onClick={onClick} style={{width:`${width}px`, height: `${height}px`, fontSize: `${fontSize}px`,display:'block', backgroundColor: backgroundColor || "#025EA1",}} type={type} size={size} htmlType={htmlType} className={className} block={block}>{title}</Button>)
}

