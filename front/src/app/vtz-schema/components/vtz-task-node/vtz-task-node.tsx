
import { Handle, Position } from '@xyflow/react';
import './vtz-task-node.css';
import { Flex } from 'antd';
import ConditionalRender from "@/components/Universal/ConditionalRender/ConditionalRender";

interface VtzNodeProps{
    projectInstitutes:string[];
    fullDisplay:boolean;
    vtzNumber:number;
    documentation:string[];
    vtzName:string;
    nodeType:'input'|'default'|'output';
}
import clsx from "clsx"


export default function VtzTaskNode({data}:VtzNodeProps) {

    const{
        projectInstitutes,
        fullDisplay,
        vtzNumber,
        documentation,
        vtzName,
        nodeType,
        isVisible
    }=data;

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
            <Flex className={clsx('content',{several_project_institutes:projectInstitutes.length>1})} gap={10} vertical>
                {projectInstitutes.map((projectInstitute, projectIndex)=>{
                    return (
                        <Flex className='vtz-description-block' key={projectIndex} gap={7} vertical>
                            <div className='project-institute' style={{background:projectInstituteBackgroundColors[projectInstitute]}}>{projectInstitute}</div>
                            <div className='vtz-number-and-name'>{`${vtzNumber}. ${vtzName}`}</div>
                            <ConditionalRender condition={fullDisplay}>
                                {
                                    documentation.map((documentationString, documentationIndex) => {
                                        return (<div className='documentation-element'
                                                     key={`${projectIndex}_${documentationIndex}`}>{documentationString}</div>);
                                    })
                                }
                            </ConditionalRender>
                        </Flex>
                    )
                })}
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






