import type {ReactNode} from "react";
import "./Page.css";
import clsx from 'clsx';
interface PageProps {
    children: ReactNode;
    className?:string;
}
const Page=({children, className}:PageProps)=>{
    return(<div className={clsx(className, 'page')}>
        {children}
    </div>)
}

export default Page;