import { Handle, Position } from '@xyflow/react';
import './vtz-gateway-node.css';

export default function VtzGatewayNode() {

    return(
        <div className='vtz-gateway'>
                <Handle
                    type="target"
                    position={Position.Left}
                />
                <Handle
                    type="source"
                    position={Position.Right}
                />
        </div>
    );
}