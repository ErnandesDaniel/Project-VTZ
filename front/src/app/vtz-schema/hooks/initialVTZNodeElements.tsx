import {useVTZStore} from "@/store/store";
import {useMemo} from "react";

export default function useInitialVTZNodeElements(){

    const{vtzTaskList, vtzGatewaysList}= useVTZStore();

    const initialVtzNodesList=useMemo(()=>{

        const VtzTaskNodesList= vtzTaskList.map(({taskNumber, taskName, practices, sections, isVisible, id}:any, index)=>{
                if(isVisible){
                    return{
                        id: `${id}`,
                        type: 'VtzTaskNode',
                        data: {
                            projectInstitutes: practices.$values.map(({practiceShortName}:any) => practiceShortName),
                            fullDisplay: true,
                            vtzNumber:taskNumber,
                            isVisible:isVisible,
                            documentation: sections.$values.map(({sectionName}:any) => sectionName),
                            vtzName: taskName,
                            nodeType: 'default'

                        },
                        position: { x: 0, y: 0 }
                    } ;
                }

            }).filter((el, index)=>el!=null);

        const VtzGatewayNodesList= vtzGatewaysList.map(({id}, index)=>{
            return{
                id: `${id}`,
                type: 'VtzGatewayNode',
                position: { x: 0, y: 0 }
            } ;
        });

        return [...VtzTaskNodesList, ...VtzGatewayNodesList];

        }
        ,[vtzGatewaysList, vtzTaskList]);

    const initialVtzEdgesList=useMemo<{id:string; source:string; target:string}[]>(()=>vtzGatewaysList.flatMap(({predecessorIds, id, successorIds}:any)=>{

        const predecessorEdges=predecessorIds.map((predecessorId:any)=>{
            return {
                id: `${id}_${predecessorId}`,
                source: `${predecessorId}`,
                target: `${id}`,
                type: 'VtzEdge',
                animated: true,
            };
        });

        const successorEdges=successorIds.map((successorId:any)=>{
            return {
                id: `${id}_${successorId}`,
                source: `${id}`,
                target: `${successorId}`,
                type:'VtzEdge',
                animated: true,
            };
        });

        return [...predecessorEdges, ...successorEdges]

    })

        ,[vtzGatewaysList]);


    return {initialVtzNodesList, initialVtzEdgesList}
}







