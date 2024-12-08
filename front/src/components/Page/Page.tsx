"use client"
import type {ReactNode} from "react";
import "./Page.css";
import clsx from 'clsx';
import {useVTZStore} from "@/store/store";
import {useEffect} from "react";
interface PageProps {
    children: ReactNode;
    className?:string;
}
const Page=({children, className}:PageProps)=>{

    const{loadVTZ}= useVTZStore();
    
    useEffect(()=>{
        loadVTZ();
    },[loadVTZ]);

    return(<div className={clsx(className, 'page')}>
        {children}
    </div>)
}

export default Page;