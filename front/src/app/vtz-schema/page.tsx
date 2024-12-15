"use client"
import Page from "@/components/Page/Page";
import './vtz-schema.css';

import '@xyflow/react/dist/style.css';

import { Radio } from 'antd';

const {Group:RadioGroup}=Radio;

import {
    ReactFlow,
    Controls
} from '@xyflow/react';
import VtzNode from "@/app/vtz-schema/components/vtz-node/vtz-node";
import Spacer from "@/components/Universal/Spacer/Spacer";
import {useCallback, useEffect, useState} from "react";

import useInitialElements from "@/app/vtz-schema/hooks/initialElements";

const nodeTypes = {
    VtzNode: VtzNode,
};


import ELK from 'elkjs/lib/elk.bundled.js';



export default function VtzSchema() {

    const {initialVtzNodesList, initialVtzEdgesList}=useInitialElements();

    const [fullDisplay, setFullDisplay]=useState<boolean>(true);

    const fullDisplayOnChange=useCallback((event)=>{
        setFullDisplay(event.target.value=='show');
    },[setFullDisplay]);

    const fullDisplayOptions = [
        { label: 'Полный режим', value: 'show' },
        { label: 'Сжатый режим', value: 'unshow' },
    ];



    const elk = new ELK();

    const getLayoutedElements = useCallback((nodes, edges) => {

        const elkOptions = {
            'elk.algorithm': 'layered',
            'elk.layered.spacing.nodeNodeBetweenLayers': '100',
            'elk.spacing.nodeNode': '80',
            'elk.direction':'DOWN',
        };

        const nodeWidth = 200;
        const nodeHeight = 100;
        const graph = {
            id: 'root',
            layoutOptions: elkOptions,
            children: nodes.map((node) => ({
                ...node,
                width: nodeWidth,
                height: nodeHeight,
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
            .catch(console.error);
    },[]);

    const [layoutedNodes, setLayoutedNodes]=useState([]);

    const [layoutedEdges, setLayoutedEdges]=useState([]);

    useEffect(()=>{

        getLayoutedElements(
            initialVtzNodesList,
            initialVtzEdgesList
        ).then((res)=>{
            console.log(res);
            const{nodes, edges}=res;
            setLayoutedNodes(nodes);
            setLayoutedEdges(edges);
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