import {Dispatch} from 'react';

import { create } from 'zustand';
import apiInstance from "@/lib/apiInstance";

interface VTZStore {
    vtzTaskList:[];
    vtzGatewaysList: [];
    vtzDocumentationList: [];
    loadVTZTasks: Dispatch<[]>;
    loadVTZGateways: Dispatch<[]>;
    loadVTZDocumentation: Dispatch<[]>;
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
            //console.log(response);
            set({vtzGatewaysList: response.data?.value.$values})
        }
    },

    loadVTZDocumentation: async ()=>{
        const {vtzDocumentationList}=get();
        if(vtzDocumentationList.length===0){
            const response = await apiInstance.get(`/Section`);
            console.log(response);
            set({vtzDocumentationList: response.data?.value})
        }
    },



    vtzDocumentationList:[],
    vtzGatewaysList:[],
    vtzTaskList: [],
    //deleteVTZ: deleteVTZId => set(state => ({ vtzList: state.vtzList.filter(({ key }) => key !== deleteVTZId) })),
}));
