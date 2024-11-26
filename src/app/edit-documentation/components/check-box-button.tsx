import './check-box-button.css'
import { useCallback, useState } from "react";
import clsx from "clsx";

export default function CheckBoxButton({text}:{text:string}){
    
    const [checked, setChecked]=useState<boolean>(false);
    
    const changeStateHandler=useCallback(()=>{
        setChecked(!checked);
    },[checked, setChecked]);

    return(<div
        className={clsx('check-box-button', {active:checked})}
        onClick={changeStateHandler}
    >{text}</div>)
}