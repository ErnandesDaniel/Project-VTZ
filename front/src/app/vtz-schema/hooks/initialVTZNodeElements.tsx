import {useVTZStore} from "@/store/store";
import {useMemo} from "react";
import VtzGatewayNode from "@/app/vtz-schema/components/vtz-gateway-node/vtz-gateway-node";


export default function useInitialVTZNodeElements(){

    const{vtzTaskList, vtzGatewaysList}= useVTZStore();

    const initialVtzNodesList=useMemo(()=>{

        const VtzTaskNodesList= vtzTaskList.map(({taskNumber, taskName, practices, sections, isVisible, id}, index)=>{
                if(isVisible){
                    return{
                        id: `${id}`,
                        type: 'VtzTaskNode',
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

        const VtzGatewayNodesList= vtzGatewaysList.map(({id}, index)=>{
            return{
                id: `${id}`,
                type: 'VtzGatewayNode',
                position: { x: 0, y: 0 }
            } ;
        });

        return [...VtzTaskNodesList, ...VtzGatewayNodesList];

        }
        ,[vtzTaskList]);

    // const initialVtzEdgesList=useMemo<{id:string; source:string;target:string}[]>(()=>vtzTaskList.flatMap(({successorRelations, id})=>{
    //         if(successorRelations.$values.length>0){
    //             return successorRelations.$values.map((successorRelation)=>{
    //                 return { id: `${id}_${successorRelation}`, source: `${id}`, target: `${successorRelation}`, };
    //             });
    //         }
    //         return [];
    //     })
    //
    //     ,[vtzTaskList]);



    const initialVtzEdgesList=useMemo<{id:string; source:string;target:string}[]>(()=>vtzGatewaysList.flatMap(({predecessorIds, id, successorIds})=>{
        const predecessorEdges=predecessorIds.map((predecessorId)=>{

            return { id: `${id}_${predecessorId}`, source: `${predecessorId}`, target: `${id}`, };
        });

        const successorEdges=successorIds.map((successorId)=>{

        return { id: `${id}_${successorId}`, source: `${id}`, target: `${successorId}`, };
    });

        // if(successorRelations.$values.length>0){
        //         return successorRelations.$values.map((successorRelation)=>{
        //             return { id: `${id}_${successorRelation}`, source: `${id}`, target: `${successorRelation}`, };
        //         });
        //     }
        //     return [];

        return [...predecessorEdges, ...successorEdges]

    })

        ,[vtzTaskList]);


    return {initialVtzNodesList, initialVtzEdgesList}
}







