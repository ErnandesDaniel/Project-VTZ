"use client"
import Page from "@/components/Page/Page";
import './vtz-schema.css';
import '@xyflow/react/dist/style.css';
import {Radio} from 'antd';
import {Controls, ReactFlow} from '@xyflow/react';
import VtzTaskNode from "@/app/vtz-schema/components/vtz-task-node/vtz-task-node";
import Spacer from "@/components/Universal/Spacer/Spacer";
import {useCallback, useEffect, useState} from "react";

import useInitialVTZNodeElements from "@/app/vtz-schema/hooks/initialVTZNodeElements";
import ELK from 'elkjs/lib/elk.bundled.js';
import VtzGatewayNode from "@/app/vtz-schema/components/vtz-gateway-node/vtz-gateway-node";
import VtzEdge from "@/app/vtz-schema/components/vtz-edge/vtz-edge";
import {useVTZSchemaStore} from "@/app/vtz-schema/store/store";
const {Group:RadioGroup}=Radio;

const nodeTypes = {
    VtzTaskNode: VtzTaskNode,
    VtzGatewayNode:VtzGatewayNode,
};

const edgeTypes={
    VtzEdge:VtzEdge,
}

const defaultViewport = { x: 0, y: 0, zoom: 0.1 };
const minZoom=0.01
const maxZoom=3

export default function VtzSchema() {

    const {setSelectedEdgeId}=useVTZSchemaStore();
    const {initialVtzNodesList, initialVtzEdgesList}=useInitialVTZNodeElements();
    
    useEffect(() => {
        const keyDownHandler = (event:any) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setSelectedEdgeId(undefined);
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [setSelectedEdgeId]);

    // const [fullDisplay, setFullDisplay]=useState<boolean>(true);
    //
    // const fullDisplayOnChange=useCallback((event)=>{
    //     setFullDisplay(event.target.value=='show');
    // },[setFullDisplay]);

    const fullDisplayOptions = [
        { label: 'Полный режим', value: 'show' },
        { label: 'Сжатый режим', value: 'unshow' },
    ];

    const getLayoutedElements = useCallback(async (nodes:any, edges:any) => {
        const elk = new ELK();
        const elkOptions = {
            'elk.algorithm': 'layered',
            'elk.layered.spacing.nodeNodeBetweenLayers': '100',
            'elk.spacing.nodeNode': '80',
            'elk.direction':'RIGHT',
        };

        const graph = {
            id: 'root',
            layoutOptions: elkOptions,
            children: nodes.map((node:any) => ({
                    ...node,
                    width: node.type==='VtzGatewayNode'? 50 : 200,
                    height: node.type==='VtzGatewayNode'? 50 : 200,
                })),
            edges: edges,
        };

        return elk
            .layout(graph)
            .then((layoutedGraph) => ({
                nodes: layoutedGraph.children?.map((node:any) => ({
                    data:node.data,
                    id:node.id,
                    type:node.type,
                    position: { x: node.x, y: node.y },
                })),
                edges: layoutedGraph.edges,
            }))
            .catch((e)=>console.log(e));
    },[]);

    const [layoutedNodes, setLayoutedNodes]=useState<any>([]);

    const [layoutedEdges, setLayoutedEdges]=useState<any>([]);

    useEffect(()=>{

        getLayoutedElements(
            initialVtzNodesList,
            initialVtzEdgesList
        ).then((res)=>{
            if(res!=undefined){
                console.log(res);
                const{nodes, edges}=res;
                console.log('nodes');
                console.log(nodes);
                setLayoutedNodes(nodes);
                setLayoutedEdges(edges);
            }
        });

    },[
        setLayoutedNodes,
        setLayoutedEdges,
        getLayoutedElements,
        initialVtzNodesList,
        initialVtzEdgesList
    ]);


    // const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    //     initialVtzNodesList,
    //     initialVtzEdgesList,
    //     elkOptions
    // );


    return(<Page className='vtz-schema-page'>

        <Spacer space={20} />

        {/*<RadioGroup*/}
        {/*    className='radio-group'*/}
        {/*    block*/}
        {/*    options={fullDisplayOptions}*/}
        {/*    defaultValue="show"*/}
        {/*    optionType="button"*/}
        {/*    buttonStyle="solid"*/}
        {/*    onChange={fullDisplayOnChange}*/}
        {/*/>*/}

        <Spacer space={20} />

        <div className='react_flow_container'>

        <ReactFlow
            nodes={layoutedNodes}
            edges={layoutedEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            //panOnScroll
            selectionOnDrag
            style={{ backgroundColor: "#F7F9FB" }}
            defaultViewport={defaultViewport}
            minZoom={minZoom}
            maxZoom={maxZoom}
            onEdgeClick={(_, edge)=>{
                setSelectedEdgeId(edge.id);
            }}
        >
            <Controls />
        </ReactFlow>


            </div>
    </Page>);
}