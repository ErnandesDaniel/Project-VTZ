import {BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, Position} from '@xyflow/react';
import './vtz-edge.css';
import {useVTZSchemaStore} from "@/app/vtz-schema/store/store";
import {useEffect} from "react";


export default function VtzEdge({id, sourceX, sourceY, targetX, targetY, selected}: EdgeProps) {

    const { selectedEdgeId }=useVTZSchemaStore();
    const strokeWidth=selectedEdgeId==id? 5:1;
    const strokeColor=selectedEdgeId==id? 'red':'gray';
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        borderRadius:100,
    });

    return (
        <>
        <BaseEdge path={edgePath} id={id}

            style={{
            stroke:strokeColor,
            strokeWidth:strokeWidth }} />
        </>);
}

// <div className={clsx('vtz-edge')}>
//
//
// </div>
//




