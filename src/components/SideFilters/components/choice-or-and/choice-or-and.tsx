"use client"
import "./choice-or-and.css";
import { useState } from "react";

export default function ChoiceOrAnd({title}:{title:string}) {

    const [checkedValue, setCheckValue]=useState<undefined|'or'|'and'>();

    return (
        <div className="choice-or-and">
            <div className="title">{title}</div>
            <div className='choice-or-and-container'>
                <div className="choice-box choice-and"

                    style={{
                        color:checkedValue=='or'? '#FFFFFF':'black',
                        background:checkedValue=='or'? '#6CACE4':'white'
                    }}

                     onClick={()=>setCheckValue('or')}

                >и</div>
                <div className="choice-box choice-or"

                     style={{
                         color:checkedValue=='and'? '#FFFFFF':'black',
                         background:checkedValue=='and'? '#6CACE4':'white'
                     }}


                     onClick={()=>setCheckValue('and')}



                >или</div>
            </div>

        </div>
    )
}

