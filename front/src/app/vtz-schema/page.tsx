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
import {useCallback, useMemo, useState} from "react";

import dagre from '@dagrejs/dagre';
import useInitialElements from "@/app/vtz-schema/hooks/initialElements";

const nodeTypes = {
    VtzNode: VtzNode,
};

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




    const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    const nodeWidth = 150;
    const nodeHeight = 300;


    const getLayoutedElements = (nodes, edges) => {
        const isHorizontal = true;
        dagreGraph.setGraph({ rankdir: 'LR' });

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        const newNodes = nodes.map((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            return {
                ...node,
                position: {
                    x: nodeWithPosition.x - nodeWidth / 2,
                    y: nodeWithPosition.y - nodeHeight / 2,
                },
            };
        });

        return { nodes: newNodes, edges };
    };

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialVtzNodesList,
        initialVtzEdgesList,
    );

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
            style={{ backgroundColor: "#F7F9FB" }}
        >
            <Controls />
        </ReactFlow>


            </div>
    </Page>);
}