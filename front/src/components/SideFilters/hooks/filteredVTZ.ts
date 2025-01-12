import {useVTZStore} from "@/store/store";
import {useCallback, useMemo} from "react";

interface filteredVTZProps {
    checkedInstitutes?: string[];
    checkedInstitutesOrAnd: 'or' | 'and';
    checkedDocumentationType?: string[];
    checkedDocumentationTypeOrAnd: 'or' | 'and';
    checkedDocumentation?: string[];
    checkedDocumentationOrAnd: 'or' | 'and';
    checkedVTZ?: string[];
}

export function useFilteredVTZ(){

    const{vtzTaskList, setFilteredVTZ}= useVTZStore();
    
    const vtzTableList=useMemo(()=>
            vtzTaskList.map(({taskNumber, taskName, practices, sections, id, isDeleted}:any)=>{
                return{
                    key: id,
                    VTZ_number:taskNumber,
                    VTZ_type:taskName,
                    isDeleted:false,
                    project_institutes:practices.$values.map(({practiceShortName}:any)=>practiceShortName),
                    documentation: sections.$values.map(({sectionName}:any)=>sectionName),
                    isVisible:true,
                }
            }),[vtzTaskList]);
    
    const setFilteredVTZStoreData=useCallback(({
        checkedInstitutes,
        checkedInstitutesOrAnd,
        checkedDocumentationType,
        checkedDocumentationTypeOrAnd,
        checkedDocumentation,
        checkedDocumentationOrAnd,
        checkedVTZ}:filteredVTZProps)=>{
        
        // Фильтрация данных на основе выбранных фильтров
        let tabVTZ=vtzTableList;

        if(checkedInstitutes?.length>0){
            if(checkedInstitutesOrAnd=='and'){
                tabVTZ=tabVTZ.map((vtzItem)=>{
                        const { project_institutes }:{project_institutes:string[]}=vtzItem;
                        return {
                            ...vtzItem, isVisible: project_institutes.length == checkedInstitutes?.length &&
                                project_institutes.every(project_institute => checkedInstitutes.includes(project_institute))
                        }
                    });
            }else if(checkedInstitutesOrAnd=='or'){
                tabVTZ=tabVTZ.map((vtzItem)=>{
                    const { project_institutes }:{project_institutes:string[]}=vtzItem;
                    return {
                        ...vtzItem, isVisible: project_institutes.some(project_institute => checkedInstitutes?.includes(project_institute))
                    }
                });
            }
        }

        if(checkedDocumentationType?.length>0){
            if(checkedDocumentationTypeOrAnd=='and'){
                tabVTZ=tabVTZ.map((vtzItem)=>{
                    const {documentation}:{documentation:string[]}=vtzItem;
                    const shortDocumentationSet=new Set(documentation.map((el)=>el.substring(0, 2)));
                    const shortCheckedDocumentationType=checkedDocumentationType?.map((el)=>el.substring(0, 2)).sort();
                    const shortDocumentation=Array.from(shortDocumentationSet).sort();
                    return {
                        ...vtzItem, isVisible: JSON.stringify(shortDocumentation)==JSON.stringify(shortCheckedDocumentationType)
                    }
                });
            }else if(checkedDocumentationTypeOrAnd=='or'){
                tabVTZ=tabVTZ.map((vtzItem)=>{
                    const {documentation}:{documentation:string[]}=vtzItem;
                    return {
                        ...vtzItem, isVisible: documentation.some(docs => checkedDocumentationType?.some((docsType) =>
                            docs.includes(docsType)))
                    }
                });
            }
        }

        if(checkedDocumentation?.length>0){
            if(checkedDocumentationOrAnd=='and'){
                tabVTZ=tabVTZ.map((vtzItem)=>{
                    const {documentation}:{documentation:string[]}=vtzItem;
                    return {
                        ...vtzItem, isVisible: documentation.every(docs => checkedDocumentation?.includes(docs))
                    }
                });
            }else if(checkedDocumentationOrAnd=='or'){
                tabVTZ=tabVTZ.map((vtzItem)=>{
                    const {documentation}:{documentation:string[]}=vtzItem;
                    return {
                        ...vtzItem, isVisible: documentation.some(docs => checkedDocumentation?.includes(docs))
                    }
                });
            }
        }

        if(checkedVTZ?.length>0){
            tabVTZ=tabVTZ.map((vtzItem)=>{
                const {key}:{key:string}=vtzItem;
                return {
                    ...vtzItem, isVisible: checkedVTZ?.includes(key)
                }
            })
        }

        setFilteredVTZ(tabVTZ);

    }, [setFilteredVTZ, vtzTableList]);

    return {setFilteredVTZStoreData: setFilteredVTZStoreData};
}




