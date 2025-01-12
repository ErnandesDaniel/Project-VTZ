import { Handle, Position } from '@xyflow/react';
import './vtz-task-node.css';
import { Flex } from 'antd';
import ConditionalRender from "@/components/Universal/ConditionalRender/ConditionalRender";
import { NodeProps, Node } from '@xyflow/react';
type VtzNodeProps = Node<
    {
        projectInstitutes:('СПбПИ'| 'СТО'| 'НПИ'| 'МПИ')[];
        vtzNumber:number;
        documentation:string[];
        vtzName:string;
        nodeType:'input'|'default'|'output';
        isVisible?:boolean;
        isDeleted:boolean;
    }
>;

import clsx from "clsx"

export default function VtzTaskNode(props: NodeProps<VtzNodeProps>) {

    const{
        projectInstitutes,
        vtzNumber,
        documentation,
        vtzName,
        nodeType,
        isVisible,
        isDeleted
    }=props.data;

    const projectInstituteBackgroundColors={
        'СПбПИ':'#F3B937',
        'СТО':'#C47AA4',
        'НПИ':'#4DBFB1',
        'МПИ':'#F7874F',
    }

    return(
        <div className={clsx('vtz-node', {isVisible: !isVisible})}>
            <ConditionalRender condition={nodeType== 'default' || nodeType== 'output'}>
                <Handle
                    type="target"
                    position={Position.Left}
                />
            </ConditionalRender>
            <Flex className='content' vertical gap={7}>
                isVisible:{String(isVisible)}
                <Flex className='project-institutes-block'>
                    {projectInstitutes.map((projectInstitute, projectIndex,projectInstituteArray )=> {
                        return (<div className={clsx('project-institute', {several_project_institutes:projectInstitutes.length>1})} key={projectIndex} style={{background: projectInstituteBackgroundColors[projectInstitute]}}>{projectInstitute}</div>)
                    })}
                </Flex>
                <div className='vtz-number-and-name'>{`${vtzNumber}. ${vtzName}`}</div>
                    <div className={clsx('documentation_elements_block', 'nowheel')}>
                        {
                        documentation.map((documentationString, documentationIndex) => {
                            return (<div className='documentation-element' key={`${documentationIndex}`}>{documentationString}</div>);
                        })
                    }
                    </div>
            </Flex>
            <ConditionalRender condition={nodeType== 'default' || nodeType== 'input'}>
                <Handle
                    type="source"
                    position={Position.Right}
                />
            </ConditionalRender>
        </div>
    );
}






