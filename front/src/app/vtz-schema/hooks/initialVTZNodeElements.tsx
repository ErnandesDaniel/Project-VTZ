import { useVTZStore } from "@/store/store";
import { useMemo } from "react";

export default function useInitialVTZNodeElements(){

    const{vtzGatewaysList, vtzTaskRelations, filteredVTZ}= useVTZStore();

    //Загруженный с бэка список ребер графа
    const initialVtzEdgesList:any=useMemo<{id:string; source:string; target:string}[]>(()=> {

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
    } ,[vtzTaskRelations]);

    //Загруженный с бэка отфильтрованный список вершин графа (ВТЗ и шлюзы)
    let initialVtzNodesList=useMemo(()=>{

        const VtzTaskNodesList:any= filteredVTZ.map(({
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
            }
        );

        const VtzGatewayNodesList= vtzGatewaysList.map(({id}, index)=>{
            return{
                id: `${id}`,
                type: 'VtzGatewayNode',
                position: { x: 0, y: 0 }
            } ;
        });

        return [...VtzTaskNodesList, ...VtzGatewayNodesList];

    } ,[filteredVTZ, vtzGatewaysList]);

    //Список шлюзов
    const gatewayEdgesList=useMemo(()=>{

        return initialVtzNodesList.map((vtz) => {

            if (vtz.type == 'VtzTaskNode' && vtz.data.isVisible == false) {

                //Находим первого предшественника Gateway
                const relationWithFirstPredecessor = vtzTaskRelations.find(({predecessorTaskId}) => predecessorTaskId == vtz.id);

                //Находим первого последователя
                const relationWithFirstSuccessor = vtzTaskRelations.find(({successorTaskId}) => successorTaskId == vtz.id);

                //Если существуют последователь и предшественник Gateway
                if (relationWithFirstPredecessor != null && relationWithFirstSuccessor != null) {

                    //Ищем в массиве связь между последователем и предшественником

                    //Если связь не находим, то создаем новую и добавляем в массив связей связь между gateways

                    const predecessorGatewayId = relationWithFirstPredecessor.gatewayId;

                    const successorGatewayId = relationWithFirstSuccessor.gatewayId;

                    if (predecessorGatewayId != null && successorGatewayId != null) {
                        return {
                            id: `${vtz.id}_${predecessorGatewayId}_${successorGatewayId}`,
                            source: `${predecessorGatewayId}`,
                            target: `${successorGatewayId}`,
                            type: 'VtzEdge',
                            animated: true,
                        }
                    }
                }

                return null;
            } else {
                return null;
            }
        }).filter((edge) => edge != null)
        
    },[initialVtzNodesList, vtzTaskRelations]);

    //Список отфильтрованных ребер ВТЗ
    let filteredVtzNodesList= useMemo(()=> initialVtzNodesList.map((vtz) => {

            if (!(vtz.type == 'VtzTaskNode' && vtz.data.isVisible == false)) {
                return vtz;
            } else {
                return null;
            }
    }).filter((vtz) => vtz != null) ,[initialVtzNodesList]);

    //Удаляем все связи, у которых нет ВТЗ на одном из концов
    const filteredVtzEdgesList=useMemo(()=>initialVtzEdgesList.map((edge:any) => {

        if(
            filteredVtzNodesList.find((node)=>node.id==edge.source)!=null &&
            filteredVtzNodesList.find((node)=>node.id==edge.target)!=null
        ){
            return edge;
        }else{
            return null;
        }
    }).filter((edge:any) => edge != null),[initialVtzEdgesList, filteredVtzNodesList]);

    //Удаляем Node шлюзы, что они связаны только с другими gateway

    // console.log('gatewayEdgesList', gatewayEdgesList);
    // console.log('filteredVtzNodesList', filteredVtzNodesList);
    // console.log('filteredVtzEdgesList', filteredVtzEdgesList);
    // console.log('initialVtzNodesList', initialVtzNodesList);
    // console.log('initialVtzEdgesList', initialVtzEdgesList);

    const {returnedVtzNodesList, returnedVtzEdgesList}=useMemo(()=>{
        return{
            returnedVtzNodesList:filteredVtzNodesList,
            returnedVtzEdgesList:[...filteredVtzEdgesList,...gatewayEdgesList]
        }
    },[filteredVtzEdgesList, filteredVtzNodesList, gatewayEdgesList]);

    return {
        initialVtzNodesList: returnedVtzNodesList,

        initialVtzEdgesList: returnedVtzEdgesList
    }
}







