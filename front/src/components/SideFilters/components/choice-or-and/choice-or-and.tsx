"use client"
import "./choice-or-and.css";
import { useState } from "react";
interface ChoiceOrAndProps {
    title:string,
    value?:'or'|'and',
    onChange?:any
}

export default function ChoiceOrAnd({title, value, onChange}:ChoiceOrAndProps) {

    //console.log('value');
    //console.log(value);

    const onMyComponentChange = (newValue:'or'|'and') => {
        setCheckValue(newValue);
        onChange(newValue);
    };

    const [checkedValue, setCheckValue]=useState<undefined|'or'|'and'>(value);

    return (
        <div className="choice-or-and">
            <div className="title">{title}</div>
            <div className='choice-or-and-container'>
                <div className="choice-box choice-and"
                     style={{
                         color: checkedValue == 'and' ? '#FFFFFF' : 'black',
                         background: checkedValue == 'and' ? '#6CACE4' : 'white'
                     }}
                     onClick={() => onMyComponentChange('and')}
                >и</div>
                <div className="choice-box choice-or"
                     style={{
                         color: checkedValue == 'or' ? '#FFFFFF' : 'black',
                         background: checkedValue == 'or' ? '#6CACE4' : 'white'
                     }}
                     onClick={() => onMyComponentChange('or')}
                >или</div>
            </div>
        </div>
    )
}

