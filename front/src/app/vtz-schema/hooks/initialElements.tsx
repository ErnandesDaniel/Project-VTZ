import {useVTZStore} from "@/store/store";
import {useMemo} from "react";


export default function useInitialElements(){

    const{vtzList}= useVTZStore();

    const initialVtzNodesList=useMemo(()=>{
            return vtzList.map(({taskNumber, taskName, practices, sections, isVisible, id}, index)=>{
                if(isVisible){
                    return{
                        id: `${id}`,
                        type: 'VtzNode',
                        data: {
                            projectInstitutes: practices.$values.map(({practiceShortName}) => practiceShortName),
                            fullDisplay: true,
                            vtzNumber:taskNumber,
                            documentation: sections.$values.map(({sectionName}) => sectionName),
                            vtzName: taskName,
                            //nodeType: 'input'
                            nodeType: 'default'

                        },

                        //position: { x: Math.floor(Math.random() * 20000), y: Math.floor(Math.random() * 1000) }
                        //position: { x: 400*index, y: 300 }
                        position: { x: 0, y: 0 }
                    } ;
                }

            }).filter((el, index)=>el!=null);
        }
        ,[vtzList]);

    const initialVtzEdgesList=useMemo<{id:string; source:string;target:string}[]>(()=>vtzList.flatMap(({successorRelations, id})=>{
            if(successorRelations.$values.length>0){
                return successorRelations.$values.map((successorRelation)=>{
                    return { id: `${id}_${successorRelation}`, source: `${id}`, target: `${successorRelation}`, };
                });
            }
            return [];
        })

        ,[vtzList]);

    return {initialVtzNodesList, initialVtzEdgesList}
}







