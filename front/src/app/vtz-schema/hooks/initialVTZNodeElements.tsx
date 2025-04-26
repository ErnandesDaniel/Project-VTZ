import { useVTZStore } from "@/store/store";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
    filterAndRewireGraphJS,
    removeDuplicateEdges, unshowUnusedGatewayNodes,
} from "@/app/vtz-schema/hooks/FilterGraph";
import {isNil} from "lodash-es";

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
    const initialVtzNodesList=useMemo(()=>{

        //Преобразуем список Node ВТЗ в удобный формат
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

        //Преобразуем список Node шлюзов в удобный формат
        let VtzGatewayNodesList= vtzGatewaysList.map(({id}, index)=>{
            return{
                id: `${id}`,
                type: 'VtzGatewayNode',
                position: { x: 0, y: 0 },
                data:{
                    isVisible:true,
                }
            } ;
        });

        if(initialVtzEdgesList.length>0 && VtzGatewayNodesList.length>0){

            //Преобразуем список edges в формат для расчета видимости шлюзов
            const edges=initialVtzEdgesList.map(({source, target}:any)=>[source, target]);

            console.log('VtzGatewayNodesList before check isVisible', VtzGatewayNodesList);

            //Получаем преобразованный список шлюзов с учетом их видимости за счет сравнения связанности шлюза
            //с Node ВТЗ
            VtzGatewayNodesList=unshowUnusedGatewayNodes({nodes:[...VtzGatewayNodesList, ...VtzTaskNodesList], edges:edges});

            VtzGatewayNodesList=VtzGatewayNodesList.filter((el)=>el.type=='VtzGatewayNode');

            console.log('VtzGatewayNodesList after check isVisible', VtzGatewayNodesList);
        }

        return [...VtzTaskNodesList, ...VtzGatewayNodesList];

    } ,[filteredVTZ, vtzGatewaysList, initialVtzEdgesList]);

    //Список отфильтрованных ВТЗ и шлюзов
    const filteredVtzNodesList= useMemo(()=> initialVtzNodesList.map((node) => {
            if ((node.data.isVisible == false)) {
                return null;
            } else {
                return node;
            }
    }).filter((node) => node != null),[initialVtzNodesList]);

    console.log('initialVtzNodesList', initialVtzNodesList);
    console.log('filteredVtzNodesList', filteredVtzNodesList);

    //Список отфильтрованных связей
    const filteredVtzEdgesList:any=useMemo(()=>{

        if(initialVtzNodesList.length>0 && initialVtzEdgesList.length>0){

            const edgesToFilter=initialVtzEdgesList.map(({source, target}:any)=>[source, target]);
            const nodesToFilter=initialVtzNodesList.map((el:any)=>({id:el?.id, isShow:el?.data?.isVisible}));

            //console.log('edgesToFilter', edgesToFilter);
            //console.log('nodesToFilter', nodesToFilter);

            const edgesToFilterWithoutDuplicates=removeDuplicateEdges(edgesToFilter);

            console.log('edgesToFilterWithoutDuplicates', edgesToFilterWithoutDuplicates);

            let newEdges:any=[];

            if(isNil(globalThis.filterAndRewireGraph)){
                newEdges=filterAndRewireGraphJS(edgesToFilterWithoutDuplicates,nodesToFilter);
                console.log('newEdges after filterAndRewireGraph on JS-processing', newEdges);
            }else{
                const testJSEdges=filterAndRewireGraphJS(edgesToFilterWithoutDuplicates,nodesToFilter);
                console.log('testJSEdges after filterAndRewireGraph on JS-processing', testJSEdges);

                console.log('Запуск функции на Go');
                newEdges=JSON.parse(globalThis.filterAndRewireGraph(JSON.stringify(edgesToFilterWithoutDuplicates), JSON.stringify(nodesToFilter)));
                console.log('newEdges after filterAndRewireGraph on Go-processing', newEdges);
            }

            console.log('newEdges after filterAndRewireGraph and before removeDuplicateEdges', newEdges);

            newEdges=removeDuplicateEdges(newEdges);

            console.log('newEdges after removeDuplicateEdges', newEdges);

            return newEdges.map(([source, target]:any)=>{
                return{
                    id: `${source}_${target}`,
                    source: source,
                    target: target,
                    type: 'VtzEdge',
                    animated: true,
                }
            });
        }

        return initialVtzEdgesList;

    },[initialVtzEdgesList, initialVtzNodesList]);

    console.log('initialVtzEdgesList', initialVtzEdgesList);
    console.log('filteredVtzEdgesList', filteredVtzEdgesList);

    const clearFilteredVtzEdgesList=useMemo(()=>filteredVtzEdgesList.filter(({source, target}:any)=>{
        const sourceNode= filteredVtzNodesList.find(({id})=>id === source);
        const targetNode=filteredVtzNodesList.find(({id})=>id === target);
        return !!sourceNode && !!targetNode;
    }),[filteredVtzEdgesList, filteredVtzNodesList]);

    const {returnedVtzEdgesList, returnedVtzNodesList}=useMemo(()=>{
        return{
            returnedVtzEdgesList:clearFilteredVtzEdgesList,
            returnedVtzNodesList:filteredVtzNodesList
        }

    },[clearFilteredVtzEdgesList, filteredVtzNodesList]);

    return {
        initialVtzNodesList:returnedVtzNodesList,
        initialVtzEdgesList:returnedVtzEdgesList
    }
}