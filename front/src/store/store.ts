import {Dispatch} from 'react';

import { create } from 'zustand';
import apiInstance from "@/lib/apiInstance";

interface VTZStore {
    vtzTaskList:[];
    loadVTZTasks: Dispatch<[]>;
    loadVTZGateways: Dispatch<[]>;
    vtzGatewaysList: [];
}

export const useVTZStore = create<VTZStore>()((set, get) => ({

    loadVTZTasks: async ()=>{
        const {vtzTaskList}=get();
        if(vtzTaskList.length===0){
            const response = await apiInstance.get(`/TaskVTZ/GetAll?withData=${true}`);
            set({vtzTaskList: response.data?.value.$values})
        }
    },

    loadVTZGateways: async ()=>{
        const {vtzGatewaysList}=get();
        if(vtzGatewaysList.length===0){
            const response = await apiInstance.get(`/Gateways`);
            console.log(response);
            set({vtzGatewaysList: response.data?.value.$values})
        }
    },


    vtzGatewaysList:[],
    vtzTaskList: [],
    //deleteVTZ: deleteVTZId => set(state => ({ vtzList: state.vtzList.filter(({ key }) => key !== deleteVTZId) })),
}));
