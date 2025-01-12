import {useVTZStore} from "@/store/store";
import {useMemo} from "react";

export default function useInitialVTZNodeElements(){

    const{vtzGatewaysList, vtzTaskRelations, filteredVTZ}= useVTZStore();

    const initialVtzNodesList=useMemo(()=>{

        const VtzTaskNodesList= filteredVTZ.map(({
            key,
            VTZ_number,
            VTZ_type,
            isDeleted,
            project_institutes,
            documentation,
            isVisible}:any)=>{
                return {
                    id: `${key}`,
                    type: 'VtzTaskNode',
                    data: {
                        projectInstitutes: project_institutes,
                        vtzNumber:VTZ_number,
                        isVisible:isVisible,
                        documentation: documentation,
                        vtzName: VTZ_type,
                        nodeType: 'default',
                        isDeleted:isDeleted,
                    },
                    position: { x: 0, y: 0 }
                };
        });


        const VtzGatewayNodesList= vtzGatewaysList.map(({id}, index)=>{
            return{
                id: `${id}`,
                type: 'VtzGatewayNode',
                position: { x: 0, y: 0 }
            } ;
        });

        return [...VtzTaskNodesList, ...VtzGatewayNodesList];

        }
        ,[filteredVTZ, vtzGatewaysList]);

    const initialVtzEdgesList=useMemo<{id:string; source:string; target:string}[]>(()=> {

            return vtzTaskRelations.flatMap(({id, predecessorTaskId, successorTaskId, gatewayId})=>{
                
               if(gatewayId!=null){
                   return [
                       {
                        id: `${id}_${predecessorTaskId}_${gatewayId}`,
                        source: `${predecessorTaskId}`,
                        target: `${gatewayId}`,
                        type: 'VtzEdge',
                        animated: true,
                       },
    
                       {
                        id: `${id}_${gatewayId}_${successorTaskId}`,
                        source: `${gatewayId}`,
                        target: `${successorTaskId}`,
                        type: 'VtzEdge',
                        animated: true,
                       },
                   ];
                   
               }else{
                   return [{
                       id: `${id}_${predecessorTaskId}_${successorTaskId}`,
                       source: `${predecessorTaskId}`,
                       target: `${successorTaskId}`,
                       type: 'VtzEdge',
                       animated: true,
                   }];
               }
            });
        }

        ,[vtzTaskRelations]);


    return {initialVtzNodesList, initialVtzEdgesList}
}







