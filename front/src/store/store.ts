import {Dispatch} from 'react';

import { create } from 'zustand';
import apiInstance from "@/lib/apiInstance";

interface VTZStore {
    vtzList:[];
    loadVTZ: Dispatch<[]>;
}

export const useVTZStore = create<VTZStore>()((set, get) => ({

    loadVTZ: async ()=>{
        const {vtzList}=get();
        if(vtzList.length===0){
            const response = await apiInstance.get(`/TaskVTZ/GetAll?withData=${true}`);
            set({vtzList: response.data?.value.$values})
        }
    },
    vtzList: [],
    //deleteVTZ: deleteVTZId => set(state => ({ vtzList: state.vtzList.filter(({ key }) => key !== deleteVTZId) })),
}));
