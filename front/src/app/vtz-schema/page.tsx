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

const {Group:RadioGroup}=Radio;

const nodeTypes = {
    VtzTaskNode: VtzTaskNode,
    VtzGatewayNode:VtzGatewayNode,
};

export default function VtzSchema() {

    const {initialVtzNodesList, initialVtzEdgesList}=useInitialVTZNodeElements();

    const [fullDisplay, setFullDisplay]=useState<boolean>(true);

    const fullDisplayOnChange=useCallback((event)=>{
        setFullDisplay(event.target.value=='show');
    },[setFullDisplay]);

    const fullDisplayOptions = [
        { label: 'Полный режим', value: 'show' },
        { label: 'Сжатый режим', value: 'unshow' },
    ];

    const getLayoutedElements = useCallback((nodes, edges) => {
        const elk = new ELK();
        const elkOptions = {
            'elk.algorithm': 'layered',
            'elk.layered.spacing.nodeNodeBetweenLayers': '100',
            'elk.spacing.nodeNode': '80',
            'elk.direction':'LEFT',
        };

        const graph = {
            id: 'root',
            layoutOptions: elkOptions,
            children: nodes.map((node) => ({
                    ...node,
                    width: node.type==='VtzGatewayNode'? 50 : 500,
                    height: node.type==='VtzGatewayNode'? 50 : node.data.projectInstitutes.length*300,
                })),
            edges: edges,
        };
        return elk
            .layout(graph)
            .then((layoutedGraph) => ({
                nodes: layoutedGraph.children?.map((node) => ({
                    data:node.data,
                    id:node.id,
                    type:node.type,
                    position: { x: node.x, y: node.y },
                })),
                edges: layoutedGraph.edges,
            }))
            .catch((e)=>console.log(e));
    },[]);

    const [layoutedNodes, setLayoutedNodes]=useState([]);

    const [layoutedEdges, setLayoutedEdges]=useState([]);

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

        <RadioGroup
            className='radio-group'
            block
            options={fullDisplayOptions}
            defaultValue="show"
            optionType="button"
            buttonStyle="solid"
            onChange={fullDisplayOnChange}
        />

        <Spacer space={20} />

        <div className='react_flow_container'>

        <ReactFlow
            nodes={layoutedNodes}
            edges={layoutedEdges}
            nodeTypes={nodeTypes}
            fitView
            style={{ backgroundColor: "#F7F9FB" }}
        >
            <Controls />
        </ReactFlow>


            </div>
    </Page>);
}