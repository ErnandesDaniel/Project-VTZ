import {Dispatch} from 'react';

import { create } from 'zustand';
import apiInstance from "@/lib/apiInstance";

interface vtzType{
    key: number,
    VTZ_number:number,
    VTZ_type:string,
    project_institutes:string[],
    documentation: string[],
}

interface VTZStore {
    vtzList:vtzType[];
    setVTZ: Dispatch<vtzType[]>;
}

export const useVTZStore = create<VTZStore>()((set, get) => ({

    loadVTZ: async ()=>{
        const {vtzList}=get();
        if(vtzList.length===0){
            const response = await apiInstance.get(`/TaskVTZ/GetAll?withData=${true}`);
            set({vtzList: response.data?.value.$values.map(({taskNumber, taskName, practices, sections})=>{
                                return{
                                    key: taskNumber,
                                    VTZ_number:taskNumber,
                                    VTZ_type:taskName,
                                    project_institutes:practices.$values.map(({practiceShortName})=>practiceShortName),
                                    documentation: sections.$values.map(({sectionName})=>sectionName),
                                }
                            })
                })
        }
    },

    setVTZ: vtzList => set(() => ({ vtzList: vtzList })),
    vtzList: [],
    //deleteVTZ: deleteVTZId => set(state => ({ vtzList: state.vtzList.filter(({ key }) => key !== deleteVTZId) })),


}));
